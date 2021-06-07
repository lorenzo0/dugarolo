import React, { useState } from 'react';
import { Avatar, Card, CardActions, CardHeader, Button } from '@material-ui/core';
import { PlayArrow, Delete, Room, Pause, Done } from '@material-ui/icons';
import { ParsedDateTime } from '../../AssetLoader/CardLoader';
import farmer from './../../assets/farmer.jpg';
import criteria from './../../assets/criteria.jpg';
import Divider from '@material-ui/core/Divider';
import './cards.css';

interface Props {
  tab: string;
  id: string;
  dateTime: ParsedDateTime;
  status: string;
  waterVolume: number;
  field: string;
  channel: { id: string; name: string };
  type: string;
  dugarolo: number;
  onPressEvent: () => void;
  onLocationEvent: () => void;
  onAcceptEvent: () => void;
  onDeleteEvent: () => void;
  onSatisfyEvent: () => void;
}

function CardItem({
  tab,
  id,
  dateTime,
  status,
  waterVolume,
  field,
  channel,
  type,
  dugarolo,
  onPressEvent,
  onLocationEvent,
  onAcceptEvent,
  onDeleteEvent,
  onSatisfyEvent,
}: Props): JSX.Element {
  const [running, setRunning] = useState(
    status === 'Accepted' || status === '0' || status === 'Scheduled' || status === '1'
      ? false
      : true
  );

  function getFieldName() {
    const tmpField: string[] = field.split('/');
    const finalField: string[] = tmpField[4].split('_');
    return finalField[1];
  }

  const title = 'Channel: ' + channel.name;
  const subheader = 'Field: ' + getFieldName();

  function playOrPause() {
    const idPost = encodeURIComponent(id);
    const fieldPost = encodeURIComponent(field);
    let statusPost;

    running ? (statusPost = 'Interrupted') : (statusPost = 'Ongoing');
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: statusPost }),
    };

    fetch(
      'http://mml.arces.unibo.it:3000/v0/WDmanager/{id}/WDMInspector/{ispector}/AssignedFarms/' +
        fieldPost +
        '/irrigation_plan/' +
        idPost +
        '/status',
      requestOptions
    )
      .then(response => {
        console.log(statusPost);
        if (response.ok) setRunning(!running);
      })
      .catch(error => console.log(error));
  }

  return (
    <Card variant="outlined" className="item_req">
      <CardHeader
        avatar={
          type === 'CBEC' ? (
            <Avatar alt="Farmer" src={farmer} />
          ) : (
            <Avatar alt="Criteria" src={criteria} />
          )
        }
        title={title}
        subheader={subheader}
        onClick={onPressEvent}
      />

      {tab !== 'History' ? (
        <div className="divider">
          <Divider />
        </div>
      ) : null}

      <div className="flex-row-container">
        <CardActions>
          {tab === 'Today' || tab === 'Schedule' ? (
            <div className="flex-row-item">
              <Button
                className="btn-today-play"
                size="small"
                startIcon={running ? <Pause /> : <PlayArrow />}
                onClick={playOrPause}>
                {running ? 'Pause' : 'Play'}
              </Button>

              <Button
                className="btn-today-location"
                size="small"
                startIcon={<Room />}
                onClick={onLocationEvent}>
                Location
              </Button>

              <Button
                className="btn-today-delete"
                size="small"
                startIcon={running ? <Done /> : <Delete />}
                onClick={running ? onSatisfyEvent : onDeleteEvent}>
                {running ? 'Satisfied' : 'Delete'}
              </Button>
            </div>
          ) : tab === 'Tomorrow' ? (
            <div className="flex-row-item">
              <Button
                className="btn-today-play"
                size="small"
                startIcon={<Done />}
                onClick={onAcceptEvent}>
                Accept
              </Button>

              <Button
                className="btn-today-location"
                size="small"
                startIcon={<Room />}
                onClick={onLocationEvent}>
                Location
              </Button>

              <Button
                className="btn-today-play"
                size="small"
                startIcon={<Delete />}
                onClick={onDeleteEvent}>
                Reject
              </Button>
              
            </div>
          ) : null}
        </CardActions>
      </div>
    </Card>
  );
}

export default CardItem;

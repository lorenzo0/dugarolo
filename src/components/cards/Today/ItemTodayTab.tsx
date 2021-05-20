import '../cards.css';
import { Avatar, Card, CardActions, CardHeader, Button } from '@material-ui/core';
import { PlayArrow, Delete, Room, Pause, Done } from '@material-ui/icons';
import React, { useState } from 'react';

interface TodayObj {
  id: string;
  name: string;
  datetime: string;
  status: string;
  waterVolume: number;
  field: string;
  message: string;
  channel: string;
  type: string;
  nameChannel: string;
  dugarolo: string;
  onPressEvent: () => void;
  onLocationEvent: () => void;
  onDeleteEvent: () => void;
}

function ItemTodayTab({
  id,
  name,
  datetime,
  status,
  waterVolume,
  field,
  message,
  channel,
  type,
  nameChannel,
  dugarolo,
  onPressEvent,
  onLocationEvent,
  onDeleteEvent,
}: TodayObj): JSX.Element {

  const [running, setRunning] = useState(status === 'Accepted' ? false : true);

  function play() {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({ message: 'Nuovo stato: ' + !running, status: !running }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.ok)
      .then(ok => {
        if (ok === true) {
          setRunning(!running);
        }
      });
  }

  var finalStr = 'Start at: ' + '10:00' + ' - Last for: ' + '3';

  return (
    <Card variant="outlined" className="item_req">
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className="avatar">
            R
          </Avatar>
        }
        title={name}
        subheader={finalStr}
        onClick={onPressEvent}
      />

      <div className="flex-row-container">
        <CardActions>
          <div className="flex-row-item">
            {running ? (
              <Button className="btn-today-play" size="small" startIcon={<Pause />} onClick={play}>
                Pause
              </Button>
            ) : (
              <Button
                className="btn-today-play"
                size="small"
                startIcon={<PlayArrow />}
                onClick={play}>
                Start
              </Button>
            )}
          </div>
          <div className="flex-row-item">
            <Button
              className="btn-today-location"
              size="small"
              startIcon={<Room />}
              onClick={onLocationEvent}>
              Location
            </Button>
          </div>
          <div className="flex-row-item">
            {running ? (
              <Button className="btn-today-delete" size="small" startIcon={<Done />}>
                Satisfied
              </Button>
            ) : (
              <Button
                className="btn-today-delete"
                size="small"
                startIcon={<Delete />}
                onClick={onDeleteEvent}>
                Delete
              </Button>
            )}{' '}
          </div>
        </CardActions>
      </div>
    </Card>
  );
}

export default ItemTodayTab;

import '../cards.css';
import {Avatar, Card, CardActions, CardHeader, Button} from '@material-ui/core';
import {PlayArrow, Delete, Room, Pause, Done} from '@material-ui/icons';
import React, {useState} from 'react';

interface TomorrowObj {
  id: string;
  waterVolume: string;
  field: string;
  nameChannel: string;
  startTime : string;
  durationTime : string;
  type: string;
  dugarolo: string;
  message: string;
  acceptEvent: () => void;
  delEvent: () => void;
}

const ItemTomorrowTab: React.FC<TomorrowObj> = ({id, waterVolume, field, nameChannel, type, startTime, durationTime, dugarolo, message, acceptEvent, delEvent }) => {

  var finalStr = "Start at: " + startTime + " - Last for: " + durationTime;

  return(
    <Card variant="outlined" className='item_req'>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className='avatar'>
            R
          </Avatar>
        }
          
        title = {nameChannel}
        subheader = {field}
      />
      
      <div className="flex-row-container">
        <CardActions>
          <div className="flex-row-item">
          </div>
          <div className="flex-row-item"><Button className="btn-today-location" size="small" startIcon={<Done />} onClick={acceptEvent}>Accetta</Button></div>
          <div className="flex-row-item"><Button className="btn-today-location" size="small" startIcon={<Delete /> } onClick={delEvent}>Rifiuta</Button></div>
        </CardActions>
      </div>
    </Card>
    );
}

export default ItemTomorrowTab;
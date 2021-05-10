import '../cards.css';
import {Avatar, Card, CardActions, CardHeader, Button} from '@material-ui/core';
import {PlayArrow, Delete, Room, Pause, Done} from '@material-ui/icons';
import React, {useState} from 'react';

interface TomorrowObj {
  id: string;
  name: string;
  canal_name: string;
  farm_name: string;
  irrigation_time: string;
  duration_time: string;
  acceptEvent: any;
  delEvent: any;
}

const ItemTomorrowTab: React.FC<TomorrowObj> = ({id, name, canal_name, farm_name, irrigation_time, duration_time, acceptEvent, delEvent }) => {

  var finalStr = "Start at: " + irrigation_time + " - Last for: " + duration_time;

  return(
    <Card variant="outlined" className='item_req'>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className='avatar'>
            R
          </Avatar>
        }
          
        title = {canal_name}
        subheader = {finalStr}
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
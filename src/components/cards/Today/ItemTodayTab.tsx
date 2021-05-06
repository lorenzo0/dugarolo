import '../cards.css';
import {Avatar, Card, CardContent, CardActions, CardHeader, Button, IconButton} from '@material-ui/core';
import {PlayArrow, Delete, Room, Pause} from '@material-ui/icons';
import React, {Component, useState} from 'react';

interface TodayObj {
  name: string;
  canal_name: string;
  farm_name: string;
  irrigation_time: string;
  duration_time: string;
  active: boolean;
}

const ItemTodayTab: React.FC<TodayObj> = ({name, canal_name, farm_name, irrigation_time, duration_time, active }) => {

 const [running, setRunning] = useState<boolean>(active);

  function play(){
    console.log(running);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'message': !active.toString(), 'status': !active })
    };
    fetch('https://reqres.in/api/posts', requestOptions)
        .then(response => response.json())
        .then(data => {//if(data.ok) {
          setRunning(!running)
        //}
      });
  }

  return(
    <Card variant="outlined" className='item_req'>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className='avatar'>
            R
          </Avatar>
        }
          
        title = {canal_name}
        subheader = {farm_name}
      />
      
      <CardActions>
        {running ? 
          <Button className="btn-today-play" size="small" startIcon={<Pause />} onClick={play}></Button> :
          <Button className="btn-today-play" size="small" startIcon={<PlayArrow />} onClick={play}></Button>}
        <Button className="btn-today-location" size="small" startIcon={<Room />}></Button>
        <Button className="btn-today-delete" size="small" startIcon={<Delete />}></Button>
      </CardActions>
    </Card>
    );
}

export default ItemTodayTab;
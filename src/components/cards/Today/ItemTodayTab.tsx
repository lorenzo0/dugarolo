import '../cards.css';
import {Avatar, Card, CardActions, CardHeader, Button} from '@material-ui/core';
import {PlayArrow, Delete, Room, Pause, Done} from '@material-ui/icons';
import React, {useState} from 'react';

interface TodayObj {
  id: string;
  name: string;
  canal_name: string;
  farm_name: string;
  irrigation_time: string;
  duration_time: string;
  active: boolean;
  delEvent: any;
  onPressEvent: any;
}

const ItemTodayTab: React.FC<TodayObj> = ({id, name, canal_name, farm_name, irrigation_time, duration_time, active, delEvent, onPressEvent }) => {

 const [running, setRunning] = useState<boolean>(active);

  function play(){
    fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          body: JSON.stringify({ 'message': "Nuovo stato: " + !running, 'status': !running }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
        .then((response) => response.ok)
        .then((ok) => {
            if(ok == true){
              setRunning(!running)
            }
        })
  }

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
        onClick={onPressEvent}
      />
      
      <div className="flex-row-container">
        <CardActions>
          <div className="flex-row-item">
            {running ? 
              <Button className="btn-today-play" size="small" startIcon={<Pause />} onClick={play}>Pause</Button> :
              <Button className="btn-today-play" size="small" startIcon={<PlayArrow />} onClick={play}>Start</Button>}
          </div>
          <div className="flex-row-item"><Button className="btn-today-location" size="small" startIcon={<Room />}>Location</Button></div>
          <div className="flex-row-item">
            {running ? 
            <Button className="btn-today-delete" size="small" startIcon={<Done />}>Satisfied</Button> :
            <Button className="btn-today-delete" size="small" startIcon={<Delete />} onClick={delEvent}>Delete</Button>} </div>
        </CardActions>
      </div>
    </Card>
    );
}

export default ItemTodayTab;
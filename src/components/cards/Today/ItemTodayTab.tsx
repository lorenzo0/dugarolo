import '../cards.css';
import {Avatar, Card, CardContent, CardActions, CardHeader, Button} from '@material-ui/core';
import React, {Component} from 'react';

interface TodayObj {
  name: string;
  canal_name: string;
  farm_name: string;
  irrigation_time: string;
  duration_time: string;
}

const ItemTodayTab: React.FC<TodayObj> = ({name, canal_name, farm_name, irrigation_time, duration_time }) => {
  return(
    <Card variant="outlined" className='item_req'>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className='avatar'>
            R
          </Avatar>
        }
        /*action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }*/
        title = {canal_name}
        subheader = {farm_name}
      />
      
      <CardActions>
        <Button size="small">One</Button>
        <Button size="small">Two</Button>
        <Button size="small">Three</Button>
      </CardActions>
    </Card>
    );
}

export default ItemTodayTab;
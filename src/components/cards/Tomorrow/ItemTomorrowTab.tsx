import '../cards.css';
import {Avatar, Card, CardContent, CardActions, CardHeader, Button} from '@material-ui/core';
import React from 'react';

interface ItemProps {
  key: number,
  name: string;
  canal_name: string;
  farm_name: string;
  irrigation_time: string;
  duration_time: string,
  accepted: boolean;
}

const ItemTomorrowTab: React.FC<ItemProps> = ({ key, name, canal_name, farm_name, irrigation_time, duration_time, accepted }) => {

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
      </CardActions>
    </Card>
    );
};


export default ItemTomorrowTab;
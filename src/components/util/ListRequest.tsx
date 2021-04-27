import React, { Component } from "react";
import {List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography} from '@material-ui/core';
import './ListRequest.css';
import '../../theme/variables.css';
//import TodayCard from './card.js'

/*interface TodayCard {
  name: string;
  canal_name: string;
  farm_name: string;
  irrigation_time: string;
  duration_time: string
}*/

const todayCardList = [
  {
    name : "name",
    canal_name : "canal",
    farm_name : "farm",
    irrigation_time : "irrigation",
    duration_time : "duration"
  },{
    name : "name",
    canal_name : "canal",
    farm_name : "farm",
    irrigation_time : "irrigation",
    duration_time : "duration"
  },{
    name : "name",
    canal_name : "canal",
    farm_name : "farm",
    irrigation_time : "irrigation",
    duration_time : "duration"
  }
]

//the position can be replaced with id of request. Position is needed now in order to get to know which card was touched
const list = todayCardList.map((item, pos) => {
  return (
    <div className = "Item_req">
      <ListItem alignItems="flex-start" key={pos}>
              <ListItemAvatar>
                  <Avatar src="https://www.flaticon.com/svg/vstatic/svg/616/616427.svg?token=exp=1619511723~hmac=adbc99d56e7fdbcd8b45472ddf9980ab"/>
              </ListItemAvatar>
          <ListItemText
            primary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className="inline"
                  color="textPrimary"
                >
                  {item.name}
                </Typography>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className="inline"
                  color="textSecondary"
                >
                {item.farm_name}
                </Typography>

                <Typography
                  component="span"
                  variant="body2"
                  className="irrigation"
                  color="textSecondary"
                >
                {item.irrigation_time}
                </Typography>
                
              </React.Fragment>
            }
          />
        </ListItem>
      </div>
      //this one is the correct one, we should move this code part in .js but props does not work....
      //<TodayCard key={pos} name={item.name} farm_name={item.farm_name} irrigation_time={item.irrigation_time}/>
    )
})
  

export default function listToPrint() {
  return (
      <List className='list'>
        {list}
      </List>
  );
}

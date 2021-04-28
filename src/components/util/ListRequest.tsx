import React, { Component } from "react";
import {List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography} from '@material-ui/core';

import './ListRequest.css';
import '../../theme/variables.css';

import TodayCard from '../items/Today/ItemTodayTab'
import TomorrowCard from '../items/Tomorrow/ItemTomorrowTab'

interface ContainerProps {
  name: string;
}

// Array(s) are gonna be deleted when we have the APIs working 
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

const tomorrowCardList = [
  {
    name : "name",
    canal_name : "canal",
    farm_name : "farm",
    irrigation_time : "irrigation",
    duration_time : "duration",
    accepted : false
  },{
    name : "name",
    canal_name : "canal",
    farm_name : "farm",
    irrigation_time : "irrigation",
    duration_time : "duration",
    accepted : true
  }
]


//the position can be replaced with id of request. Position is needed now in order to get to know which card was touched
const listToday = todayCardList.map((item, pos) => {
  return (
      <TodayCard key={pos} name={item.name} farm_name={item.farm_name} irrigation_time={item.irrigation_time} canal_name={item.canal_name} duration_time={item.duration_time}/>
    )
})

const listTomorrow = tomorrowCardList.map((item, pos) => {
  return (
      <TomorrowCard key={pos} name={item.name} farm_name={item.farm_name} irrigation_time={item.irrigation_time}
         canal_name={item.canal_name} duration_time={item.duration_time} accepted={item.accepted}/>
    )
})

  
const ListRequest:React.FC<ContainerProps> = ({name}) => {
  switch(name){
    case "Today":
      return (
        <List className='list'>
          {listToday}
        </List>
      );
      break;

    case "Tomorrow":
      return (
        <List className='list'>
          {listTomorrow}
        </List>
      );
      break;
  }

  return(
      <List className='list'>
      </List>
  );
  
}
export default ListRequest;



import React from 'react';
import {List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography} from '@material-ui/core';

const TodayCard = (properties) => {

    console.log(properties);
    return(
      <h3> Ciao </h3>
    )

      /*return (
        <ListItem alignItems="flex-start">
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
                Prova
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
              {properties.farm_name}
              </Typography>
              {properties.irrigation_time}
            </React.Fragment>
          }
        />
      </ListItem>
    )*/
  }

export default TodayCard;
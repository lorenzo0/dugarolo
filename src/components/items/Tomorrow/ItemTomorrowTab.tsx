import './ItemTomorrowTab.css';
import {List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography} from '@material-ui/core';
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

  return (
    <div className = "Item_req">
      <ListItem alignItems="flex-start" key={key}>
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
                name
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
                farm_name
                </Typography>

                <Typography
                  component="span"
                  variant="body2"
                  className="irrigation"
                  color="textSecondary"
                >
                accepted
                </Typography>
                
              </React.Fragment>
            }
          />
        </ListItem>
      </div>
  );
};


export default ItemTomorrowTab;
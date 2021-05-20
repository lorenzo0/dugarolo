import React from 'react';
import { Avatar, Card, CardActions, CardHeader, Button } from '@material-ui/core';
import { Room } from '@material-ui/icons';
import '../cards.css';

interface HistoryObj {
  id: string;
  name: string;
  datetime: string;
  status: string;
  waterVolume: string;
  field: string;
  message: string;
  channel: string;
  type: string;
  nameChannel: string;
  onPressEvent: () => void;
  onLocationEvent: () => void;
}

function ItemHistoryTab({
  id,
  name,
  datetime,
  status,
  waterVolume,
  field,
  message,
  channel,
  type,
  nameChannel,
  onPressEvent,
  onLocationEvent,
}: HistoryObj): JSX.Element {
  return (
    <Card variant="outlined" className="item_req">
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className="avatar">
            R
          </Avatar>
        }
        title={nameChannel}
        subheader={message}
        onClick={onPressEvent}
      />

      <div className="flex-row-container">
        <CardActions>
          <div className="flex-row-item">
            <Button
              className="btn-today-location"
              size="small"
              startIcon={<Room />}
              onClick={onLocationEvent}>
              Location
            </Button>
          </div>
        </CardActions>
      </div>
    </Card>
  );
}

export default ItemHistoryTab;

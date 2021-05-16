import React, { useState } from 'react';
import './LayoutTabs.css';
import CardLoader from '../AssetLoader/CardLoader';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MapView, { onClick } from './map/map';
import DateUtils from '@date-io/dayjs';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

export default function LayoutTabs({ name }) {
  const [from, setFrom] = useState<MaterialUiPickersDate>();
  const [to, setTo] = useState<MaterialUiPickersDate>();

  function moveMap(newPosition) {
    onClick(newPosition);
  }

  const style = {
    background: '#ffffff',
    padding: '1px 0 1px 0',
  };

  return (
    <div className="container">
      <div className="top_div">
        <MapView />
      </div>
      {name === 'History' && (
        <MuiPickersUtilsProvider utils={DateUtils}>
          <DatePicker
            value={from}
            onChange={setFrom}
            id="da"
            label="Da"
            disableFuture
            autoOk
            style={style}
          />
          <span className="space" />
          <DatePicker
            value={to}
            onChange={setTo}
            id="a"
            label="A"
            disableFuture
            autoOk
            style={style}
          />
        </MuiPickersUtilsProvider>
      )}
      <div className="bottom_div">
        <CardLoader name={name} map={moveMap} />
      </div>
    </div>
  );
}

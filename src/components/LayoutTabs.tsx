import React, { useState } from 'react';
import './LayoutTabs.css';
import CardLoader from '../AssetLoader/CardLoader';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MapView, { onClick } from './maps/half/halfMap';
import DateUtils from '@date-io/dayjs';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import DugaroloLoader from '../AssetLoader/DugaroloLoader';
import Alert from '@material-ui/lab/Alert';

export default function LayoutTabs({ name }) {
  const [from, setFrom] = useState<MaterialUiPickersDate>();
  const [to, setTo] = useState<MaterialUiPickersDate>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [toSchedule, setToSchedule] = useState<boolean>(false);
  const [chosenDugarolo, setChosenDugarolo] = useState<number>(-1);

  const datepickerStyle = {
    background: '#ffffff',
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  function handleClose(id: number) {
    id === 7 ? setChosenDugarolo(-1) : setChosenDugarolo(id);
    setAnchorEl(null);
  }

  function toggleSchedule() {
    setChosenDugarolo(-1);
    setToSchedule(!toSchedule);
  }

  return (
    <div className="container">
      <div className="top_div">
        <MapView />
      </div>
      <div className="space-top" />
      {name === 'History' ? (
        <MuiPickersUtilsProvider utils={DateUtils}>
          <div className="from">
            <DatePicker
              value={from}
              onChange={setFrom}
              id="da"
              label="Da"
              size="small"
              style={datepickerStyle}
            />
          </div>
          <div className="to">
            <DatePicker
              value={to}
              onChange={setTo}
              id="a"
              label="A"
              size="small"
              style={datepickerStyle}
            />
          </div>
        </MuiPickersUtilsProvider>
      ) : toSchedule ? (
        <div>
          <Button
            aria-controls="fade-menu"
            aria-haspopup="true"
            variant="contained"
            color="primary"
            onClick={toggleSchedule}
            style={{ float: 'left' }}>
            Back to the list
          </Button>
          <Button
            aria-controls="fade-menu"
            aria-haspopup="true"
            variant="contained"
            color="primary"
            onClick={handleClick}
            style={{ float: 'right' }}>
            Filter by name
          </Button>
          <Menu
            id="fade-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            TransitionComponent={Fade}
            PaperProps={{
              style: {
                maxHeight: 48 * 4.5,
                width: '20ch',
              },
            }}>
            <DugaroloLoader onClick={handleClose} />
          </Menu>
        </div>
      ) : name === 'Today' ? (
        <div>
          <Button
            aria-controls="fade-menu"
            variant="contained"
            color="primary"
            aria-haspopup="true"
            onClick={toggleSchedule}>
            Today schedule
          </Button>
        </div>
      ) : name === 'Tomorrow' ? (
        <Alert severity="info">Accept or reject the requests available for tomorrow!</Alert>
      ) : null}
      <div className="space-bottom" />
      <div className="bottom_div">
        <CardLoader
          tabName={name}
          gotoLocation={onClick}
          chosenDugarolo={chosenDugarolo}
          from={from}
          to={to}
        />
      </div>
    </div>
  );
}

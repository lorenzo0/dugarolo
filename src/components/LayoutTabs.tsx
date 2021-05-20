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
import ScheduleTab from '../tabs/Schedule/ScheduleTab';

export default function LayoutTabs({ name }) {
  const [from, setFrom] = useState<MaterialUiPickersDate>();
  const [to, setTo] = useState<MaterialUiPickersDate>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [toSchedule, setToSchedule] = useState<Boolean>(false);

  const datepickerStyle = {
    background: '#ffffff',
    padding: '1px 0 1px 0',
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  function handleClose() {
    setAnchorEl(null);
  }

  function goToSchedule(){
    setToSchedule(true);
  }

  function goBackToList(){
    setToSchedule(false);
  }

  return (
    <div className="container">
      <div className="top_div">
        <MapView />
      </div>
      {name === 'History' ? (
        <MuiPickersUtilsProvider utils={DateUtils}>
          <DatePicker
            value={from}
            onChange={setFrom}
            id="da"
            label="Da"
            disableFuture
            autoOk
            style={datepickerStyle}
          />
          <span className="space" />
          <DatePicker
            value={to}
            onChange={setTo}
            id="a"
            label="A"
            disableFuture
            autoOk
            style={datepickerStyle}
          />
        </MuiPickersUtilsProvider>
      ) : (name === 'Schedule' || toSchedule) ? (
        <div>
          <Button aria-controls="fade-menu" aria-haspopup="true" variant="contained" color="primary" onClick={goBackToList} style={{float:'left'}}>
            Back to the list
          </Button>
          <Button aria-controls="fade-menu" aria-haspopup="true" variant="contained" color="primary" onClick={handleClick} style={{float:'right'}}>
            Filter by name
          </Button>
          <Menu
            id="fade-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
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
          <Button aria-controls="fade-menu" variant="contained" color="primary" aria-haspopup="true" onClick={goToSchedule}>
            Today schedule
          </Button>
        </div>
      ) : null}
      <div className="bottom_div">
        <CardLoader name={name} gotoLocation={onClick} />
      </div>
    </div>
  );
}

import React, { Dispatch, SetStateAction, useState } from 'react';
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

interface Props {
  tabName: string;
  cardsData: any;
  setCardsData: Dispatch<SetStateAction<undefined>>;
  mapData: any;
}

export default function LayoutTabs(props: Props) {
  const [from, setFrom] = useState<MaterialUiPickersDate>();
  const [to, setTo] = useState<MaterialUiPickersDate>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [toSchedule, setToSchedule] = useState<boolean>(false);
  const [chosenDugarolo, setChosenDugarolo] = useState<number>(-1);

  const datepickerStyleUndefined = {
    background: '#FA8072',
  };

  const datepickerStyleDefined = {
    background: '#90EE90',
  };

  /* START Handle click, closing of the menu and setting of the selected dugarolo */ 

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

  /* END Handle click, closing of the menu and setting of the selected dugarolo */ 

  /*
    This function is made in order to modify dinamically the content of the tab.
    As it possible to observe, between the lines xx-xx the top-div is defined.

    Each tab has the same definition of the higher part of the layout. The map will be contained in the 40%
    of the desktop (defined by css).

    By the ternary IF I defined the content for each condition, after adding details for each tabs, the function
    cardLoaded is called, in order to print the list of the requests.
  */
  return (
    <div className="container">
      <div className="top_div">
        <MapView mapData={props.mapData} />
      </div>
      <div className="space-top" />
      {props.tabName === 'History' ? (
        <MuiPickersUtilsProvider utils={DateUtils}>
          <div className="from">
            <DatePicker
              value={from}
              onChange={setFrom}
              id="da"
              label="Da"
              size="small"
              style={from ? datepickerStyleDefined : datepickerStyleUndefined}
            />
          </div>
          <div className="to">
            <DatePicker
              value={to}
              onChange={setTo}
              id="a"
              label="A"
              size="small"
              style={to ? datepickerStyleDefined : datepickerStyleUndefined}
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
      ) : props.tabName === 'Today' ? (
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
      ) : props.tabName === 'Tomorrow' ? (
        <Alert severity="info">Accept or reject the requests available for tomorrow!</Alert>
      ) : null}
      <div className="space-bottom" />
      <div className="bottom_div">
        <CardLoader
          tabName={props.tabName}
          cardsData={props.cardsData}
          setCardsData={props.setCardsData}
          gotoLocation={onClick}
          chosenDugarolo={chosenDugarolo}
          mapData={props.mapData}
          from={from}
          to={to}
        />
      </div>
    </div>
  );
}

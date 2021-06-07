import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import DetailsTab from '../tabs/Details';
import CardItem from '../components/cards/Cards';
import { List, Snackbar } from '@material-ui/core';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import Alert from '@material-ui/lab/Alert';

interface Props {
  tabName: string;
  cardsData: any;
  setCardsData: Dispatch<SetStateAction<undefined>>;
  gotoLocation: (newLocation) => void;
  chosenDugarolo: number;
  mapData: any[];
  from?: MaterialUiPickersDate;
  to?: MaterialUiPickersDate;
}

export interface ParsedDateTime {
  day: number;
  month: number;
  year: number;
  hour: number;
  minutes: number;
  seconds: number;
}

export default function CardLoader(props: Props): JSX.Element {
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const [cardList, setCardList] = React.useState<any[]>([]);
  const [detailsClicked, setDetailsClicked] = React.useState(false);
  const [itemDetails, setItemDetails] = useState<any>();
  const [snackBarError, setSnackBarError] = useState<boolean>(false);
  const [fetchingHistory, setFetchingHistory] = useState<boolean>(false);

  /* isLoaded is not set false in the first time */
  useEffect(() => {
    if (props.cardsData === 'Loading') console.log('Loading cards data');
    else if (props.cardsData === 'Failed') setSnackBarError(true);
    else {
      if (props.to && props.from && !fetchingHistory) loadCardHistory();
      else loadCards(props.cardsData);
    }
  }, [isLoaded, props.cardsData, props.chosenDugarolo, props.from, props.to]);

  function parseDate(rawDateTime: string): ParsedDateTime {
    const tmpDateTime: string[] = rawDateTime.split('T');

    const date = tmpDateTime[0].split('-');
    const year: number = parseInt(date[0]);
    const month: number = parseInt(date[1]);
    const day: number = parseInt(date[2]);

    const time = tmpDateTime[1].split(':');
    const hour: number = parseInt(time[0]);
    const minutes: number = parseInt(time[1]);
    const seconds: number = parseFloat(time[2].substring(0, time[2].length - 1));

    return { day: day, month: month, year: year, hour: hour, minutes: minutes, seconds: seconds };
  }

  //2021-06-02T12:00:00.000+0200
  function formatDataForHistoryRequest(x) {
    let month, day, hour, minute, second;

    if (x.month() < 10) month = '0' + x.month();
    else month = x.month();

    if (x.date() < 10) day = '0' + x.date();
    else day = x.date();

    if (x.hour() < 10) hour = '0' + x.hour();
    else hour = x.hour();

    if (x.minute() < 10) minute = '0' + x.minute();
    else minute = x.minute();

    if (x.second() < 10) second = '0' + x.second();
    else second = x.second();

    let stringStart =
      x.year() + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second + '.000+0200';

    stringStart = encodeURIComponent(stringStart);
    return stringStart;
  }

  function getFieldLocation(item) {
    let tmpLocation: number[] = [];

    if (props.mapData) {
      props.mapData.forEach((promise: any[]) => {
        promise.forEach(data => {
          if (data.fields !== undefined) {
            data.fields.forEach(field => {
              if (item.field === field.id) tmpLocation = [field.location.lat, field.location.lon];
            });
          }
        });
      });
    }

    return tmpLocation;
  }

  function generateRandomDugarolo() {
    return Math.floor(Math.random() * 7);
  }

  function loadCards(json) {
    setCardList(
      json
        .map(item => {
          item.dugarolo = generateRandomDugarolo();
          return item;
        })
        .filter(item => {
          if (props.tabName !== 'History') {
            if (
              item.status !== 'Cancelled' &&
              item.status !== '4' &&
              item.status !== 'Satisfied' &&
              item.status !== '5'
            )
              return true;
            return false;
          }
          return true;
        })
        .filter(item => {
          const currentDate = new Date();
          const itemDate = parseDate(item.start);

          if (props.tabName === 'Today') {
            if (
              itemDate.day === currentDate.getDate() &&
              itemDate.month === currentDate.getMonth() + 1
            ) {
              return true;
            }
            return false;
          } else if (props.tabName === 'Tomorrow') {
            if (
              itemDate.day === currentDate.getDate() + 1 &&
              itemDate.month === currentDate.getMonth() + 1
            ) {
              return true;
            }
            return false;
          }
          return true;
        })
        .filter(item => item.dugarolo === props.chosenDugarolo || props.chosenDugarolo === -1)
        .sort((x, y) => {
          const xDate = parseDate(x.start);
          const yDate = parseDate(y.start);

          if (xDate.year === yDate.year) {
            if (xDate.month === yDate.month) {
              if (xDate.day === yDate.day) {
                if (xDate.hour === yDate.hour) {
                  if (xDate.minutes === yDate.minutes) {
                    if (xDate.seconds === yDate.seconds) return 0;
                    return xDate.seconds < yDate.seconds ? -1 : 1;
                  }
                  return xDate.minutes < yDate.minutes ? -1 : 1;
                }
                return xDate.hour < yDate.hour ? -1 : 1;
              }
              return xDate.day < yDate.day ? -1 : 1;
            }
            return xDate.month < yDate.month ? -1 : 1;
          }
          return xDate.year < yDate.year ? -1 : 1;
        })
        .map(item => (
          <CardItem
            key={item.id}
            tab={props.tabName}
            id={item.id}
            dateTime={parseDate(item.start)}
            status={item.status}
            waterVolume={item.waterVolume}
            field={item.field}
            channel={{ id: item.channel.id, name: item.channel.name }}
            type={item.type}
            dugarolo={item.dugarolo}
            onPressEvent={() => onPressEvent(item)}
            onLocationEvent={() => props.gotoLocation(getFieldLocation(item))}
            onAcceptEvent={() => acceptEventTomorrow(json, item)}
            onDeleteEvent={() => deleteEvent(json, item)}
            onSatisfyEvent={() => satisfyEvent(json, item)}
          />
        ))
    );

    setSnackBarError(false);
    setIsLoaded(true);
  }

  function loadCardHistory() {
    setFetchingHistory(true);

    let fromRequest = formatDataForHistoryRequest(props.from);
    let toRequest = formatDataForHistoryRequest(props.to);

    fetch(
      'http://mml.arces.unibo.it:3000/v0/WDmanager/{id}/WDMInspector/irrigations?from=' +
        fromRequest +
        '&to=' +
        toRequest
    )
      .then(res => res.json())
      .then(json => loadCards(json))
      .then(() => setFetchingHistory(false))
      .catch(() => {
        console.log('Server data fetch error');
      });
  }

  function onPressEvent(item) {
    setItemDetails(item);
    setDetailsClicked(true);
  }

  
  function deleteEvent(json: any[], item) {
    item.id = encodeURIComponent(item.id);
    item.field = encodeURIComponent(item.field);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Cancelled' }),
    };

    fetch(
      'http://mml.arces.unibo.it:3000/v0/WDmanager/{id}/WDMInspector/{ispector}/AssignedFarms/' +
        item.field +
        '/irrigation_plan/' +
        item.id +
        '/status',
      requestOptions
    )
      .then(response => {
        if (response.ok) {
          setIsLoaded(false);
          loadCards(json.splice(json.indexOf(item), 1));
          setIsLoaded(true);
        }
      })
      .catch(error => console.log(error));
  }

  function satisfyEvent(json: any[], item) {
    item.id = encodeURIComponent(item.id);
    item.field = encodeURIComponent(item.field);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Satisfied' }),
    };

    fetch(
      'http://mml.arces.unibo.it:3000/v0/WDmanager/{id}/WDMInspector/{ispector}/AssignedFarms/' +
        item.field +
        '/irrigation_plan/' +
        item.id +
        '/status',
      requestOptions
    )
      .then(response => {
        if (response.ok) {
          setIsLoaded(false);
          loadCards(json.splice(json.indexOf(item), 1));
          setIsLoaded(true);
        }
      })
      .catch(error => console.log(error));
  }

  /* Accepting event for tomorrow tab */
  function acceptEventTomorrow(json, item) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Accepted' }),
    };

    fetch(
      'http://mml.arces.unibo.it:3000/v0/WDmanager/{id}/WDMInspector/{ispector}/AssignedFarms/' +
        encodeURIComponent(item.field) +
        '/irrigation_plan/' +
        encodeURIComponent(item.id) +
        '/status',
      requestOptions
    )
      .then(response => {
        console.log(response);
        if (response.ok) {
          setIsLoaded(false);
          loadCards(json.splice(json.indexOf(item), 1));
          setIsLoaded(true);
        }
      })
      .catch(error => console.log(error));
  }

  function goToDetails() {
    return <DetailsTab ObjectDetails={itemDetails} BackEvent={() => setDetailsClicked(false)} />;
  }

  return !snackBarError ? (
    isLoaded && !fetchingHistory ? (
      !detailsClicked ? (
        cardList.length > 0 ? (
          <List className="list">{cardList}</List>
        ) : (
          <Alert severity="warning">No requests available</Alert>
        )
      ) : (
        goToDetails()
      )
    ) : (
      <Alert severity="info">Loading...</Alert>
    )
  ) : (
    <Snackbar
      message="Error while retrieving data"
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      style={{ marginBottom: '60px' }}
      open={snackBarError}
    />
  );
}

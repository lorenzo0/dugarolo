import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import DetailsTab from '../tabs/Details';
import CardItem from '../components/cards/Cards';
import { List, Snackbar } from '@material-ui/core';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import Alert from '@material-ui/lab/Alert';

interface Props {
  tabName: string;
  serverData: any;
  setServerData: Dispatch<SetStateAction<undefined>>;
  gotoLocation: (newLocation) => void;
  chosenDugarolo: number;
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

  /* isLoaded is not set false in the first time */
  useEffect(() => {
    if (props.serverData) {
      if(props.serverData === "Loading")
        console.log("Loading");
      else if(props.serverData === "Failed")
        setSnackBarError(true);
      else{
        if (props.to && props.from)
          loadCardHistory(props.from, props.to);
        else 
          loadCards(props.serverData);
        
        setSnackBarError(false);
        setIsLoaded(true);
      }
    } else
      setSnackBarError(true);
    
  }, [isLoaded, props.serverData, props.chosenDugarolo, props.from, props.to]);

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

    if (x.day() < 10) day = '0' + x.day();
    else day = x.day();

    if (x.hour() < 10) hour = '0' + x.hour();
    else hour = x.hour();

    if (x.minute() < 10) minute = '0' + x.minute();
    else minute = x.minute();

    if (x.second() < 10) second = '0' + x.second();
    else second = x.second();

    let stringStart =
      x.year() + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second + '.000+0200';
    stringStart = prepareStringForPost(stringStart);
    return stringStart;
  }

  function loadCards(json) {
    setCardList(
      json
        .filter(item => {
          if (props.tabName !== 'History') {
            if (item.status !== 'Deleted' && item.status !== 'Satisfied') return true;
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
            dugarolo={2}
            onPressEvent={() => onPressEvent(item)}
            onLocationEvent={() => props.gotoLocation([40, 2])}
            onAcceptEvent={() => acceptEventTomorrow(json, item)}
            onDeleteEvent={() => deleteEvent(json, item)}
          />
        ))
    );
  }

  function onPressEvent(item) {
    setItemDetails(item);
    setDetailsClicked(true);
  }

  function prepareStringForPost(item) {
    do {
      item = item.replace(':', '%3A');
      item = item.replace('/', '%2F');
      item = item.replace('+', '%2B');
    } while (item.includes('/') || item.includes(':') || item.includes('+'));

    return item;
  }

  /*It has to be tested*/
  function deleteEvent(json, item) {
    item.id = prepareStringForPost(item.id);
    item.field = prepareStringForPost(item.field);

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
        console.log(response);
        if (response.ok) {
          setIsLoaded(false);
          loadCards(json);
          setIsLoaded(true);
          console.log('Cancelled!');
        }
      })
      .catch(error => console.log(error));
  }

  //2021-06-02T12:00:00.000+0200
  //http://mml.arces.unibo.it:3000/v0/WDmanager/{id}/WDMInspector/irrigations?from=2021-05-03T09%3A58%3A11.000%2B0200&to=2021-06-02T12%3A00%3A00.000%2B0200
  function loadCardHistory(from, to) {
    let fromRequest = formatDataForHistoryRequest(from);
    let toRequest = formatDataForHistoryRequest(to);

    setIsLoaded(false);

    fetch(
      'http://mml.arces.unibo.it:3000/v0/WDmanager/{id}/WDMInspector/irrigations?from=' +
        fromRequest +
        '&to=' +
        toRequest
    )
      .then(res => res.json())
      .then(json => loadCards(json))
      .then(() => setIsLoaded(true))
      //.then(() => console.log('Server data fetched successfully'))
      .catch(() => {
        setIsLoaded(true);
        console.log('Server data fetch error');
      });
  }

  /* Accepting event for tomorrow tab */
  function acceptEventTomorrow(json, item) {
    console.log(item);
    let finalJsonToPost = prepareStringForPost(item);
    console.log(finalJsonToPost);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Accepted' }),
    };

    fetch(
      'http://mml.arces.unibo.it:3000/v0/WDmanager/{id}/WDMInspector/{ispector}/AssignedFarms/' +
        finalJsonToPost.field +
        '/irrigation_plan/' +
        finalJsonToPost.id +
        '/status',
      requestOptions
    )
      .then(response => {
        console.log(response);
        if (response.ok) {
          setIsLoaded(false);
          loadCards(json);
          setIsLoaded(true);
          console.log('Accepted!');
        }
      })
      .catch(error => console.log(error));
  }

  function goToDetails() {
    return <DetailsTab ObjectDetails={itemDetails} BackEvent={() => setDetailsClicked(false)} />;
  }

  return !snackBarError ? (
    isLoaded ? (
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

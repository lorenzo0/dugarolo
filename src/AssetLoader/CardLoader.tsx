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

/* 
  Structure of the data received from the server and used
  to communicate with mml by POST 
*/
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

  /*
    IF data are already loaded,
      IF to and from (Datepickers) are defined,
        call dedicated function to load data for history tab

      IF to and from (Datepickers) are NOT defined,
        call function to generate the rest of the cards.

    IF data shows message as Failed,
      print snackbar of error

    IF data shows message as Loading,
      print message of retriving message
    
  */
  useEffect(() => {
    if (props.cardsData === 'Loading') console.log('Loading cards data');
    else if (props.cardsData === 'Failed') setSnackBarError(true);
    else {
      if (props.to && props.from && !fetchingHistory) loadCardHistory();
      else loadCards(props.cardsData);
    }
  }, [isLoaded, props.cardsData, props.chosenDugarolo, props.from, props.to]);

  /*
    function which convert data from format:
      2021-06-07T12:02:04.123+0200

    to an object with all the information separated.
  */
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

  /*
    Server MML request a type of data which has to be like this;
      2021-06-07T12:02:04.123+0200

    The function requested (x value) remove the 0 value of day, month, minute and second value,
    making the format of the data invalid;

      2021-6-7T12:2:4.123+0200 INVALID
      2021-06-07T12:02:04.123+0200 VALID
  */
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

  /* 
    This function finds the reference between the request and the field data.
    The requests data are retrieved by this API;
      http://mml.arces.unibo.it:3000/v0/WDmanager/{id}/WDMInspector/{inspector}/irrigation_plan
    
    and release data in JSON with this format;

      {
        "id": "nodeID://b25850304",
        "field": "http://swamp-project.org/cbec/field_25903",
        "type": "CBEC",
        "channel": {
          "id": "http://swamp-project.org/cbec/canal_BBE753",
          "name": "ZAPPELLAZZO"
        },
        "waterVolume": 2,
        "start": "2021-06-07T12:00:00.000+0200",
        "status": "Satisfied"
      }

    The fields data are retrieved by this API;
      http://mml.arces.unibo.it:3000/v0/WDmanager/{id}/WDMInspector/{ispector}/assigned_farms
    
    and release data in JSON with this format;

      {
        "name":"http://swamp-project.org/cbec/farmer_91268487",
        "location":{"lat":44.829997852407445,"lon":10.5473201941384},
        "fields":[{"id":"http://swamp-project.org/cbec/field_25905",
          "location":{"lon":10.5481341798491,"lat":44.8314080153867},
          "area":[{"lon":10.5481341798491,"lat":44.8314080153867} ....

    
    In order to have the location of the field specified by the request, the data
    received from the second API has to be analysed. This function is used to linked these two information.
  */
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

  /*
    Since the server does not assign the dugarolo to the single request,
    I generate this information randomly, supposing there are 7 dugaroli 
    who have to satisfy all the requests.
  */

  function generateRandomDugarolo() {
    return Math.floor(Math.random() * 7);
  }

  /* 
    This function set the hook 'cardList' which return the list of the card
    with all the information associated to the requests.

    Once I have the json, I;
      - generate the dugarolo assigned to satisfy the request.
      - filter the requests; 
        - if the tab selected is today I want to show only the requests 
          with status Accepted, Ongoing or Interrupted
        - if the tab selected is tomorrow I want to show only the requests 
          with status Scheduled
         if the tab selected is history I want to show all the requests.
      - filter the requests by data.
      - filter the requests by dugarolo (if specified, else the value is -1)
      - sort them
      - create the object Card with all the details and add it to the main list
  */

  function loadCards(json) {
    setCardList(
      json
        .map(item => {
          item.dugarolo = generateRandomDugarolo();
          return item;
        })
        .filter(item => {
          if (props.tabName === 'Tomorrow') {
            if (
              item.status === 'Cancelled' &&
              item.status === '4'
            )
              return true;
            return false;
          }else if (props.tabName === 'Today') {
            if (
              item.status === 'Accepted' &&
              item.status === '1' &&
              item.status === 'Ongoing' &&
              item.status === '2' &&
              item.status === 'Interrupted' &&
              item.status === '3'
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

  /*
    When both of the datepickers have a value that is not undefined, the
    system send a get request to the mml server in order to retrieve 
    all the requests which are listed in the interval specified by the user.
  */
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

  /*
    This function specify the behaviour of the system when
    a card is pressed (not the interactive buttons) 
  */
  function onPressEvent(item) {
    setItemDetails(item);
    setDetailsClicked(true);
  }
  
  /*
    When the dugarolo asks to remove a request (Today tab, from accepted or interrupted status, 
    Tomorrow Tab, from Scheduled), it has to change status
    to Cancelled. This is done by a POST request from the APP to the mml server.
    
    If the post request received an answer 'ok', as sign that it went well (such as status 200, 204, ...),
    the list is updated, removing the selected card from the cardLoader list.
  */
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

  /*
    When the dugarolo asks to satisfy (Today tab, from ongoing status) a request, it has to change status
    to Satified. This is done by a POST request from the APP to the mml server.
    
    If the post request received an answer 'ok', as sign that it went well (such as status 200, 204, ...),
    the list is updated, removing the selected card from the cardLoader list.
  */
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

  /*
    When the dugarolo asks to accept a request (Tomorrow Tab), it has to change status
    to Accepted. This is done by a POST request from the APP to the mml server.
    
    If the post request received an answer 'ok', as sign that it went well (such as status 200, 204, ...),
    the list is updated, removing the selected card from the cardLoader list.
  */
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

  /*
    When onPressEvent() is triggered, DetailsTab function is called
  */
  function goToDetails() {
    return <DetailsTab ObjectDetails={itemDetails} BackEvent={() => setDetailsClicked(false)} />;
  }

  /*
    IF the data recived are not null,
      IF the loading of the arrays with the information are full AND
      the history information are not fetching,
        IF the details of the card are not requested,

          IF the list of the cards have a size > 0,
            load card
          IF the list of the cards have a size == 0,
            print alert
        
        IF the details of the card are requested,
          DetailsTab function is called

      IF the loading of the arrays with the information are empty OR
      the history information are fetching,
        Alert with loading message is printed

    IF the data recived are null,
      snackbar with error message is printed
  */
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

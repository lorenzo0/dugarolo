import React, { useState, useEffect } from 'react';
import DetailsTab from '../tabs/Details/DetailsTab';
import CardItem from '../components/cards/Cards';
import { List, Snackbar } from '@material-ui/core';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import Alert from '@material-ui/lab/Alert';

export interface ParsedDateTime {
  day: number;
  month: number;
  year: number;
  hour: number;
  minutes: number;
  seconds: number;
}

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

interface ContainerProps {
  tabName: string;
  gotoLocation: (newLocation) => void;
  chosenDugarolo: number;
  from?: MaterialUiPickersDate;
  to?: MaterialUiPickersDate;
}

function compareDates(x: ParsedDateTime, y: MaterialUiPickersDate, from: boolean): boolean {
  if (!y) return true;

  if (x.year === y.year()) {
    if (x.month === y.month() + 1) {
      if (x.day === y.date()) {
        if (from) return true;
        return false;
      }
      return x.day < y.date() ? false : true;
    }
    return x.month < y.month() + 1 ? false : true;
  }
  return x.year < y.year() ? false : true;
}

export default function CardLoader({
  tabName,
  gotoLocation,
  chosenDugarolo,
  from,
  to,
}: ContainerProps): JSX.Element {
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const [cardList, setCardList] = React.useState<any[]>([]);
  const [detailsClicked, setDetailsClicked] = React.useState(false);
  const [itemDetails, setItemDetails] = useState<any>();
  const [snackBarError, setSnackBarError] = useState<boolean>(false);

  /* isLoaded is not set false in the first time */
  useEffect(() => {
    fetch('http://mml.arces.unibo.it:3000/v0/WDmanager/{id}/WDMInspector/{inspector}/irrigation_plan')
      .then(res => res.json())
      .then(json => loadCards(json))
      .then(() => setIsLoaded(true))
      //.catch((error) => console.log(error));
      .catch(() => setSnackBarError(true));
  }, [isLoaded, chosenDugarolo, from, to]);

  function generateRandomDugaroli() {
    return Math.floor(Math.random() * 7); 
  }

  function loadCards(json) {

    setCardList(
      json
        .filter(item => item.status !== 'Deleted')
        .filter(item => item.status !== 'Satisfied')
        .filter(item => {
          const currentDate = new Date();
          const itemDate = parseDate(item.start);

          if (tabName === 'Today') {
            if (
              itemDate.day === currentDate.getDate() &&
              itemDate.month === currentDate.getMonth() + 1
            ) {
              return true;
            }
            return false;
          } else if (tabName === 'Tomorrow') {
            if (
              itemDate.day === currentDate.getDate() + 1 &&
              itemDate.month === currentDate.getMonth() + 1
            ) {
              return true;
            }
            return false;
          } else if (tabName === 'History') {
            if (from && to) {
              return compareDates(itemDate, from, true) && !compareDates(itemDate, to, false);
            } else if (from && !to) {
              return compareDates(itemDate, from, true);
            } else if (!from && to) {
              return !compareDates(itemDate, to, false);
            }
          }
          return true;
        })
        .filter(item => item.dugarolo === chosenDugarolo || chosenDugarolo === -1)
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
            tab={tabName}
            id={item.id}
            dateTime={parseDate(item.start)}
            status={item.status}
            waterVolume={item.waterVolume}
            field={item.field}
            channel={{id: item.channel.id, name: item.channel.name}}
            type={item.type}
            dugarolo={2}
            onPressEvent={() => onPressEvent(item)}
            onLocationEvent={() => gotoLocation([40, 2])}
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

  function prepareStringForPost(item){

    do{
      item.id = item.id.replace(":", "%3A");
      item.id = item.id.replace("/", "%2F");
    }while(item.id.includes("/") ||
              item.id.includes(":"));

    do{
      item.field = item.field.replace(":", "%3A");
      item.field = item.field.replace("/", "%2F");
    }while(item.field.includes("/") ||
            item.field.includes(":"));

    return item;
  }

  function deleteEvent(json, item) {
    console.log(item);
    let finalJsonToPost = prepareStringForPost(item);
    console.log(finalJsonToPost);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Cancelled' })
    };

    fetch("http://mml.arces.unibo.it:3000/v0/WDmanager/{id}/WDMInspector/{ispector}/AssignedFarms/" + finalJsonToPost.field + "/irrigation_plan/" + finalJsonToPost.id + "/status", requestOptions)
      .then(response => {
        console.log(response);
        if (response.ok) {
          setIsLoaded(false);
          loadCards(json);
          setIsLoaded(true);
          console.log("Cancelled!")
        }
      })
      .catch((error) => console.log(error));
  }

  /* Accepting event for tomorrow tab */
  function acceptEventTomorrow(json, item) {
    console.log(item);
    let finalJsonToPost = prepareStringForPost(item);
    console.log(finalJsonToPost);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Accepted' })
    };

    fetch("http://mml.arces.unibo.it:3000/v0/WDmanager/{id}/WDMInspector/{ispector}/AssignedFarms/" + finalJsonToPost.field + "/irrigation_plan/" + finalJsonToPost.id + "/status", requestOptions)
      .then(response => {
        console.log(response);
        if (response.ok) {
          setIsLoaded(false);
          loadCards(json);
          setIsLoaded(true);
          console.log("Accepted!")
        }
      })
      .catch((error) => console.log(error));
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

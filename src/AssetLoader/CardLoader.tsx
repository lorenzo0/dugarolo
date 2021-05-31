import React, { useState, useEffect } from 'react';
import DetailsTab from '../tabs/Details/DetailsTab';
import CardItem from '../components/cards/Cards';
import { List, Snackbar } from '@material-ui/core';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import Alert from '@material-ui/lab/Alert';

interface CardProps {
  id: number;
  name: string;
  username: string;
  dateTime: string;
  status: string;
  waterVolume: number;
  field: string;
  message: string;
  channel: string;
  type: string;
  nameChannel: string;
  dugarolo: number;
}

const API: CardProps[] = [
  {
    id: 1,
    name: '31-05',
    username: 'Name 1',
    dateTime: '2021-05-31T07:38:56.096Z',
    status: 'Accepted',
    waterVolume: 10,
    field: 'field',
    message: 'message',
    channel: 'Channel',
    type: 'CBEC',
    nameChannel: 'Fosfondo',
    dugarolo: 1,
  },
  {
    id: 2,
    name: '01-06',
    username: 'Name 2',
    dateTime: '2021-06-02T07:38:52.054Z',
    status: 'Accepted',
    waterVolume: 15,
    field: 'field',
    message: 'message',
    channel: 'Channel',
    type: 'Criteria',
    nameChannel: 'Fosfondo',
    dugarolo: 2,
  },
  {
    id: 3,
    name: '01-06',
    username: 'Name 3',
    dateTime: '2021-06-02T08:38:56.096Z',
    status: 'Accepted',
    waterVolume: 10,
    field: 'field',
    message: 'message',
    channel: 'Channel',
    type: 'CBEC',
    nameChannel: 'Fosfondo',
    dugarolo: 3,
  },
  {
    id: 4,
    name: '02-06',
    username: 'Name 4',
    dateTime: '2021-06-05T06:20:30.096Z',
    status: 'Accepted',
    waterVolume: 15,
    field: 'field',
    message: 'message',
    channel: 'Channel',
    type: 'Criteria',
    nameChannel: 'Fosfondo',
    dugarolo: 3,
  },
  {
    id: 5,
    name: '03-06',
    username: 'Name 5',
    dateTime: '2021-06-04T06:20:30.095Z',
    status: 'Accepted',
    waterVolume: 15,
    field: 'field',
    message: 'message',
    channel: 'Channel',
    type: 'Criteria',
    nameChannel: 'Fosfondo',
    dugarolo: 6,
  },
  {
    id: 6,
    name: '04-06',
    username: 'Name 6',
    dateTime: '2021-06-06T10:20:30.40Z',
    status: 'Accepted',
    waterVolume: 15,
    field: 'field',
    message: 'message',
    channel: 'Channel',
    type: 'Criteria',
    nameChannel: 'Fosfondo',
    dugarolo: 4,
  },
  {
    id: 7,
    name: '31-05',
    username: 'Name 7',
    dateTime: '2021-05-31T08:20:30.40Z',
    status: 'Accepted',
    waterVolume: 15,
    field: 'field',
    message: 'message',
    channel: 'Channel',
    type: 'Criteria',
    nameChannel: 'Fosfondo',
    dugarolo: 2,
  },
  {
    id: 8,
    name: '31-05',
    username: 'Name 8',
    dateTime: '2021-05-31T12:20:30.40Z',
    status: 'Accepted',
    waterVolume: 15,
    field: 'field',
    message: 'message',
    channel: 'Channel',
    type: 'Criteria',
    nameChannel: 'Fosfondo',
    dugarolo: 2,
  },
];

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
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(json => loadCards(API))
      .then(() => setIsLoaded(true))
      .catch(() => setSnackBarError(true));
  }, [isLoaded, chosenDugarolo, from, to]);

  function loadCards(json: CardProps[]) {

    setCardList(
      json
        .filter(item => item.status !== 'Deleted')
        .filter(item => {
          const currentDate = new Date();
          const itemDate = parseDate(item.dateTime);

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
          const xDate = parseDate(x.dateTime);
          const yDate = parseDate(y.dateTime);

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
            name={item.name}
            username={item.username}
            dateTime={parseDate(item.dateTime)}
            status={item.status}
            waterVolume={item.waterVolume}
            field={item.field}
            message={item.message}
            channel={item.channel}
            type={item.type}
            nameChannel={item.nameChannel}
            dugarolo={item.dugarolo}
            onPressEvent={() => onPressEvent(item)}
            onLocationEvent={() => gotoLocation([40, 2])}
            onAcceptEvent={() => acceptEventTomorrow(json, item.id)}
            onDeleteEvent={() => deleteEvent(json, item.id)}
          />
        ))
    );
  }

  function onPressEvent(item) {
    setItemDetails(item);
    setDetailsClicked(true);
  }

  function deleteEvent(json, id: number) {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({ message: 'Accepted request', status: 'Accepted' }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => {
        if (response.ok) {
          setIsLoaded(false);
          loadCards(json);
          setIsLoaded(true);
        }
      });
  }

  /* Accepting event for tomorrow tab */
  function acceptEventTomorrow(json, id: number) {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({ message: 'Accepted request', status: 'Accepted' }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then(() => {
      setIsLoaded(false);
      loadCards(json);
      setIsLoaded(true);
    });
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

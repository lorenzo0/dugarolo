import React, { useState, useEffect } from 'react';
import TodayCard from '../components/cards/Today/ItemTodayTab';
import TomorrowCard from '../components/cards/Tomorrow/ItemTomorrowTab';
import HistoryCard from '../components/cards/History/ItemHistoryTab';
import DetailsTab from '../tabs/Details/DetailsTab';
import { List } from '@material-ui/core';

const API = [
  {
    id: 1,
    name: 'Name 1',
    username: 'Name 1',
    dateTime: '2021-05-20',
    status: 'Accepted',
    waterVolume: 10,
    field: 'field',
    message: 'message',
    channel: 'Channel',
    type: 'Criteria',
    nameChannel: 'Fosfondo',
    dugarolo: 1,
  },
  {
    id: 2,
    name: 'Name 2',
    username: 'Name 2',
    dateTime: '2021-05-21',
    status: 'Accepted',
    waterVolume: '15',
    field: 'field',
    message: 'message',
    channel: 'Channel',
    type: 'Criteria',
    nameChannel: 'Fosfondo',
    dugarolo: 2,
  },
  {
    id: 3,
    name: 'Name 3',
    username: 'Name 3',
    dateTime: '2021-05-20',
    status: 'Accepted',
    waterVolume: '10',
    field: 'field',
    message: 'message',
    channel: 'Channel',
    type: 'Criteria',
    nameChannel: 'Fosfondo',
    dugarolo: 3,
  },
  {
    id: 4,
    name: 'Name 4',
    username: 'Name 4',
    dateTime: '2021-05-21',
    status: 'Accepted',
    waterVolume: '15',
    field: 'field',
    message: 'message',
    channel: 'Channel',
    type: 'Criteria',
    nameChannel: 'Fosfondo',
    dugarolo: 3,
  },
  {
    id: 5,
    name: 'Name 5',
    username: 'Name 5',
    dateTime: '2021-05-20',
    status: 'Accepted',
    waterVolume: '10',
    field: 'field',
    message: 'message',
    channel: 'Channel',
    type: 'Criteria',
    nameChannel: 'Fosfondo',
    dugarolo: 3,
  },
];

interface ContainerProps {
  name: string;
  gotoLocation: (newLocation) => void;
}

export default function CardLoader({ name, gotoLocation }: ContainerProps): JSX.Element {

  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const [cardList, setCardList] = React.useState<any[]>([]);
  const [detailsClicked, setDetailsClicked] = React.useState(false);
  const [itemDetails, setItemDetails] = useState<any>();

  /* isLoaded is not set false in the first time */
  useEffect(() => {
    loadCards(API);
    setIsLoaded(true);

    /* fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(json => setJsonReq(json))
      .then(() => loadCards())
      .then(() => setIsLoaded(true)); */
  }, [isLoaded]);

  function loadCards(jsonReq) {
    console.log(`Loading ${name} cards`);

    switch (name) {
      case 'Today':
      case 'Schedule':
        setCardList(loadToday(jsonReq));
        break;
      case 'Tomorrow':
        setCardList(loadTomorrow(jsonReq));
        break;
      case 'History':
        setCardList(loadHistory(jsonReq));
        break;
    }
  }

  function loadToday(jsonReq): JSX.Element[] {
    return jsonReq
      .filter(item => item.status !== 'Deleted')
      .map(item => (
        <TodayCard
          key={item.id}
          id={item.id}
          name={item.name}
          datetime={item.dateTime}
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
          onDeleteEvent={() => deleteEvent(item.id, 'Today')}
        />
      ));
  }

  //const ItemTomorrowTab: React.FC<TomorrowObj> = ({id, name, waterVolume, field, nameChannel, type, startTime, durationTime, dugarolo, acceptEvent, delEvent }) => {
  function loadTomorrow(jsonReq): JSX.Element[] {
    return jsonReq
      .filter(item => item.status !== 'deleted')
      .map(item => (
        <TomorrowCard
          key={item.id}
          id={item.id}
          waterVolume={item.waterVolume}
          field={item.field}
          nameChannel={item.nameChannel}
          type={item.type}
          startTime={item.type}
          durationTime={item.type}
          dugarolo={item.dugarolo}
          message={item.message}
          acceptEvent={() => acceptEventTomorrow(jsonReq, item.id)}
          delEvent={() => deleteEvent(item.id, 'Tomorrow')}
        />
      ));
  }

  function loadHistory(jsonReq): JSX.Element[] {
    return jsonReq
      .filter(item => item.status !== 'deleted')
      .map(item => (
        <HistoryCard
          id={item.id}
          name={item.name}
          datetime={item.datetime}
          status={item.status}
          waterVolume={item.waterVolume}
          field={item.field}
          message={item.message}
          channel={item.channel}
          type={item.type}
          nameChannel={item.nameChannel}
          onPressEvent={() => onPressEvent(item)}
          onLocationEvent={() => gotoLocation([40, 2])}
        />
      ));
  }

  function deleteEvent(id: string, tabName: string) {
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

          if (tabName === 'Today') refreshRequests('Today');
          else if (tabName === 'Tomorrow') refreshRequests('Tomorrow');
        }
      })
      .then(() => console.log(`Deleted: ${id}`));
  }

  function refreshRequests(tabName: string) {
    setIsLoaded(false);

    if (tabName === 'Today') {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(json => setCardList(loadToday(json)))
        .then(() => setIsLoaded(true));
    } else if (tabName === 'Tomorrow') {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(json => setCardList(loadTomorrow(json)))
        .then(() => setIsLoaded(true));
    }
  }

  function onPressEvent(item) {
    setItemDetails(item);
    setDetailsClicked(true);

    console.log(`Clicked: ${item.id}`);
  }

  /* Accepting event for tomorrow tab */
  function acceptEventTomorrow(jsonReq, id: string) {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({ message: 'Accepted request', status: 'Accepted' }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(() => setIsLoaded(true))
      .then(() => loadTomorrow(jsonReq));
  }

  function goToDetails() {
    console.log('Opening details for: ' + itemDetails.id);

    return <DetailsTab ObjectDetails={itemDetails} BackEvent={() => setDetailsClicked(false)} />;
  }

  return isLoaded ? (
    !detailsClicked ? (
      <List className="list">{cardList}</List>
    ) : (
      goToDetails()
    )
  ) : (
    <h1>Loading...</h1>
  );
}

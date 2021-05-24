import React, { useState, useEffect } from 'react';
import DetailsTab from '../tabs/Details/DetailsTab';
import { List } from '@material-ui/core';
import CardItem from '../components/cards/Cards';

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
    type: 'CBEC',
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
    type: 'CBEC',
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
    name: 'Req5',
    dateTime: '2021-05-20',
    status: 'Accepted',
    waterVolume: 10,
    startTime: '14:04:42',
    duration: '4:30',
    field: 'field' /* to change */,
    message: 'message',
    channel: 'nameChannel',
    type: 'Criteria',
    dugarolo: 3,
  },
];

interface ContainerProps {
  tabName: string;
  gotoLocation: (newLocation) => void;
  chosenDugarolo: number;
}

export default function CardLoader({
  tabName,
  gotoLocation,
  chosenDugarolo,
}: ContainerProps): JSX.Element {
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const [cardList, setCardList] = React.useState<any[]>([]);
  const [detailsClicked, setDetailsClicked] = React.useState(false);
  const [itemDetails, setItemDetails] = useState<any>();

  /* isLoaded is not set false in the first time */
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(json => loadCards(API))
      .then(() => setIsLoaded(true));
  }, [isLoaded, chosenDugarolo]);

  function loadCards(json) {
    console.log(`Loading ${tabName} cards`);

    setCardList(
      json
        .filter(item => item.status !== 'Deleted')
        .filter(item => item.dugarolo === chosenDugarolo || chosenDugarolo === -1)
        .map(item => (
          <CardItem
            key={item.id}
            tab={tabName}
            id={item.id}
            name={item.name}
            status={item.status}
            waterVolume={item.waterVolume}
            field={item.field}
            message={item.message}
            channel={item.channel}
            type={item.type}
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

    console.log(`Clicked: ${item.id}`);
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
      })
      .then(() => console.log(`Deleted: ${id}`));
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

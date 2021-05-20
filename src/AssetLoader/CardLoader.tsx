import React, { useState, useEffect } from 'react';
import TodayCard from '../components/cards/Today/ItemTodayTab';
import TomorrowCard from '../components/cards/Tomorrow/ItemTomorrowTab';
import HistoryCard from '../components/cards/History/ItemHistoryTab';
import DetailsTab from '../tabs/Details/DetailsTab';
import { List } from '@material-ui/core';

interface ContainerProps {
  name: string;
  gotoLocation: (newLocation) => void;
}

export default function CardLoader({ name, gotoLocation }: ContainerProps): JSX.Element {
  const [jsonReq, setJsonReq] = React.useState<any[]>([]);
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

  const [cardList, setCardList] = React.useState<any[]>([]);

  const [detailsClicked, setDetailsClicked] = React.useState(false);
  const [itemDetails, setItemDetails] = useState<any>();

  /* isLoaded is not set false in the first time */
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(json => setJsonReq(json))
      .then(() => loadCards())
      .then(() => setIsLoaded(true));
  }, [isLoaded]);

  function loadCards() {
    switch (name) {
      case 'Today':
        setCardList(loadToday());
        break;
      case 'Tomorrow':
        setCardList(loadTomorrow());
        break;
      case 'History':
        setCardList(loadHistory());
        break;
    }
  }

  function loadToday(): JSX.Element[] {
    console.log("Loading Today's cards");

    return jsonReq
      .filter(item => item.status !== 'deleted')
      .map(item => (
        <TodayCard
          key={item.id}
          id={item.id}
          name={item.name}
          farm_name={item.username}
          irrigation_time={item.email}
          canal_name={item.address.street}
          duration_time={item.address.suite}
          active={false}
          delEvent={() => deleteEvent(item.id, 'Today')}
          onPressEvent={() => onPressEvent(item)}
          onLocationFieldEvent={() => gotoLocation([40, 2])}
        />
      ));
  }

  function loadTomorrow(): JSX.Element[] {
    console.log("Loading Tomorrow's cards");

    return jsonReq
      .filter(item => item.status !== 'deleted')
      .map(item => (
        <TomorrowCard
          key={item.id}
          id={item.id}
          name={item.name}
          farm_name={item.username}
          irrigation_time={item.email}
          canal_name={item.address.street}
          duration_time={item.address.suite}
          acceptEvent={() => acceptEventTomorrow(item.id)}
          delEvent={() => deleteEvent(item.id, 'Tomorrow')}
        />
      ));
  }

  function loadHistory(): JSX.Element[] {
    console.log("Loading History's cards");

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
        .then(json => setJsonReq(json))
        .then(() => setCardList(loadToday()))
        .then(() => setIsLoaded(true));
    } else if (tabName === 'Tomorrow') {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(json => setJsonReq(json))
        .then(() => setCardList(loadTomorrow()))
        .then(() => setIsLoaded(true));
    }
  }

  function onPressEvent(item) {
    setItemDetails(item);
    setDetailsClicked(true);

    console.log(`Clicked: ${item.id}`);
  }

  /* Accepting event for tomorrow tab */
  function acceptEventTomorrow(id: string) {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({ message: 'Accepted request', status: 'Accepted' }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(() => setIsLoaded(true))
      .then(() => loadTomorrow());
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

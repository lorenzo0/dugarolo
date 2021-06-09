import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Tab from './tabs/Tab';

import '@ionic/react/css/core.css';

import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import './theme/variables.css';

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const [cardsData, setCardsData] = useState<any>();
  const [mapData, setMapData] = useState<any>();

  /* 
    This useEffect will be loaded just once, so I make the API's request that don't need
    to be updated during the using of the application. 

    Here I load;
      - Fields and farms
      - Weirs
      - Connections
      - Requests
  */
  useEffect(() => {
    setCardsData('Loading');
    const urls: string[] = [
      'http://mml.arces.unibo.it:3000/v0/WDmanager/%7Bid%7D/WDMInspector/%7Bispector%7D/assigned_farms',
      'http://mml.arces.unibo.it:3000/v0/WDmanager/{id}/wdn/nodes',
      'http://mml.arces.unibo.it:3000/v0/WDmanager/%7Bid%7D/wdn/connections',
    ];

    Promise.all(urls.map(url => fetch(url))).then(responses =>
      Promise.all(responses.map(res => res.json()))
        .then(json => setMapData(json))
        .catch(() => setMapData('Failed'))
    );

    fetch(
      'http://mml.arces.unibo.it:3000/v0/WDmanager/{id}/WDMInspector/{inspector}/irrigation_plan'
    )
      .then(res => res.json())
      .then(json => setCardsData(json))
      .then(() => console.log('Server data fetched successfully'))
      .then(() => setIsLoaded(true))
      .catch(() => setCardsData('Failed'));
  }, [isLoaded]);

  /*
    Routing tabs using IonRouterOutlet. In every tab the data loaded is shared.
    Specifing TodayTab as the default one.

    IonBar is the bottom-bar of the application. From there it is possible to
    modify the tab loaded.
  */
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/TodayTab">
              <Tab
                name="Today"
                cardsData={cardsData}
                setCardsData={setCardsData}
                mapData={mapData}
              />
            </Route>
            <Route exact path="/TomorrowTab">
              <Tab
                name="Tomorrow"
                cardsData={cardsData}
                setCardsData={setCardsData}
                mapData={mapData}
              />
            </Route>
            <Route exact path="/HistoryTab">
              <Tab
                name="History"
                cardsData={cardsData}
                setCardsData={setCardsData}
                mapData={mapData}
              />
            </Route>

            <Redirect exact path="/" to="/TodayTab" />
          </IonRouterOutlet>

          <IonTabBar slot="bottom" color="primary">
            <IonTabButton tab="tab1" href="/TodayTab">
              <IonLabel>Today</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/TomorrowTab">
              <IonLabel>Tomorrow</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab3" href="/HistoryTab">
              <IonLabel>History</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

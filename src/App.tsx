import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Tab from './tabs/Tab';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const [cardsData, setCardsData] = useState<any>();
  const [mapData, setMapData] = useState<any>();

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

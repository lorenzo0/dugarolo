import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import TodayTab from './tabs/Today/TodayTab';
import TomorrowTab from './tabs/Tomorrow/TomorrowTab';
import HistoryTab from './tabs/History/HistoryTab';
import MapTab from './tabs/Map/MapTab'

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
import FullMap from './components/map/fullMap';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/TodayTab">
            <TodayTab />
          </Route>
          <Route exact path="/TomorrowTab">
            <TomorrowTab />
          </Route>
          <Route path="/HistoryTab">
            <HistoryTab />
          </Route>

          <Redirect exact path="/" to="/TodayTab" />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
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

export default App;

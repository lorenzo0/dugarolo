import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import Tab1 from './tabs/Today/TodayTab';
import Tab2 from './tabs/Tomorrow/TomorrowTab';
import Tab3 from './tabs/History/HistoryTab';

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

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>

          <Route exact path="/TodayTab">
            <Tab1 />
          </Route>
          <Route exact path="/TomorrowTab">
            <Tab2 />
          </Route>
          <Route path="/HistoryTab">
            <Tab3 />
          </Route>
          
          <Route exact path="/">
            <Redirect to="/TodayTab" />
          </Route>
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
//<IonIcon icon={triangle} />

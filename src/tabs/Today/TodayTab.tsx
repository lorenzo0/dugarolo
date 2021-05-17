import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import LayoutTabs from '../../components/LayoutTabs';
import './TodayTab.css';

const TodayTab = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Today's activities</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Today</IonTitle>
          </IonToolbar>
        </IonHeader>
        <LayoutTabs name="Today" />
      </IonContent>
    </IonPage>
  );
};

export default TodayTab;

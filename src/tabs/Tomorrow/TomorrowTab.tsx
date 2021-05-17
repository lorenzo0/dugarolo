import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import LayoutTabs from '../../components/LayoutTabs';
import './TomorrowTab.css';

const TomorrowTab: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tomorrow's activities</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
        <LayoutTabs name="Tomorrow"/>
      </IonContent>
    </IonPage>
  );
};

export default TomorrowTab;

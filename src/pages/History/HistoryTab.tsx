import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import LayoutTabs from '../../components/LayoutTabs';
import './HistoryTab.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
        <LayoutTabs name="Tab 3 page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;

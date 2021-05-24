import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import LayoutTabs from '../../components/LayoutTabs';
import './HistoryTab.css';

export default function HistoryTab(): JSX.Element {
  return (
    <IonPage>
      <IonHeader>
      <IonToolbar color="primary">
          <IonTitle>History</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">History</IonTitle>
          </IonToolbar>
        </IonHeader>
        <LayoutTabs name="History" />
      </IonContent>
    </IonPage>
  );
}

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import LayoutTabs from '../../components/LayoutTabs';
import './TomorrowTab.css';

export default function TomorrowTab(): JSX.Element {
  return (
    <IonPage>
      <IonHeader>
      <IonToolbar color="primary">
          <IonTitle>Tomorrow's activities</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tomorrow</IonTitle>
          </IonToolbar>
        </IonHeader>
        <LayoutTabs name="Tomorrow" />
      </IonContent>
    </IonPage>
  );
}

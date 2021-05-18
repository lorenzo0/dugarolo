import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import FullMap from '../../components/map/fullMap';

export default function MapTab(farms): JSX.Element {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Map</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Map</IonTitle>
          </IonToolbar>
        </IonHeader>
        <FullMap farms={farms} />
      </IonContent>
    </IonPage>
  );
}

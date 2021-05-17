import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import LayoutTabs from '../../components/LayoutTabs';
import FullMap from '../../components/map/fullMap';

const MapTab = ({farms}) => {
  console.log(farms[0])
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
        <FullMap farms={farms}/>
      </IonContent>
    </IonPage>
  );
};

export default MapTab;

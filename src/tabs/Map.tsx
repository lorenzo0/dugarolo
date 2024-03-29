import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import FullMap from '../components/maps/full/fullMap';

interface Props {
  farms: any;
  weirs: any;
  connections: any;
  toggleExtendedMap: () => void;
}

/*
  This tab is dedicated to show the map at full screen.
  In order to do this, LayoutTabs.tsx is not called, avoiding the division of the screen.
*/

export default function MapTab({
  farms,
  weirs,
  connections,
  toggleExtendedMap,
}: Props): JSX.Element {
  return (
    <IonPage>
      <IonHeader>
      <IonToolbar color="primary">
          <IonTitle>Map</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Map</IonTitle>
          </IonToolbar>
        </IonHeader>
        <FullMap
          farms={farms}
          weirs={weirs}
          connections={connections}
          toggleExtendedMap={toggleExtendedMap}
        />
      </IonContent>
    </IonPage>
  );
}

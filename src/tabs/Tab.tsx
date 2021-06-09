import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Dispatch, SetStateAction } from 'react';
import LayoutTabs from '../components/LayoutTabs';

interface Props {
  name: string;
  cardsData: any;
  setCardsData: Dispatch<SetStateAction<undefined>>;
  mapData: any;
}

/*
  Every tab has the same layout. This is defined by the function LayoutTabs.
  I need this function in order to let the user understand in which tab he/she is using.
*/
export default function Tab(props: Props): JSX.Element {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>{props.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{props.name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <LayoutTabs
          tabName={props.name}
          cardsData={props.cardsData}
          setCardsData={props.setCardsData}
          mapData={props.mapData}
        />
      </IonContent>
    </IonPage>
  );
}

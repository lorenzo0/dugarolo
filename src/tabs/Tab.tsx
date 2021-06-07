import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Dispatch, SetStateAction } from 'react';
import LayoutTabs from '../components/LayoutTabs';

interface Props {
  name: string;
  cardsData: any;
  setCardsData: Dispatch<SetStateAction<undefined>>;
  mapData: any;
}

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

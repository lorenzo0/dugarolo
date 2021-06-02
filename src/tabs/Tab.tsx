import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Dispatch, SetStateAction, useEffect } from 'react';
import LayoutTabs from '../components/LayoutTabs';

interface Props {
  name: string;
  serverData: any;
  setServerData: Dispatch<SetStateAction<undefined>>;
}

export default function TodayTab(props: Props): JSX.Element {
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
          serverData={props.serverData}
          setServerData={props.setServerData}
        />
      </IonContent>
    </IonPage>
  );
}

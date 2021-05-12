import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import {Button} from '@material-ui/core';
import {ArrowBack} from '@material-ui/icons';
import LayoutTabs from '../../components/LayoutTabs';
import '../../components/LayoutTabs.css'

interface TodayObj {
    ObjectDetails: any;
    BackEvent: any;
}

const DetailsTab: React.FC<TodayObj> = ({ObjectDetails, BackEvent}) => {
    console.log(ObjectDetails);
  return (
    <div>
        <div className="row" >
            <Button className="btn-back" size="small" startIcon={<ArrowBack />} onClick={BackEvent}/>
        </div>
        <div className="title-canal">{ObjectDetails.name}</div>

        <div className="row" >
            <div className="column_2">
                <div className="title">ID </div>
            </div>
            <div className="column_2">
                <div className="value">{ObjectDetails.id}</div>
            </div>
        </div>

        <div className="row" >
            <div className="column_2">
                <div className="title">Username </div>
            </div>
            <div className="column_2">
                <div className="value">{ObjectDetails.username}</div>
            </div>
        </div>

        <div className="row" >
            <div className="column_2">
                <div className="title">Email </div>
            </div>
            <div className="column_2">
                <div className="value">{ObjectDetails.email}</div>
            </div>
        </div>
    </div>
  );
};

export default DetailsTab;

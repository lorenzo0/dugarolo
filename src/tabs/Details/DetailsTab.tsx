import { Button } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

interface TodayObj {
  ObjectDetails: any;
  BackEvent: any;
}

export default function DetailsTab({ ObjectDetails, BackEvent }: TodayObj): JSX.Element {
  return (
    <div>
      <div className="row">
        <Button className="btn-back" size="small" startIcon={<ArrowBack />} onClick={BackEvent} />
      </div>
      <div className="title-canal">{ObjectDetails.name}</div>

      <div className="row">
        <div className="column_2">
          <div className="title">ID </div>
        </div>
        <div className="column_2">
          <div className="value">{ObjectDetails.id}</div>
        </div>
      </div>

      <div className="row">
        <div className="column_2">
          <div className="title">Name </div>
        </div>
        <div className="column_2">
          <div className="value">{ObjectDetails.name}</div>
        </div>
      </div>

      <div className="row">
        <div className="column_2">
          <div className="title">Date </div>
        </div>
        <div className="column_2">
          <div className="value">{ObjectDetails.dateTime}</div>
        </div>
      </div>
    </div>
  );
}

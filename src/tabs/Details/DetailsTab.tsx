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
          <div className="title">ID request</div>
        </div>
        <div className="column_2">
          <div className="value">{ObjectDetails.id}</div>
        </div>
      </div>

      <div className="row">
        <div className="column_2">
          <div className="title">ID field </div>
        </div>
        <div className="column_2">
          <div className="value">{ObjectDetails.field}</div>
        </div>
      </div>

      <div className="row">
        <div className="column_2">
          <div className="title">Start time </div>
        </div>
        <div className="column_2">
          <div className="value">{ObjectDetails.start}</div>
        </div>
      </div>

      <div className="row">
        <div className="column_2">
          <div className="title">Water volume </div>
        </div>
        <div className="column_2">
          <div className="value">{ObjectDetails.waterVolume}</div>
        </div>
      </div>

      <div className="row">
        <div className="column_2">
          <div className="title">Current status </div>
        </div>
        <div className="column_2">
          <div className="value">{ObjectDetails.status}</div>
        </div>
      </div>
    </div>
  );
}

/*
Not printable until dugarolo will be added to the request
  <div className="row">
    <div className="column_2">
      <div className="title">Dugarolo assigned</div>
    </div>
    <div className="column_2">
      <div className="value">{ObjectDetails.dugarolo}</div>
    </div>
  </div>
*/
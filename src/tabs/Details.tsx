import { Button } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

interface TodayObj {
  ObjectDetails: any;
  BackEvent: any;
}

function parseDate(rawDateTime: string){
  let tmpDateTime: string[] = rawDateTime.split('T');
  let finalMonth, finalDay, finalHour, finalMinutes, finalSeconds;

  let date = tmpDateTime[0].split('-');
  let year: number = parseInt(date[0]);
  let month: number = parseInt(date[1]);
  let day: number = parseInt(date[2]);

  let time = tmpDateTime[1].split(':');
  let hour: number = parseInt(time[0]);
  let minutes: number = parseInt(time[1]);
  let seconds: number = parseFloat(time[2].substring(0, time[2].length - 1));

  if (month < 10) finalMonth = '0' + month; else finalMonth = month;
  if (day < 10) finalDay = '0' + day; else finalDay = day;
  if (hour < 10) finalHour = '0' +  hour; else finalHour = hour;
  if (minutes < 10) finalMinutes = '0' +  minutes; else finalMinutes = minutes;
  if (seconds < 10) finalSeconds = '0' +  seconds; else finalSeconds = seconds;

  return year + "-" + finalMonth + "-" + finalDay + " at " + finalHour + ":" + finalMinutes + ":" + finalSeconds;
}

function parseStatus(status: string){
  if(status === "3") return "Interrupted";
  else if(status === "2") return "Ongoing";
  else if(status === "1") return "Accepted";
  else if(status === "0") return "Scheduled";
  else return status;
}

export default function DetailsTab({ ObjectDetails, BackEvent }: TodayObj): JSX.Element {
  let startTime = parseDate(ObjectDetails.start);
  let statusString = parseStatus(ObjectDetails.status);

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
          <div className="value">{startTime}</div>
        </div>
      </div>

      <div className="row">
        <div className="column_2">
          <div className="title">Water volume </div>
        </div>
        <div className="column_2">
          <div className="value">{ObjectDetails.waterVolume + " L"}</div>
        </div>
      </div>

      <div className="row">
        <div className="column_2">
          <div className="title">Current status </div>
        </div>
        <div className="column_2">
          <div className="value">{statusString}</div>
        </div>
      </div>

      <div className="row">
        <div className="column_2">
          <div className="title">Assigned dugarolo </div>
        </div>
        <div className="column_2">
          <div className="value">{ObjectDetails.dugarolo}</div>
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
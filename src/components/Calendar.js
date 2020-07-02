import React from 'react'
import moment from 'moment'
import 'moment/locale/pl'
import { toDate } from 'date-fns';
import Scheduler, {SchedulerData, ViewTypes, DATE_FORMAT} from 'react-big-scheduler'



moment.updateLocale('pl', { week : { dow : 2, doy : 4 } }); 



export function Calendar() {

    const weekdayshort = moment.weekdays();
    const hours = [
        "7:00",
        "7:30",
        "8:00",
        "8:30",
        "9:00",
        "9:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "17:30",
        "18:00",
        "18:30",
        "19:00",
        "19:30",
        "20:00",
        "20:30"
      ]
      let timeList = hours.map(hour => {
        return(
        <div className="hour">
            <td key={hour} className="hour-td">
                {hour}
            </td>
      </div>
        );
    })
    
    let weekdayshortname = weekdayshort.map(day => {
        return (
          <div className="weekday-name">
            <th key={day} className="week-day">
            {day}
            <tr className="idk-pls">{timeList}</tr>
            </th>
          </div>

        );
     });

    
    

    return (
        <div className="calendar">
            <table>
                <div className="calendar-day-name">
                    <tr>{weekdayshortname}</tr>
                </div>
                <div className="calendar-hours">
                    {/* <tr>{timeList}</tr>
                    <tr>{timeList}</tr> */}
                </div>
            </table>
        </div>
    )

}
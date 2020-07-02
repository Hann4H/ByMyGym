import React from 'react'
import moment from 'moment'
import 'moment/locale/pl'
import { toDate } from 'date-fns';
import Scheduler, {SchedulerData, ViewTypes, DATE_FORMAT} from 'react-big-scheduler'
import { momentLocalizer } from 'react-big-calendar';



moment.updateLocale('pl', { week : { dow : 2, doy : 4 } }); 


moment.updateLocale("pl", { week: { dow: 1 } });

export function Calendar() {
  const weekdayshort = moment.weekdays(true);

    const [currentMonth, setCurrentMonth] = React.useState(new Date());
    const [selectedDate, setSelectedDate] = React.useState(new Date());


    function getWeek(start) {
        start = start || 0;
        var today = new Date(this.setHours(0, 0, 0, 0));
        var day = today.getDay() - start;
        var date = today.getDate() - day;

        var StartDate = new Date(today.setDate(date));
        var EndDate = new Date(today.setDate(date + 6));
        return [StartDate, EndDate];
    }

    const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const DAYS_OF_THE_WEEK = ['poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota', 'niedziela'];
    const MONTHS = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'];


    const hours = [
        "\xa07:00\xa0",
        "\xa07:30\xa0",
        "\xa08:00\xa0",
        "\xa08:30\xa0",
        "\xa09:00\xa0",
        "\xa09:30\xa0",
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

    
    function getCurrentDate(separator=' '){

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        
        return `${separator}${date}.${month<10?`0${month}`:`${month}`}`
    }
    
    let weekdayshortname = weekdayshort.map(day => {
        return (
          <div className="weekday-name">
            <th key={day} className="week-day">
            {day}
            {/* {getCurrentDate( )} */}
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
  );

}

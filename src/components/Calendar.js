import React from "react";
import moment from "moment";
import "moment/locale/pl";
import { toDate } from "date-fns";
import Scheduler, {
  SchedulerData,
  ViewTypes,
  DATE_FORMAT,
} from "react-big-scheduler";
import { momentLocalizer } from "react-big-calendar";
import * as dates from "date-fns";
import firebase from "../firebase";

moment.updateLocale("pl", { week: { dow: 2, doy: 4 } });

moment.updateLocale("pl", { week: { dow: 1 } });

export function Calendar(props) {
  const weekdayshort = moment.weekdays(true);

  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [indexStart, setIndexStart] = React.useState(7);
  const [indexEnd, setIndexEnd] = React.useState(14);

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
  const DAYS_OF_THE_WEEK = [
    "poniedziałek",
    "wtorek",
    "środa",
    "czwartek",
    "piątek",
    "sobota",
    "niedziela",
  ];
  const MONTHS = [
    "styczeń",
    "luty",
    "marzec",
    "kwiecień",
    "maj",
    "czerwiec",
    "lipiec",
    "sierpień",
    "wrzesień",
    "październik",
    "listopad",
    "grudzień",
  ];

  const hours = [
    "\xa07:00\xa0",
    // "\xa07:30\xa0",
    "\xa08:00\xa0",
    // "\xa08:30\xa0",
    "\xa09:00\xa0",
    // "\xa09:30\xa0",
    "10:00",
    // "10:30",
    "11:00",
    // "11:30",
    "12:00",
    // "12:30",
    "13:00",
    // "13:30",
    "14:00",
    // "14:30",
    "15:00",
    // "15:30",
    "16:00",
    // "16:30",
    "17:00",
    // "17:30",
    "18:00",
    // "18:30",
    "19:00",
    // "19:30",
    "20:00",
    // "20:30"
  ];

  const hoursObj = {
    "\xa07:00\xa0": false,
    "\xa08:00\xa0": false,
    "\xa09:00\xa0": false,
    "10:00": false,
    "11:00": false,
    "12:00": false,
    "13:00": false,
    "14:00": false,
    "15:00": false,
    "16:00": false,
    "17:00": false,
    "18:00": false,
    "19:00": false,
    "20:00": false,
  };

  function checkTime(start, end) {
    let id = props.gymId;
    firebase
      .firestore()
      .collection("bookings")
      .where("gym_id", "==", "id")
      .get()
      .then((doc) => {
        const bookings = [];
        bookings.push({
          startTimes: doc.data().selectedTime_start,
          endTimes: doc.data().selectedTime_end,
        });
        bookings.startTimes.map((startTime) => {
          bookings.endTimes.map((endTime) => {
            if (start > startTime && end < endTime) {
              return false;
            }
          });
        });
      });
  }

  function checkHour(hour) {}

  let timeList = hours.map((hour) => {
    return (
      <div className="hour">
        <td key={hour} className="hour-td">
          {hour}
        </td>
      </div>
    );
  });

  function getCurrentDate(separator = " ") {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${separator}${date}.${month < 10 ? `0${month}` : `${month}`}`;
  }

  let start = dates.startOfMonth(new Date());
  let firstWeek = dates.getISOWeek(start);
  let end = dates.endOfMonth(new Date());

  let lastWeek = dates.getISOWeek(end);

  function checkIfBooked() {}

  function iterateDays() {
    var a = moment("2020-06-22");
    var b = moment("2022-10-01");
    let array = [];
    let data = [];

    for (var m = moment(a); m.isBefore(b); m.add(1, "days")) {
      // array.push([ m.format('DD.MM'), {hours}]);
      array.push(m.format("DD.MM"));
    }
    console.log(array);
    return array;
  }

  let weekdayshortname = weekdayshort.map((day) => {
    return (
      <div className="weekday-name">
        <th key={day} className="week-day">
          {day}
          {/* {getCurrentDate( )} */}
          <tr type="checkbox" className="idk-pls">
            {timeList}
          </tr>
        </th>
      </div>
    );
  });

  let actualDates = iterateDays()
    .slice(indexStart, indexEnd)
    .map((day) => {
      return (
        <div className="weekday-name">
          <th key={day} className="week-day">
            {day + "\xa0\xa0\xa0\xa0\xa0"}
            {/* {getCurrentDate( )} */}
            <tr className="idk-pls">{timeList}</tr>
          </th>
        </div>
      );
    });

  return (
    <div className="calendar" id="calendar-id">
      <div
        className="icon"
        onClick={() => {
          setIndexStart(indexStart - 7);
          setIndexEnd(indexEnd - 7);
        }}
      >
        chevron_left
      </div>
      <span></span>
      <div
        className="icon"
        onClick={() => {
          setIndexStart(indexStart + 7);
          setIndexEnd(indexEnd + 7);
        }}
      >
        chevron_right
      </div>

      <table>
        <div className="calendar-day-name">
          <tr>{actualDates}</tr>
        </div>
        <div className="calendar-hours">
          {/* <tr>{timeList}</tr>
                    <tr>{timeList}</tr> */}
        </div>
      </table>
    </div>
  );
}

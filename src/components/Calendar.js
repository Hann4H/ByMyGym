import React from "react";
import moment from "moment";
import "moment/locale/pl";

moment.updateLocale("pl", { week: { dow: 1 } });

export function Calendar() {
  const weekdayshort = moment.weekdays(true);

  let weekdayshortname = weekdayshort.map((day) => {
    return (
      <div className="weekday-name">
        <th key={day} className="week-day">
          {day}
        </th>
      </div>
    );
  });

  return (
    <div className="calendar">
      <div className="calendar-day-name">
        <tr>{weekdayshortname}</tr>
      </div>
    </div>
  );
}

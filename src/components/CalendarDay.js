import React from "react";
import { Link } from "react-router-dom";

const CalendarDay = ({ day, date, toDay, isActive }) => {
  const activeTamplate = isActive ? (
    <button
      className={
        date === toDay
          ? "calendar-day-item calendar-day-item-active"
          : "calendar-day-item"
      }
    >
      <Link className="link-no-decor" to={`/tv-series-by-date/${date}`}>
        {day}
      </Link>
    </button>
  ) : (
    <button disabled className="calendar-day-item-disabled">
      {day}
    </button>
  );

  return <React.Fragment>{activeTamplate}</React.Fragment>;
};

export default CalendarDay;

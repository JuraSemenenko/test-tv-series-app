import React from "react";
import { Link } from "react-router-dom";

const CalendarDay = ({ day, date, isActive }) => {
  const activeTamplate = isActive ? (
    <Link className="link-no-decor" to={`/tv-series-by-date/${date}`}>
      <button className="calendar-day-item">{day}</button>
    </Link>
  ) : (
    <button disabled className="calendar-day-item-disabled">
      {day}
    </button>
  );

  return <React.Fragment>{activeTamplate}</React.Fragment>;
};

export default CalendarDay;

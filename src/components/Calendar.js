import React, { Component } from "react";

//import components
import CalendarDay from "./CalendarDay";

import Button from "./Button";
//import helpers
import arrow from "../images/prev.png";
import {
  currentDate,
  createDateData,
  getNewDate,
  getMonthName
} from "../helpers/helpers";

class Calendar extends Component {
  state = {
    daysList: [],
    year: 2018,
    month: 1,
    day: 1,
    monthName: ""
  };

  componentDidMount() {
    const date = currentDate();

    const data = createDateData(date);
    this.setState({
      daysList: data.daysList,
      year: data.year,
      month: data.month,
      day: data.day,
      monthName: getMonthName(data.month)
    });
  }

  handleChangeMonth = action => {
    const { year, month, day } = this.state;
    const data = createDateData(getNewDate(year, month, day, action));
    this.setState({
      daysList: data.daysList,
      year: data.year,
      month: data.month,
      day: data.day,
      monthName: getMonthName(data.month)
    });
  };
  render() {
    const { daysList, monthName } = this.state;

    return (
      <div className="footer">
        <div className="calendar-header-container">
          <Button cssClasses="calendar-action-btn-prev">
            <img
              src={arrow}
              alt="change month button"
              onClick={() => this.handleChangeMonth("prev")}
            />
          </Button>
          <div className="calendar-current-month">{monthName}</div>
          <Button cssClasses="calendar-action-btn-next">
            <img
              src={arrow}
              alt="change month button"
              onClick={() => this.handleChangeMonth("next")}
            />
          </Button>
        </div>
        <div className="calendar-container">
          {daysList.map((item, index) => (
            <CalendarDay
              key={index}
              day={item.day}
              date={item.dateTamplate || "0000"}
              isActive={item.isCurrent}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Calendar;

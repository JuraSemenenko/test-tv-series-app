import React from "react";

// import components
import Button from "./Button";
import SeriesCard from "./SeriesCard";
// import helpers

import moreItemsArrow from "../images/arrow_2.png";

const DailySeriesList = ({
  date,
  data,
  isColaps,
  onClick,
  count,
  onClickModal
}) => {
  return (
    <React.Fragment>
      <div className="current-date-container">
        <p>{date}</p>
      </div>
      {data.length === 0 ? (
        <div className="no-series">
          <p>There are no TV-premieres on this date.</p>
        </div>
      ) : (
        <React.Fragment>
          <div className="series-container">
            {data.map(item => (
              <SeriesCard
                key={item.id}
                data={item}
                onClickModal={onClickModal}
              />
            ))}
          </div>

          <Button cssClasses="show-series-btn" onClick={onClick}>
            <span>{isColaps ? "Show main" : `Another ${count} series`}</span>
            <img
              className={isColaps ? "button-img-open" : "button-img-close"}
              src={moreItemsArrow}
              alt="open/close"
            />
          </Button>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default DailySeriesList;

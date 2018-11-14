import React from "react";

//import components
import Calendar from "./Calendar";

import mainImg from "../images/tv.png";

const MainPageWrapper = props => {
  return (
    <div className="container">
      <header className="header-container">
        <div className="header">
          <h1>Super Film</h1>
        </div>
      </header>
      <main className="main-container">
        <img className="main-img" src={mainImg} alt="tv" />
        <p className="main-p">
          For a list of TV shows, please select the desired month and day.
        </p>
      </main>
      <Calendar />
    </div>
  );
};

export default MainPageWrapper;

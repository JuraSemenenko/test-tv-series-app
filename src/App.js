import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

// import components

import TvSeriesList from "./components/TvSeriesList";
import MainPageWrapper from "./components/MainPageWrapper";

//import css
import "./App.css";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/tv-series-by-date/:date" component={TvSeriesList} />
        <Route path="/" exact component={MainPageWrapper} />
      </Switch>
    );
  }
}

export default App;

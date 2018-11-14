import React, { Component } from "react";

//import components
import DailySeriesList from "./DailySeriesList";
import ModalWindow from "./ModalWindow";
import Button from "./Button";
//import helpers
import {
  getFullDate,
  getPrevDate,
  getDateTamplateToAPI
} from "../helpers/helpers";
import { takeDataFromAPI } from "../helpers/fetchingData";

import back from "../images/arrow.png";

class TvSeriesList extends Component {
  state = {
    todaySeriesData: [],
    todayDataSliced: [],
    currentDateFormat: "",
    isTodayListShort: false,

    prevDaySeriesData: [],
    prevDayDataSliced: [],
    prevDateFormat: "",
    isPrevDayListShort: false,
    isOpenModal: false,
    modalImg: "",
    isLoadingToDay: false,
    isLoadingPrevDay: false
  };

  componentDidMount() {
    //Сегодняшня и вчерашняя дата в JS формате - Январь === 0
    const date = this.props.match.params.date;
    const prevDate = getPrevDate(date);

    //Получаем дату в формате для API
    const currentDateAPI = getDateTamplateToAPI(date);
    const prevDateAPI = getDateTamplateToAPI(prevDate);
    //Получаем дату в формате 1 Января 2018
    const currentDateFormat = getFullDate(date);
    const prevDateFormat = getFullDate(prevDate);

    takeDataFromAPI(currentDateAPI).then(data =>
      this.setState({
        todaySeriesData: data,
        currentDateFormat,
        todayDataSliced: data.length > 2 ? data.slice(0, 2) : data,
        isTodayListShort: data.length <= 2 ? true : false,
        isLoadingToDay: true
      })
    );
    takeDataFromAPI(prevDateAPI).then(data =>
      this.setState({
        prevDaySeriesData: data,
        prevDateFormat,
        prevDayDataSliced: data.length > 2 ? data.slice(0, 2) : data,
        isPrevDayListShort: data.length <= 2 ? true : false,
        isLoadingPrevDay: true
      })
    );
  }

  handleLoadMoreToday = () => {
    const { isTodayListShort, todaySeriesData } = this.state;
    if (isTodayListShort === true) {
      window.scroll(0, 0);
      this.setState({
        todayDataSliced: todaySeriesData.slice(0, 2),
        isTodayListShort: false
      });
    } else {
      this.setState({
        todayDataSliced: todaySeriesData,
        isTodayListShort: true
      });
    }
  };
  handleLoadMorePrevDay = () => {
    const { isPrevDayListShort, prevDaySeriesData } = this.state;
    if (isPrevDayListShort === true) {
      window.scroll(0, 0);
      this.setState({
        prevDayDataSliced: prevDaySeriesData.slice(0, 2),
        isPrevDayListShort: false
      });
    } else {
      this.setState({
        prevDayDataSliced: prevDaySeriesData,
        isPrevDayListShort: true
      });
    }
  };

  handleBack = () => {
    this.props.history.goBack();
  };

  showModal = URL => {
    console.log(URL);
    this.setState({ isOpenModal: true, modalImg: URL });
  };

  hideModal = () => {
    this.setState({ isOpenModal: false, modalImg: "" });
  };
  render() {
    const {
      todaySeriesData,
      todayDataSliced,
      currentDateFormat,
      prevDaySeriesData,
      isTodayListShort,
      prevDayDataSliced,
      prevDateFormat,
      isPrevDayListShort,
      isOpenModal,
      modalImg,
      isLoadingToDay,
      isLoadingPrevDay
    } = this.state;
    const prevDayCount = prevDaySeriesData.length - prevDayDataSliced.length;
    const toDayCount = todaySeriesData.length - todayDataSliced.length;
    return (
      <div className="container series-list-container">
        <header className="header-container">
          <div className="header">
            <h1>Super Film</h1>
          </div>
          <Button onClick={this.handleBack} cssClasses="back-to-calendar-btn">
            <img src={back} alt="Beck to calendar" />
          </Button>
        </header>
        {}
        <DailySeriesList
          date={currentDateFormat}
          data={todayDataSliced}
          isColaps={isTodayListShort}
          onClick={this.handleLoadMoreToday}
          count={toDayCount}
          onClickModal={this.showModal}
        />

        <DailySeriesList
          date={prevDateFormat}
          data={prevDayDataSliced}
          isColaps={isPrevDayListShort}
          onClick={this.handleLoadMorePrevDay}
          count={prevDayCount}
          onClickModal={this.showModal}
        />

        <ModalWindow show={isOpenModal} handleClose={this.hideModal}>
          <img className="modal-img" src={modalImg} alt="Big poster" />
        </ModalWindow>
      </div>
    );
  }
}

export default TvSeriesList;

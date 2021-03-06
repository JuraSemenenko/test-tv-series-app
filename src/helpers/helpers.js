const MONTH = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

//Функция которая возвращает массив с данными для отрисовки календаря

export const createDateData = dateObj => {
  const currentMonthDays = daysInMonth(dateObj.year, dateObj.month);

  const prevMonthDays = daysInMonth(dateObj.year, dateObj.month - 1);

  return createDaysList(dateObj, currentMonthDays, prevMonthDays);
};

//Функция для получения даты предыдущего дня в формате который понимает API
export const getPrevDate = currentDate => {
  const dateArr = currentDate.split("-");
  let date = new Date(Date.UTC(dateArr[0], dateArr[1], dateArr[2]));
  date.setDate(date.getDate() - 1);

  console.log("date", date);
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
};

export const getMonthName = month => MONTH[month];

export const getFullDate = date => {
  const dateArr = date.split("-");

  return `${dateArr[2]}${" "}${MONTH[+dateArr[1]]}${" "}${dateArr[0]}`;
};

// Функция для получения текущей даты, что бы инициализировать календарь.
export const currentDate = () => {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();
  return { day, month, year };
};

export const getDateTamplate = (year, month, day) => {
  return `${year}-${month}-${day}`;
};

export const getDateTamplateToAPI = date => {
  const dateArr = date.split("-");
  const year = +dateArr[0];
  const month = +dateArr[1];
  const day = +dateArr[2];

  return `${year}-${month < 9 ? "0" + (month + 1).toString() : month + 1}-${
    day < 10 ? "0" + day.toString() : day
  }`;
};

export const getDayNumber = (year, month, day) =>
  new Date(year, month, day).getDay() === 0
    ? 6
    : new Date(year, month, day).getDay() - 1;

export const daysInMonth = (year, month) =>
  33 - new Date(year, month, 33).getDate();

export const createDaysList = (
  currentDay,
  daysInCurrentMonth,
  daysInPrevMonth
) => {
  const daysList = [];

  const monthStart = getDayNumber(currentDay.year, currentDay.month, 1);
  const monthFinish = getDayNumber(
    currentDay.year,
    currentDay.month,
    daysInCurrentMonth
  );

  // Создание массива с числами месяца, которые будут отображаться в календаре.
  //Напонение массива датами за прошлый месяц
  for (let i = daysInPrevMonth - monthStart + 1; i <= daysInPrevMonth; i++) {
    daysList.push({
      day: i,
      isCurrent: false,
      dayNumber: getDayNumber(currentDay.year, currentDay.month - 1, i)
    });
  }
  //Напонение массива датами за текущий месяц
  for (let i = 1; i <= daysInCurrentMonth; i++) {
    daysList.push({
      day: i,
      isCurrent: true,
      dayNumber: getDayNumber(currentDay.year, currentDay.month, i),
      dateTamplate: getDateTamplate(currentDay.year, currentDay.month, i)
    });
  }
  //Напонение массива датами за следующий месяц
  for (let i = 1; i <= 6 - monthFinish; i++) {
    daysList.push({
      day: i,
      isCurrent: false,
      dayNumber: getDayNumber(currentDay.year, currentDay.month + 1, i)
    });
  }

  return {
    daysList,
    year: currentDay.year,
    month: currentDay.month,
    day: currentDay.day
  };
};

export const getNewDate = (year, month, day, action) => {
  if (month === 0 && action === "prev") {
    return { year: year - 1, month: 11, day: day };
  } else if (month !== 0 && action === "prev") {
    return { year: year, month: month - 1, day: day };
  } else if (month === 11 && action === "next") {
    return { year: year + 1, month: 0, day: day };
  } else if (month !== 11 && action === "next") {
    return { year: year, month: month + 1, day: day };
  }
};

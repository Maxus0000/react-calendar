import React from "react";
import {
  add,
  format,
  startOfMonth,
  lastDayOfMonth,
  eachDayOfInterval,
  getDay,
  sub,
} from "date-fns";
import cx from "classnames";
import styles from "./Month.module.scss";


const titleWeekClasses =cx(styles["day-cell"],styles['red-week']);

const TitleWeek = () => {
  const titles = ["S", "M", "T", "W", "T", "F", "S"];
  return titles.map((t, i) => (
    <span className={titleWeekClasses} key={"week" + i}>
      {t}
    </span>
  ));
};
const emptyDaysStyle =cx(styles["day-cell"], styles["empty-day"]);
const curentDayStyle = cx(styles["day-cell"], styles["current-day"]);

const Month = (props) => {
  const { currentDate, setDate } = props;
  const changeMonth = (addToDate) => {
    const newMonth = addToDate
      ? add(currentDate, { months: 1 })
      : sub(currentDate, { months: 1 });
    setDate(newMonth);
  };
  const firstDate = startOfMonth(currentDate);
  const firstDayOfMonth = getDay(firstDate);
  const EmptyDates = () => {
    const array = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      array.push(
        <span className={emptyDaysStyle} key={"empty" + i}>
          0
        </span>
      );
    }
    return array;
  };

  const EachDayOfMonth = (day) => {
    return eachDayOfInterval({
      start: startOfMonth(day),
      end: lastDayOfMonth(day),
    }).map((date, i) => {
      if (format(date, "d") === format(day, "d")) {
        return (
          <span key={i} className={curentDayStyle}>
            {format(date, "d")}
          </span>
        );
      } else {
        return (
          <span className={styles["day-cell"]} key={i}>
            {format(date, "d")}
          </span>
        );
      }
    });
  };
  const arrayOfDate = [];
  arrayOfDate.push(...EmptyDates(), ...EachDayOfMonth(currentDate));
  let arrayWeeks = [];
  let arrayOneWeek = [];

  arrayOfDate.forEach((day, i) => {
    if (i % 7 !== 0) {
      arrayOneWeek.push(day);
    } else {
      arrayWeeks.push(arrayOneWeek);
      arrayOneWeek = [];
      arrayOneWeek.push(day);
    }
    if (i === arrayOfDate.length - 1) {
      arrayWeeks.push(arrayOneWeek);
    }
  });
  const ShowWeeks = arrayWeeks.map((elem, i) => (
    <div key={"div" + i}>{elem}</div>
  ));
  return (
    
      <article className={styles.article}>
        <div className={styles.wraper}>
          <button className={styles.btn} onClick={() => changeMonth(false)}>
          &#8617;
          </button>
          <p className={styles.date}>{format(currentDate, "MMMM yyyy")}</p>
          <button className={styles.btn} onClick={() => changeMonth(true)}>
          &#8618;
          </button>
        </div>
        <div>
          <TitleWeek />
        </div>
        <div>{ShowWeeks}</div>
      </article>
  );
};

export default Month;

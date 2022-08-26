import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import styles from './Day.module.scss'

const Day = (props) => {
  const { currentDate } = props;

  return (
    <article className={styles.article}>
      <p className={styles['day-of-week']}>{format(currentDate, "EEEE")}</p>
      <p className={styles['day-of-month']}>{format(currentDate, "d")}</p>
    </article>
  );
};


Day.defaultProps = {
  currentDate: new Date(),
};
Day.propTypes = {
  currentDate: PropTypes.object.isRequired,
};

export default Day;

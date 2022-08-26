import React, { Component } from 'react';
import Day from './Day';
import Month from './Month';
import styles from './Calendar.module.scss'

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
      
    }
  }
  setDate = (date) => {this.setState({currentDate: date})}
  render() {
    const {currentDate} = this.state;
    return (
      <>
      <section className={styles.section}>
        <Day currentDate={currentDate} setDate={this.setDate}/>
        < Month currentDate={currentDate} setDate={this.setDate}/>
        </section>
      </>
    );
  }
}

export default Calendar;

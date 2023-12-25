import React, {  useEffect } from 'react';
import classes from './userProfile.module.scss'
import moment from 'moment-timezone'

const Clock = ({ paused , time , setTime , country}) => {
  useEffect(() => {
    const interval = setInterval(() => {
        if (!paused) {
          setTime(moment(time).add(1, 'second').tz(country))
        }
      }, 1000);

    return () => clearInterval(interval);
  }, [paused,time]);

  return <div className={classes.clock}>{moment(time).format('HH:mm:ss')}</div>;
};

export default Clock;
import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

function CountdownTimer({ targetDate }) {
    const [countdown, setCountdown] = useState({
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  
    const calculateCountdown = () => {
      const now = new Date();
      const timeDifference = targetDate - now;
  
      const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));
      const days = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  
      setCountdown({ months, days, hours, minutes, seconds });
    };
  
    useEffect(() => {
      const intervalId = setInterval(calculateCountdown, 1000);
      return () => clearInterval(intervalId);
    }, []);
  
    return (
      <div className="countdown-timer">
        <h2>Event Starts In</h2>
        <p className="timerTitle">
          {countdown.months} Months {countdown.days} Days 
          {countdown.hours} Hours {countdown.minutes} Minutes {countdown.seconds} Seconds
        </p>
      </div>
    );
}
  
export default CountdownTimer;
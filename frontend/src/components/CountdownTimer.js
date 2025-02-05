import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

function CountdownTimer({ targetDate }) { // keeps track of the state of the countdown timer
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
  
      const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30)); // Divides timeDifference by the number of milliseconds in a month
      const days = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)); // Divides it by milliseconds in an day
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Divides it by milliseconds in an hour
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)); // Divides it by milliseconds in an min
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000); // Divides it by 1000 to get seconds.
  
      setCountdown({ months, days, hours, minutes, seconds });
    };
  
    useEffect(() => { // useEffect hook to update countdown every second
      const intervalId = setInterval(calculateCountdown, 1000);
      return () => clearInterval(intervalId); // Clear the interval when the component is unused/unmounted
    }, []);
  
    return (
      <div className="countdown-timer">
        <h2>Starts 1 April 2025 in</h2>
        {/* <h3>Time Until Race</h3> */}
        <p className="timerTitle">
          {countdown.months} Months {countdown.days} Days {countdown.hours} Hours {countdown.minutes} Minutes {countdown.seconds} Seconds
        </p>
      </div>
    );
}
  
export default CountdownTimer;
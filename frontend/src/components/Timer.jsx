import { useState, useEffect } from "react";

const Timer = () => {
  const calculateTimeLeft = () => {
    const expiryTimestampString = localStorage.getItem("expiryTimestamp");
    if (!expiryTimestampString) {
      localStorage.setItem("expiryTimestamp", Date.now() + 1000 * 60 * 60 * 24);
      return {
        days: 1,
        hours: 0,
        minutes: 0,
        seconds: 0,
        expired: false,
      };
    }

    const expiryTimestamp = parseInt(expiryTimestampString, 10);
    const difference = expiryTimestamp - Date.now();
    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        expired: true,
      };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
      expired: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const { days, hours, minutes, seconds, expired } = timeLeft;

  if (expired) {
    return <div>Timer has expired!</div>;
  }

  return (
    <div className="flex justify-center space-x-4 items-center">
      <div className="text-center">
        <div className="text-lg font-bold">Days</div>
        <div className="text-4xl items-center">{days}</div>
      </div>
      <div className="text-center">
        <div className="text-lg font-bold">Hours</div>
        <div className="text-4xl">{hours}</div>
      </div>
      <div className="text-center">
        <div className="text-lg font-bold">Minutes</div>
        <div className="text-4xl">
          {minutes}
        </div>
      </div>
      <div className="text-center">
        <div className="text-lg font-bold">Seconds</div>
        <div className="text-4xl">{seconds}</div>
      </div>
    </div>
  );
};

export default Timer;

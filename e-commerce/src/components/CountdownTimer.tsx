import { useState, useEffect } from "react";

type CountdownTimerProps = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const CountdownTimer = ({ days, hours, minutes, seconds }: CountdownTimerProps) => {
  const [time, setTime] = useState({ days, hours, minutes, seconds });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const padNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="flex items-center gap-6 my-4">
      <div className="flex flex-col items-center">
        <span className="text-3xl font-bold text-blue-600">{time.days}</span>
        <span className="text-sm text-gray-600">Days</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-3xl font-bold text-blue-600">{padNumber(time.hours)}</span>
        <span className="text-sm text-gray-600">Hrs</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-3xl font-bold text-blue-600">{padNumber(time.minutes)}</span>
        <span className="text-sm text-gray-600">Mins</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-3xl font-bold text-blue-600">{padNumber(time.seconds)}</span>
        <span className="text-sm text-gray-600">Secs</span>
      </div>
    </div>
  );
};

export default CountdownTimer;

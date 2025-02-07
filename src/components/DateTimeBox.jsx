import { useState, useEffect } from "react";
import "./DateTimeBox.css";

export default function DateTimeBox() {
  const [time, setTime] = useState("");
  const [dateInfo, setDateInfo] = useState({ date: "", day: "" });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString();
      setTime(formattedTime);
    };
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const updateDate = () => {
      const today = new Date();
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const formattedDate = today.toLocaleDateString(undefined, options);
      const dayName = today.toLocaleDateString(undefined, {
        weekday: "long",
      });
      setDateInfo({ date: formattedDate, day: dayName });
    };
    updateDate();

    // Calculate time until midnight
    const now = new Date();
    const timeUntilMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() -
      now.getTime();

    // Schedule the first update at midnight
    const timeoutId = setTimeout(() => {
      updateDate();

      // Set up daily updates after midnight
      const intervalId = setInterval(updateDate, 24 * 60 * 60 * 1000); // 24 hours
      return () => clearInterval(intervalId);
    }, timeUntilMidnight);
    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <div className="Outer">
      <h5 className="time">{time}</h5>
      <p className="Day_Date">
        {dateInfo.day}, {dateInfo.date}
      </p>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CountDown = ({ setLogTime }) => {
  const { id } = useParams();

  const [time, setTime] = useState(0);
  const [dateTime, setDateTime] = useState({
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
  });

  const [isRunning, setIsRunning] = useState(false);
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    const formData = {
      ...dateTime,
      taskId: id,
    };
    if (!isRunning && dateTime.startDate) {
      (async () => {
        const logResponse = await axios.post(
          `http://localhost:4444/log/${id}`,
          formData,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        console.log(logResponse);
      })();
    }

    (async () => {
      const logsList = await axios.get(`http://localhost:4444/log/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setLogTime(logsList.data);
    })();
  }, [isRunning]);

  const start = () => {
    setDateTime({
      ...dateTime,
      startDate: new Date().toLocaleDateString(),
      startTime: new Date().toLocaleTimeString(),
    });
    setIsRunning(true);
  };

  const stop = () => {
    setDateTime({
      ...dateTime,
      endDate: new Date().toLocaleDateString(),
      endTime: new Date().toLocaleTimeString(),
    });
    setIsRunning(false);
  };

  return (
    <div className="timer">
      <h1>
        {("0" + Math.floor((time / 3600000) % 24)).slice(-2)}:
        {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
        {("0" + Math.floor((time / 1000) % 60)).slice(-2)}:
        {("0" + ((time / 10) % 100)).slice(-2)}
      </h1>
      {isRunning ? (
        <button className="timer-btn" onClick={stop}>
          Stop
        </button>
      ) : (
        <button className="timer-btn" onClick={start}>
          Start
        </button>
      )}
    </div>
  );
};

export default CountDown;

import React, { useState } from "react";
import CountDown from "./CountDown";
const TimeLog = () => {
  const [logTime, setLogTime] = useState([]);
  console.log(logTime);

  const calculateTimeDifference = (startDate, startTime, endDate, endTime) => {
    // Combine the date and time strings into a single string
    const startDateTimeString = `${startDate} ${startTime}`;
    const endDateTimeString = `${endDate} ${endTime}`;

    // Convert the combined date and time strings into Date objects
    const startDateTime = new Date(startDateTimeString);
    const endDateTime = new Date(endDateTimeString);

    // Calculate the difference in milliseconds
    const timeDifference = endDateTime - startDateTime;

    // Convert the difference to hours, minutes, and seconds
    const hours = Math.floor(timeDifference / 3600000);
    const minutes = Math.floor((timeDifference % 3600000) / 60000);
    const seconds = Math.floor((timeDifference % 60000) / 1000);

    return { hours, minutes, seconds };
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3 style={{ marginBottom: "12px" }}>Time Log</h3>
      <CountDown setLogTime={setLogTime} />
      <div>
        <h4 style={{ marginTop: "20px", marginBottom: "12px" }}>Logs</h4>
        <p
          style={{
            backgroundColor: "white",
            padding: "8px",
            fontSize: "14px",
            fontWeight: "500",
            borderRadius: "6px",
            marginBottom: "8px",
          }}
        >
          Start Date & Time - End Date & Time
        </p>
        <table>
          <thead>
            <tr>
              <th>Start Date</th>
              <th>Start Time</th>
              <th>End Date</th>
              <th>End Time</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(logTime) &&
              logTime.map((time, index) => {
                const { hours, minutes, seconds } = calculateTimeDifference(
                  time.startDate,
                  time.startTime,
                  time.endDate,
                  time.endTime
                );
                return (
                  <tr key={index}>
                    <td>{time.startDate}</td>
                    <td>{time.startTime}</td>
                    <td>{time.endDate}</td>
                    <td>{time.endTime}</td>
                    <td>
                      {hours}h {minutes}m {seconds}s
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeLog;

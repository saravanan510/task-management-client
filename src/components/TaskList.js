import React, { useState, useEffect } from "react";
import axios from "axios";
import Task from "./Task";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment);

const TaskList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [task, setTask] = useState([]);
  const [isCalender, setIsCalender] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && user.role === "Assigner") {
          const response = await axios.get(
            "http://localhost:4444/assigner/task",
            {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          );
          setTask(response.data);
        } else if (user && user.role === "Assignee") {
          const response = await axios.get(
            "http://localhost:4444/assignee/task",
            {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          );

          setTask(response.data);
        }
      } catch (error) {
        console.error("Error fetching task data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="body-container">
      {user && user.role == "Assigner" ? (
        <div className="body-container-header">
          <h3>Tasks</h3>
          <button
            onClick={() => {
              setIsCalender(!isCalender);
            }}
          >
            {isCalender ? "List" : "Calender"}
          </button>
          <button
            onClick={() => {
              navigate("/home/createTask");
            }}
          >
            Add Task
          </button>
        </div>
      ) : (
        <div className="body-container-header">
          <h3>My Tasks</h3>
          <button
            onClick={() => {
              setIsCalender(!isCalender);
            }}
          >
            {isCalender ? "List" : "Calender"}
          </button>
        </div>
      )}

      {isCalender ? (
        <Calendar
          localizer={localizer}
          events={task.map((ele) => {
            return {
              title: ele.title,
              start: new Date(ele.createdAt),
              end: new Date(
                moment.utc(ele.dueDate).local().format("YYYY-MMM-DD")
              ),
            };
          })}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, marginTop: "24px" }}
        />
      ) : (
        <Task task={task} />
      )}
    </div>
  );
};

export default TaskList;

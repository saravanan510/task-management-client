import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../context/AuthContext";
import Comments from "./Comments";
import TimeLog from "./TimeLog";
import FilesUploader from "./FilesUploader";
const TaskDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [task, setTask] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const taskDetails = await axios.get(
          `http://localhost:4444/task-details/${id}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setTask(taskDetails.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div className="body-container">
      <div className="taskDetails-container">
        <div>
          <h3>Task Details</h3>
          {task && (
            <div>
              <div style={{ marginTop: "12px" }}>
                <h4 style={{ color: "#4f4444", marginBottom: "4px" }}>Title</h4>
                <p>{task.title}</p>
              </div>
              <div style={{ marginTop: "12px" }}>
                <h4 style={{ color: "#4f4444", marginBottom: "4px" }}>
                  Description
                </h4>
                <p>{task.description}</p>
              </div>
              <div style={{ marginTop: "12px" }}>
                <h4 style={{ color: "#4f4444", marginBottom: "4px" }}>
                  Status
                </h4>
                <p>{task.status}</p>
              </div>
              <div style={{ marginTop: "12px" }}>
                <h4 style={{ color: "#4f4444", marginBottom: "4px" }}>
                  Priority
                </h4>
                <p>{task.priority}</p>
              </div>
              <div style={{ marginTop: "12px" }}>
                <h4 style={{ color: "#4f4444", marginBottom: "4px" }}>
                  Due Date
                </h4>
                <p>{moment.utc(task.dueDate).local().format("YYYY-MMM-DD")}</p>
              </div>
              {user && user.role == "Assigner" ? (
                <div style={{ marginTop: "12px" }}>
                  <h4 style={{ color: "#4f4444", marginBottom: "4px" }}>
                    Assigned To
                  </h4>
                  <div style={{ display: "flex", gap: 4 }}>
                    {task.assignedTo.map((ele, index) => {
                      return (
                        <React.Fragment key={ele.value}>
                          <p>{ele.label}</p>
                          {index !== task.assignedTo.length - 1 && (
                            <span>,</span>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div style={{ marginTop: "12px" }}>
                  <h4 style={{ color: "#4f4444", marginBottom: "4px" }}>
                    Assigned By
                  </h4>
                  <p>
                    {moment.utc(task.dueDate).local().format("YYYY-MMM-DD")}
                  </p>
                </div>
              )}
            </div>
          )}
          <Comments id={id} />
        </div>
        <div>
          <FilesUploader id={id} />
          {user?.role == "Assignee" && <TimeLog />}
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;

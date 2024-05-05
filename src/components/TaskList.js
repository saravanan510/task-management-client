import React from "react";
import Task from "./Task";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="body-container">
      {user && user.role == "Assigner" ? (
        <div className="body-container-header">
          <h3>Tasks</h3>
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
        </div>
      )}

      <Task />
    </div>
  );
};

export default TaskList;

import React from "react";
import Task from "./Task";
import { useAuth } from "../context/AuthContext";

const TaskList = () => {
  const { user } = useAuth();
  return (
    <div className="body-container">
      {user && user.role == "Assigner" ? (
        <div className="body-container-header">
          <h3>Tasks</h3>
          <button>Add Task</button>
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

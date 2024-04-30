import React from "react";
const tasks = [
  {
    title: "UI-Design",
    description: "lorem ipsum is simple dummy text",
    priority: "Medium",
    status: "Completed",
    dueDate: "12-05-24",
    assignedBy: "Assigner-1",
  },
  {
    title: "UI-Design",
    description: "lorem ipsum is simple dummy text",
    priority: "Medium",
    status: "Completed",
    dueDate: "12-05-24",
    assignedBy: "Assigner-1",
  },
];
const Task = () => {
  return (
    <div>
      {tasks.map((task, i) => {
        return (
          <div key={i} className="task-card">
            <div>
              <p className="card-title">Title</p>
              <p className="card-content">{task.title}</p>
            </div>
            <div>
              <p className="card-title">Description</p>
              <p className="card-content">{task.description}</p>
            </div>
            <div>
              <p className="card-title">Priority</p>
              <p className="card-content">{task.priority}</p>
            </div>
            <div>
              <p className="card-title">Status</p>
              <p className="card-content">{task.status}</p>
            </div>
            <div>
              <p className="card-title">Due Date</p>
              <p className="card-content">{task.dueDate}</p>
            </div>
            <div>
              <p className="card-title">Assigned by</p>
              <p className="card-content">{task.assignedBy}</p>
            </div>
            <div>
              <p className="card-title">Actions</p>
              <p className="card-content">-</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Task;

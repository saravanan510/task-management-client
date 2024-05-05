import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Layout from "./components/Layout";
import TaskList from "./components/TaskList";
import Account from "./components/Account";
import CreateTask from "./components/CreateTask";
import PrivateRoutes from "./components/PrivateRoutes";
import TaskDetails from "./components/TaskDetails";

const Routers = () => {
  return (
    <Routes>
      <Route index element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="home" element={<Layout />}>
        <Route index element={<TaskList />} />
        <Route path="createTask" element={<CreateTask />} />
        <Route path="account" element={<Account />} />
        <Route path="taskdetails/:id" element={<TaskDetails />} />
      </Route>
    </Routes>
  );
};

export default Routers;

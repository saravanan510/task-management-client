import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Layout from "./components/Layout";
import TaskList from "./components/TaskList";
import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "./context/AuthContext";
import Account from "./components/Account";
import PrivateRoutes from "./components/PrivateRoutes";

function App() {
  const { handleLogin, handleProfile } = useAuth();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      (async () => {
        const userResponse = await axios.get(
          "http://localhost:4444/user/account",
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        handleLogin(userResponse.data);

        let url;
        if (userResponse.data.role == "Assignee") {
          url = "http://localhost:4444/user/assignee/profile";
        } else if (userResponse.data.role == "Assigner") {
          url = "http://localhost:4444/user/assigner/profile";
        }
        const profileResponse = await axios.get(url, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        handleProfile(profileResponse.data);
      })();
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Layout />}>
        <Route path="/home/task" element={<TaskList />} />
        <Route path="account" element={<Account />} />
      </Route>
    </Routes>
  );
}

export default App;

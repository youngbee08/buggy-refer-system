// src/App.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Maindashboard from "./components/Layout/Maindashboard";
import History from "./pages/History";
import Withdraw from "./pages/Withdraw";
import Refer from "./pages/Refer";
import Profile from "./pages/Profile";
import SetupPin from "./pages/subpage/SetPin";

// import Signup from "./pages/Signup";
// import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      {/* <Route path="/register" element={<Signup />} /> */}
      <Route path="/login" element={<Login />} />
      {/* <Route path="/login" element={<Login />} /> */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/setup-pin" element={<SetupPin />} />
      <Route
        path={"/dashboard"}
        element={<Maindashboard children={<Dashboard />} />}
      />
      <Route
        path={"/history"}
        element={<Maindashboard children={<History />} />}
      />
      <Route
        path={"/withdraw"}
        element={<Maindashboard children={<Withdraw />} />}
      />
      <Route path={"/refer"} element={<Maindashboard children={<Refer />} />} />
      <Route
        path={"/profile"}
        element={<Maindashboard children={<Profile />} />}
      />
    </Routes>
  );
}

export default App;

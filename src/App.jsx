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
import { Toaster } from "sonner";
import AuthProvider from "./provider/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import RedirectRoute from "./components/redirectRoute";

// import Signup from "./pages/Signup";
// import Login from "./pages/Login";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route element={<RedirectRoute/>}>
            <Route path="/" element={<Signup />} />
            {/* <Route path="/register" element={<Signup />} /> */}
            <Route path="/login" element={<Login />} />
            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/setup-pin" element={<SetupPin />} />
          </Route>
          <Route element={<ProtectedRoute/>}>
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
          </Route>
        </Routes>
        <Toaster richColors/>
      </AuthProvider>
    </>
  ); 
}

export default App;

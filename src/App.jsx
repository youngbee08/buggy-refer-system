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
import Offers from "./pages/Offers";
import Users from "./pages/Users";
import Withdrawals from "./pages/Withdrawals";
import Notfound from "./components/Notfound";

// import Signup from "./pages/Signup";
// import Login from "./pages/Login";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route element={<RedirectRoute/>}>
            <Route path="/" element={<Signup />} />

            <Route path="/login" element={<Login />} />

            <Route path="/signup" element={<Signup />} />

          </Route>

          <Route element={<ProtectedRoute/>}>
            <Route 
            path="/setup-pin" 
            element={<SetupPin />} 
            />
            
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

            <Route 
            path={"/refer"} 
            element={<Maindashboard children={<Refer />} />} 
            />

            <Route 
            path="offers" 
            element={<Maindashboard children={<Offers/>}/>}
            />

            <Route 
            path="withdrawals" 
            element={<Maindashboard children={<Withdrawals/>}/>}
            />

            <Route 
            path="users" 
            element={<Maindashboard children={<Users/>}/>}
            />
            
            <Route
              path={"/profile"}
              element={<Maindashboard children={<Profile />} />}
            />
          </Route>
          <Route path="*" element={<Notfound isLost={true}/>}/>
        </Routes>
        <Toaster richColors closeButton/>
      </AuthProvider>
    </>
  ); 
}

export default App;

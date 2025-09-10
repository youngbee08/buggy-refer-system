import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import UserDashboard from '../components/UserDashboard';
import AdminDashboard from '../components/AdminDashboard';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const {checkAccountType} = useContext(AuthContext);
  const accountType = checkAccountType();
  const navigate = useNavigate();

  return (
    <>
      {
        accountType === "user" ? (
          <UserDashboard/>
        ) : accountType === "admin" ? (
          <AdminDashboard/>
        ) : navigate("/login")
      }
    </>
  )
}

export default Dashboard
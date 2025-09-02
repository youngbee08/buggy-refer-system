import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const ProtectedRoute = () => {
  const hasToken = localStorage.getItem("authToken");
  const userData = localStorage.getItem("userData");
  const {checkIsAuthenticated} = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!checkIsAuthenticated()) {
      navigate("/login")
      toast.warning("Oops! You have to be authenticated to continue");
    }
  }, [checkIsAuthenticated(),navigate,userData,hasToken])
  
  return (
    checkIsAuthenticated() && <Outlet/>
  )
}

export default ProtectedRoute
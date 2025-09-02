import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Outlet, useNavigate } from 'react-router-dom';

const RedirectRoute = () => {
  const {checkIsAuthenticated} = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (checkIsAuthenticated()) {
      navigate("/dashboard")
    }
  }, [checkIsAuthenticated(),navigate])
  
  return (
    !checkIsAuthenticated() && <Outlet/>
  )
}

export default RedirectRoute
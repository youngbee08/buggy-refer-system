import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Outlet, useNavigate } from 'react-router-dom';

const RedirectRoute = () => {
  const {checkIsAuthenticated,getUserDetails} = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (checkIsAuthenticated()) {
      const currentUser = getUserDetails();
      if (currentUser.role === "user") {
        if (currentUser.transaction_pin === null) {
          navigate("/setup-pin")
        }else{
          navigate("/dashboard");
        }
      }else{
        navigate("/dashboard");
      }
    }
  }, [checkIsAuthenticated(),navigate])
  
  return (
    !checkIsAuthenticated() && <Outlet/>
  )
}

export default RedirectRoute
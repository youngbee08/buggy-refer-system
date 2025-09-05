import { toast } from "sonner";
import { AuthContext } from "../context/AuthContext"
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthProvider = ({children}) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate()
  const [user,setUser] = useState()
  const location = useLocation()
  const checkIsAuthenticated = ()=>{
    const hasToken = localStorage.getItem("authToken")
    if (!hasToken) {
      return (false)
    }else{
      return(true)
    }
  }

  const logout = async ()=>{
    const token = localStorage.getItem("authToken");
    try {
      const res = await fetch(`${apiUrl}/api/logout`, {
        method:"POST",
        headers:{
          "Authorization":`Bearer ${token}`,
        }
      });
      const data = await res.json();
      
      if (res.status === 200) {
        console.log(data)
        toast.success(data.message)
        localStorage.removeItem("authToken")
        localStorage.removeItem("userData")
        navigate("/login")
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error)
    }
  };

  const getUserDetails = ()=>{
    if (user) {
      return user
    }else{
      return JSON.parse(localStorage.getItem("userData"))
    }
  }

  const getRequestWithToken = async (reqEndpoint)=>{
    const token = localStorage.getItem("authToken");
    try {
      const res = await fetch(`${apiUrl}/api${reqEndpoint}`, {
        method:"GET",
        headers:{
          "Authorization":`Bearer ${token}`
        }
      })
      const data = await res.json();
      return data
    } catch (err) {
      console.log(err)
      if (err.message !== `Unexpected token '<', "<!DOCTYPE "... is not valid JSON`) {
        toast.error(err.message)
      }
      if (err.message === `Failed to fetch`) {
        toast.error('An unexpected error occured, please try again')
      }
      if (err.message === `Unexpected token '<', "<!DOCTYPE "... is not valid JSON`) {
        if (location.pathname !== "/") {
          toast.error("Oops! Your session has expired, Please log in again");
          localStorage.removeItem("authToken")
          localStorage.removeItem("userData")
          navigate("/login")
        }
      }
    }
  };

  const authRequestWithToken = async (reqEndpoint,reqBody,reqType)=>{
    const token = localStorage.getItem("authToken");
    try {
      const res = await fetch(`${apiUrl}/api${reqEndpoint}`, {
        method:reqType,
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify(reqBody)
      })
      const data = await res.json();
      return data
    } catch (err) {
      console.log(err)
      console.log(err.message)
      if (err.message !== `Unexpected token '<', "<!DOCTYPE "... is not valid JSON`) {
        toast.error(err.message)
      }
      if (err.message === `Failed to fetch`) {
        toast.error('An unexpected error occured, please try again')
      }
      if (err.message === `Unexpected token '<', "<!DOCTYPE "... is not valid JSON`) {
        toast.error("Oops! Your session has expired, Please log in again");
        localStorage.removeItem("authToken")
        localStorage.removeItem("userData")
        navigate("/login")
      }
    }
  };

  const fetchUserDetails = async ()=>{
    const res = await getRequestWithToken("/user/profile");
    setUser(res.user);
    localStorage.setItem("userData", JSON.stringify(res.user))
  };

  useEffect(() => {
   fetchUserDetails()
  }, [])
  

  const value = {
    checkIsAuthenticated,
    logout,
    setUser,
    getUserDetails,
    getRequestWithToken,
    authRequestWithToken
  }
  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
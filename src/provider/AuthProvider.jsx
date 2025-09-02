import { toast } from "sonner";
import { AuthContext } from "../context/AuthContext"
import { useState } from "react";

const AuthProvider = ({children}) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [user,setUser] = useState()
  const checkIsAuthenticated = ()=>{
    const hasToken = localStorage.getItem("authToken")
    if (!hasToken) {
      return (false)
    }else{
      return(true)
    }
  }

  const logout = async (action)=>{
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
        action("/login")
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

  const getRequestWithToken = async (errAction)=>{
    const token = localStorage.getItem("authToken");
    try {
      const res = await fetch(`${apiUrl}/api/offers/ongoing`, {
        method:"GET",
        headers:{
          "Authorization":`Bearer ${token}`
        }
      })
      const data = await res.json();
      return data
    } catch (err) {
      console.log(err)
      toast.error(err.message)
      if (err.message === `Unexpected token '<', "<!DOCTYPE "... is not valid JSON`) {
        toast.error("Oops! Your session is timed out, Please log in again");
        localStorage.removeItem("authToken")
        localStorage.removeItem("userData")
        errAction("/login")
      }
    }
  };

  const value = {
    checkIsAuthenticated,
    logout,
    setUser,
    getUserDetails,
    getRequestWithToken
  }
  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
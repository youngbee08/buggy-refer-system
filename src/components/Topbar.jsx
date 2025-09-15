import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import assets from "../assets/assests";
import { AuthContext } from "../context/AuthContext";
import { AlertTriangle, Loader2, LogOut, User } from "lucide-react";

const TopBar = () => {
  const { getUserDetails,logout,checkAccountType } = useContext(AuthContext);
  const user = getUserDetails ? getUserDetails() : {};
  const [logoutModal, setLogoutModal] = useState({ show: false, message: '' });
  const [canLogout,setCanLogout] = useState(false);
  const [loggingOut,setLoggingOut] = useState(false)
  const location = useLocation();
  const accountType = checkAccountType();

  const pageTitles = {
    "/dashboard": accountType === "user" ? "Dashboard" : accountType === "admin" ? "Admin Dashboard" : "Dashboard",
    "/history": "History",
    "/withdraw": "Withdraw",
    "/refer": "Refer & Earn",
    "/profile": "Profile",
    "/users":"Users",
    "/withdrawals":"Withdrawals",
    "/offers":"Offers"
  };

  const pageTitle = pageTitles[location.pathname] || "Dashboard";

  const formatDate = () => {
    const today = new Date();
    const options = { weekday: "long", day: "2-digit", month: "long", year: "numeric" };
    return today.toLocaleDateString("en-GB", options);
  };

  const requestLogout = ()=>{
    setLogoutModal({show:true,message:"Are you sure you want to logout?"});
  }

  const handleLogout = ()=>{
    setLoggingOut(true)
    try {
     setCanLogout(true)
    } catch (error) {
      console.log(error)
    } finally{
      setTimeout(() => {
        setLoggingOut(false)
      }, 2000);
    }
  }

  useEffect(() => {
    if (canLogout) {
      logout()
    }
  }, [canLogout])
  

  return (
    <div>
      <div className="lg:hidden block bg-pryClr p-4">
        <img src={assets.logo} alt="Logo" className="w-40" />
      </div>

      <div className="flex items-center justify-between px-4 md:px-6 py-3 bg-white shadow">
        <div>
          <h1 className="font-semibold text-2xl lg:text-3xl text-secClrBlack">
            {pageTitle}
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-secClrBlack/60">
            {formatDate()}
          </p>
        </div>

        <div className="flex items-center justify-between gap-2">
          <img
            src={accountType === "user" ? assets.profile : accountType === "admin" ? assets.adminAvatar : <User/>}
            alt={user?.full_name || "Avatar"}
            className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full object-cover"
          />
          <LogOut onClick={requestLogout} className="lg:hidden"/>
        </div>
      </div>
      {logoutModal.show && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-pryClr/90 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl border border-accClrYellow/30 transition-all duration-300 transform scale-95 hover:scale-100">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle size={24} className="text-accClrYellow" />
              <h3 className="text-xl lg:text-2xl font-semibold text-secClrWhite">Warning</h3>
            </div>
            <p className="text-base text-secClrWhite mb-6 leading-relaxed">{logoutModal.message}</p>
            <div className="flex justify-between gap-3">
              <button
                className="w-full bg-accClrPink text-secClrWhite px-4 py-2 rounded-lg font-semibold text-base lg:text-lg hover:bg-accClrPink/90 transition-all duration-300 transform hover:scale-105"
                onClick={() => setLogoutModal({show:false})}
              >
                No
              </button>
              <button
                className="w-full bg-accClrPink text-secClrWhite px-4 py-2 rounded-lg font-semibold text-base lg:text-lg hover:bg-accClrPink/90 transition-all duration-300 transform hover:scale-105"
                onClick={handleLogout}
              >
                {loggingOut ? <Loader2 className="animate-spin mx-auto"/> : "Yes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopBar;

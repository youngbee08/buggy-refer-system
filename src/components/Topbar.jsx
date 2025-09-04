import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import assets from "../assets/assests";
import { AuthContext } from "../context/AuthContext";

const TopBar = () => {
  const { getUserDetails } = useContext(AuthContext);
  const user = getUserDetails();
  const location = useLocation();

  // Map routes to titles (matches your Sidebar)
  const pageTitles = {
    "/dashboard": "Dashboard",
    "/history": "History",
    "/withdraw": "Withdraw",
    "/refer": "Refer & Earn",
    "/profile": "Profile",
  };

  // Get current page title
  const pageTitle = pageTitles[location.pathname] || "Dashboard";

  // Format today's date
  const formatDate = () => {
    const today = new Date();
    const options = { weekday: "long", day: "2-digit", month: "long", year: "numeric" };
    return today.toLocaleDateString("en-GB", options);
  };

  return (
    <div>
      <div className="lg:hidden block bg-pryClr p-4 ">
        <img src={assets.logo} alt="Logo" className="w-40" />
      </div>

      <div className="flex items-center justify-between px-4 md:px-6 py-3 bg-white shadow">
        {/* Left side - Title & Date */}
        <div>
          <h1 className="font-650 text-2xl md:text-2xl lg:text-3xl text-secClrBlack">
            {pageTitle}
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-secClrBlack/54">
            {formatDate()}
          </p>
        </div>

        {/* Right side - Avatar */}
        <div>
          <img
            src={assets.profile} // replace with actual user image if available
            alt={user.full_name || "User Avatar"}
            className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;

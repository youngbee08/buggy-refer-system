import React, { useContext, } from "react";
import assets from "../assets/assests";
import { AuthContext } from "../context/AuthContext";

const TopBar = () => {
  const {getUserDetails} = useContext(AuthContext);
  const user = getUserDetails();
  console.log(user)
  const customizeName = (name)=>{
    if (name.split(' ')[0] && name.split(' ')[1]) {
      const firstName = name.split(" ")[0];
      const lastNameInitials = name.split(" ")[1][0];
      return `${firstName}, ${lastNameInitials}.`;
    }else{
      return name
    }
  }

  const customName = customizeName(user.full_name)
  
  return (
    <div>
      <div className="lg:hidden block bg-pryClr p-4 ">
        <img src={assets.logo} alt="" className="w-40" />
      </div>

      <div className="flex items-center justify-between px-4 md:px-6 py-3 bg-white shadow">
        {/* Left side - Text */}
        <div>
          <h1 className="font-normal text-xl md:text-2xl lg:text-3xl">
            Welcome home,{" "}
            <span className="font-bold text-xl md:text-2xl lg:text-3xl">
              {customName}
            </span>
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-accClrYellow">
            Here is the overview of your dashboard
          </p>
        </div>

        {/* Right side - Avatar */}
        <div>
          <img
            src={assets.profile} // replace with actual user image
            alt="User Avatar"
            className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;

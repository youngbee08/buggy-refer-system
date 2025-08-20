import React from "react";
import assets from "../assets/assests";

const TopBar = () => {
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
              Ayangalu, M.
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

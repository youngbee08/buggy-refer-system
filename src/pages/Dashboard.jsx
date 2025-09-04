import React, { useState } from "react";
import { ArrowDown, Eye, EyeOff } from "lucide-react";
import Ongoing from "./subpage/Ongoing";
import { Link } from "react-router-dom";
import History from "./History";
import assets from "../assets/assests";

const Dashboard = () => {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <div className="flex flex-col gap-8 lg:mt-10 mt-0">
      {/* Top Welcome Section */}
      <div className="relative bg-pryClr/35 rounded-2xl p-10 flex items-center shadow-md overflow-visible ">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
            Hi, Prime
          </h1>
          <p className="text-gray-600 mt-1 text-sm md:text-base lg:text-lg">
            Ready to start your day with some activities?
          </p>
        </div>

        {/* Illustration Image */}
        <img
          src={assets.ill}
          alt="Illustration"
          className="absolute right-2 md:right-6 lg:-bottom-14 md:-bottom-11.5
               w-40 h-40 md:w-65 md:h-65 lg:w-80 lg:h-80 
               object-contain -sm:left-5"
        />
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Wallet Balance */}
        <div className="bg-pryClr rounded-xl p-6 flex flex-col items-center justify-center shadow">
          <p className="text-sm text-secClrWhite capitalize lg:text-xl">
            Wallet Balance
          </p>
          <h2 className="text-3xl font-bold mt-2 text-accClrYellow">
            {showBalance ? "₦5,000" : "****"}
          </h2>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="mt-3 text-white"
          >
            {showBalance ? (
              <EyeOff className="w-6 h-6 cursor-pointer" />
            ) : (
              <Eye className="w-6 h-6 cursor-pointer" />
            )}
          </button>
        </div>

        {/* Links Clicked */}
        <div className="bg-pryClr rounded-xl p-6 flex flex-col items-center justify-center shadow">
          <p className="text-sm text-secClrWhite capitalize lg:text-xl">
            Links Clicked
          </p>
          <h2 className="text-3xl font-bold mt-2 text-secClrWhite">70</h2>
        </div>

        {/* Completed */}
        <div className="bg-pryClr rounded-xl p-6 flex flex-col items-center justify-center shadow">
          <p className="text-sm text-secClrWhite capitalize lg:text-xl">
            Completed
          </p>
          <h2 className="text-3xl font-bold mt-2 text-secClrWhite">10</h2>
        </div>
      </div>

      {/* Ongoing Offers Section */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h2 className="text-xl font-medium">Ongoing Offer</h2>
          <Link
            to={"/refer"}
            className="text-base font-semibold flex items-center gap-1 hover:underline"
          >
            <ArrowDown size={20} className="rotate-[-135deg]" />
            See all
          </Link>
        </div>
        <Ongoing />
      </div>

      {/* History Section */}
      <div className="flex flex-col gap-4">
        <History isRecent={true} />
      </div>
    </div>
  );
};

export default Dashboard;

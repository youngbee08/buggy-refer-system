import React, { useState } from "react";
import { ArrowDown, Eye, EyeOff } from "lucide-react";
import Ongoing from "./subpage/Ongoing";
import { Link } from "react-router-dom";
import History from "./History";


const Dashboard = () => {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-4 gap-4">
        {/* Wallet Balance */}
        <div className="bg-pryClr rounded-xl p-4 flex justify-between items-center col-span-4 lg:col-span-2">
          <div>
            <p className="lg:text-xl text-sm capitalize text-white">Wallet balance</p>
            <h2 className="text-3xl font-bold text-accClrYellow mt-2">
              {showBalance ? "₦5,000" : "****"}
            </h2>
          </div>
          <button onClick={() => setShowBalance(!showBalance)}>
            {showBalance ? (
              <EyeOff className="w-6 h-6 cursor-pointer text-white" />
            ) : (
              <Eye className="w-6 h-6 cursor-pointer text-white" />
            )}
          </button>
        </div>

        {/* Links Clicked */}
        <div className="bg-pryClr rounded-xl p-4 flex flex-col items-center justify-center col-span-2 lg:col-span-1">
          <p className="text-sm text-secClrWhite capitalize lg:text-xl">Links Clicked</p>
          <h2 className="text-3xl font-bold mt-2 text-secClrWhite">70</h2>
        </div>

        {/* Completed */}
        <div className="bg-pryClr rounded-xl p-4 flex flex-col items-center justify-center col-span-2 lg:col-span-1">
          <p className="text-sm text-secClrWhite capitalize lg:text-xl">Completed</p>
          <h2 className="text-3xl font-bold mt-2 text-secClrWhite">10</h2>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h2 className="text-xl font-medium">Ongoing Offer</h2>
          <Link to={"/refer"} className="text-base font-semibold flex items-center gaLink-1 hover:underline"><ArrowDown size={20} className="rotate-[-135deg]"/>See all</Link>
        </div>
        <Ongoing/>
      </div>
      <div className="flex flex-col gap-4">
        <History isRecent={true}/>
      </div>
    </div>
  );
};

export default Dashboard;

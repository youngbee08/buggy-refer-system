import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Dashboard = () => {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        {/* Wallet Balance */}
        <div className="bg-pryClr rounded-xl p-4 flex justify-between items-center col-span-4 lg:col-span-2">
          <div>
            <p className="lg:text-xl text-sm capitalize text-secClrBlack">Wallet balance</p>
            <h2 className="text-3xl font-bold text-accClrYellow mt-2">
              {showBalance ? "₦5,000" : "****"}
            </h2>
          </div>
          <button onClick={() => setShowBalance(!showBalance)}>
            {showBalance ? (
              <EyeOff className="w-6 h-6 cursor-pointer text-secClrBlack" />
            ) : (
              <Eye className="w-6 h-6 cursor-pointer text-secClrBlack" />
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
    </div>
  );
};

export default Dashboard;

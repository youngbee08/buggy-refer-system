import { ArrowDown } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const History = ({isRecent = false}) => {
  const transactions = [
    { type: "Withdraw", amount: "₦5000", status: "Successful", iconRotation: "-140deg", iconColor: "text-red-500" },
    { type: "Earn", amount: "₦2000", status: "Successful", iconRotation: "140deg", iconColor: "text-accClrYellow" },
    { type: "Withdraw", amount: "₦3000", status: "Pending", iconRotation: "-140deg", iconColor: "text-red-500" },
    { type: "Withdraw", amount: "₦5000", status: "Successful", iconRotation: "-140deg", iconColor: "text-red-500" },
    { type: "Earn", amount: "₦12000", status: "Successful", iconRotation: "140deg", iconColor: "text-accClrYellow" },
    { type: "Earn", amount: "₦12000", status: "Failed", iconRotation: "140deg", iconColor: "text-accClrYellow" },
  ];

  return (
    <div className="flex flex-col gap-6 py-4 lg:p-6 max-w-full overflow-x-hidden">
      <h2 className="text-xl lg:text-2xl font-bold text-pryClr tracking-wide">{isRecent ? "Recent transactions" : "All Transaction History"}</h2>
      <div className="w-full  mx-auto">
        {transactions.map((transaction, index) => (
          <div
            key={index}
            className={`rounded-xl p-4 lg:p-5 flex items-center justify-between mb-4 border border-white/10 shadow-md transition-all duration-300 hover:scale-[1.01] hover:shadow-lg ${
              transaction.status === "Pending"
                ? "bg-accClrYellow/20 lg:bg-pryClr/20"
                : transaction.status === "Failed"
                ? "bg-red-500/20 lg:bg-pryClr/20"
                : "bg-green-600/20 lg:bg-pryClr/20"
            } backdrop-blur-lg`}
          >
            <div className="flex items-center gap-2 lg:gap-4">
              <div className={`bg-pryClr/40 rounded-full p-2 lg:p-2.5 rotate-[${transaction.iconRotation}] ${transaction.iconColor}`}>
                <ArrowDown size={16} className="lg:w-5 lg:h-5" />
              </div>
              <h3 className="text-base lg:text-lg font-bold text-secClrBlack">{transaction.type}</h3>
            </div>
            <div className="flex items-center gap-2 lg:gap-8">
              <h3 className="text-base lg:text-lg font-semibold text-secClrBlack">{transaction.amount}</h3>
              <p
                className={`${
                  transaction.status === "Pending" ? "bg-accClrYellow" : transaction.status === "Failed" ? "bg-red-500" : "bg-green-600"
                } text-white rounded-md w-16 lg:w-20 text-center text-xs lg:text-sm py-1 font-medium`}
              >
                {transaction.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
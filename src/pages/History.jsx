import { ArrowDown, MoreHorizontal } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const History = ({isRecent = false}) => {
  const transactions = [
    { type: "Withdraw", amount: "₦5000", status: "Successful", iconColor: "text-red-500" },
    { type: "Earn", amount: "₦2000", status: "Successful", iconColor: "text-accClrYellow" },
    { type: "Withdraw", amount: "₦3000", status: "Pending", iconColor: "text-red-500" },
    { type: "Withdraw", amount: "₦5000", status: "Successful", iconColor: "text-red-500" },
    { type: "Earn", amount: "₦12000", status: "Successful", iconColor: "text-accClrYellow" },
    { type: "Earn", amount: "₦12000", status: "Failed", iconColor: "text-accClrYellow" },
  ];

  return (
    <div className="flex flex-col gap-6 py-4 lg:p-6 max-w-full overflow-x-hidden">
     <div className="flex justify-between items-center">
       <h2 className="text-xl lg:text-2xl font-bold text-black tracking-wide">{isRecent ? "Recent transactions" : "All Transaction History"}</h2>
       {isRecent && <Link to={"/history"} className="bg-pryClr font-medium text-base text-white py-2 px-5 rounded-[7px]">View All</Link>}
     </div>
     <table className="w-full text-left border-collapse">
        <thead className="text-gray-700 text-sm">
          <tr>
            <th className="py-3 px-6">Type</th>
            <th className="py-3 px-6">Amount</th>
            <th className="py-3 px-6">Description</th>
            <th className="py-3 px-6">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-sm">
          {transactions.map((transaction, index) => (
            <tr key={index} className="hover:bg-gray-50 transition bg-white rounded-2xl shadow-2xl">
              <td className="py-4 px-6 flex items-center gap-2">
                <div className="rounded-full bg-pryClr/40 p-3">
                  <ArrowDown
                  className={`transform rounded-full rotate-${transaction.type === 'Withdraw' ? '[-140deg]' : '[140deg]'} ${transaction.iconColor}`}
                  size={18}
                />
                </div>
                <span className="font-medium text-gray-800">{transaction.type}</span>
              </td>
              <td className="py-4 px-6 font-semibold">{transaction.amount}</td>
              <td className="py-4 px-6 text-gray-600">{transaction.description ? transaction.description : "-------- --------"}</td>
              <td className="py-4 px-6">
                <span
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${
                    transaction.status === 'Successful'
                      ? 'bg-green-100 text-green-700'
                      : transaction.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  <span className="h-2 w-2 rounded-full bg-current"></span>
                  {transaction.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
import { ArrowDown } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const History = ({ isRecent = false }) => {
  const transactions = [
    { type: "Withdraw", amount: "₦5000", status: "Successful", iconColor: "text-red-500", description:"Withdraw daily earning to buy some amenities" },
    { type: "Earn", amount: "₦2000", status: "Successful", iconColor: "text-accClrYellow"},
    { type: "Withdraw", amount: "₦3000", status: "Pending", iconColor: "text-red-500"},
    { type: "Withdraw", amount: "₦5000", status: "Successful", iconColor: "text-red-500", description:"Withdraw daily earning to buy some amenities" },
    { type: "Earn", amount: "₦12000", status: "Successful", iconColor: "text-accClrYellow" },
    { type: "Earn", amount: "₦12000", status: "Failed", iconColor: "text-accClrYellow", description:"Withdraw daily earning to buy some amenities" },
  ];

  const visibleTransactions = isRecent ? transactions.slice(0, 5) : transactions;

  return (
    <div className="flex flex-col gap-6 lg:p-6 max-w-full overflow-x-hidden pb-[4rem]">
      <div className="flex justify-between items-center">
        <h2 className="text-base lg:text-2xl font-bold text-black tracking-wide">
          {isRecent ? "Recent transactions" : "All Transaction History"}
        </h2>
        {isRecent && (
          <Link
            to={"/history"}
            className="bg-pryClr font-medium text-sm lg:text-base text-white py-2 px-5 rounded-[7px]"
          >
            View All
          </Link>
        )}
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="text-gray-700 text-sm tex-center">
            <tr>
              <th className="py-3 px-6">Type</th>
              <th className="py-3 px-6">Amount</th>
              <th className="py-3 px-6">Description</th>
              <th className="py-3 px-6">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {visibleTransactions.map((transaction, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition bg-white rounded-2xl shadow-md"
              >
                <td className="py-4 px-6 flex items-center gap-2">
                  <div className="rounded-full bg-pryClr/40 p-3">
                    <ArrowDown
                      className={`transform rounded-full rotate-[${transaction.type === "Withdraw" ? "-140deg" : "140deg"}] ${transaction.iconColor}`}
                      size={18}
                    />
                  </div>
                  <span className="font-medium text-gray-800">{transaction.type}</span>
                </td>
                <td className="py-4 px-6 font-semibold">{transaction.amount}</td>
                <td className={`py-4 px-6 text-gray-600`}>
                  {transaction.description ? transaction.description : "-------- --------"}
                </td>
                <td className="pl-6">
                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-[7px] text-xs font-medium border ${
                      transaction.status === "Successful"
                        ? "bg-green-100 text-green-700 border-current/30"
                        : transaction.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700 border-current/30"
                        : "bg-red-100 text-red-700 border-current/30"
                    }`}
                  >
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 md:hidden">
        {visibleTransactions.map((transaction, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl shadow-md flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-pryClr/40 p-3">
                <ArrowDown
                  className={`transform rounded-full rotate-[${transaction.type === "Withdraw" ? "-140deg" : "140deg"}] ${transaction.iconColor}`}
                  size={18}
                />
              </div>
              <div>
                <p className="font-semibold text-gray-800">{transaction.type}</p>
                <p className="text-sm text-gray-600">{transaction.amount}</p>
              </div>
            </div>
            <span
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-[7px] text-xs font-medium border ${
                transaction.status === "Successful"
                  ? "bg-green-100 text-green-700 border-current/30"
                  : transaction.status === "Pending"
                  ? "bg-yellow-100 text-yellow-700 border-current/30"
                  : "bg-red-100 text-red-700 border-current/30"
              }`}
            >
              {transaction.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;

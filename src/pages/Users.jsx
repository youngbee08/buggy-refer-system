import React, { useState, useEffect } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers([
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        referrals: 12,
        clicks: 80,
        completed: 10,
        balance: "₦2500",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        referrals: 5,
        clicks: 42,
        completed: 7,
        balance: "₦1800",
      },
      {
        id: 3,
        name: "Michael Johnson",
        email: "michael@example.com",
        referrals: 20,
        clicks: 150,
        completed: 18,
        balance: "₦5000",
      },
      {
        id: 4,
        name: "Sarah Williams",
        email: "sarah@example.com",
        referrals: 8,
        clicks: 60,
        completed: 5,
        balance: "₦2100",
      },
    ]);
  }, []);

  return (
    <div className="flex flex-col gap-6 lg:p-6 max-w-full overflow-x-hidden pb-[4rem]">
      <h2 className="text-base lg:text-2xl font-bold text-black tracking-wide">
        All Users
      </h2>

      <div className="hidden md:block overflow-x-auto">
        {/* ✅ Wrapper div handles rounded corners */}
        <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
          <table className="w-full border-collapse">
            <thead className="text-gray-700 text-sm bg-gray-100">
              <tr>
                <th className="py-3 px-6 text-center">#</th>
                <th className="py-3 px-6 text-center">Name</th>
                <th className="py-3 px-6 text-center">Email</th>
                <th className="py-3 px-6 text-center">Referrals</th>
                <th className="py-3 px-6 text-center">Clicks</th>
                <th className="py-3 px-6 text-center">Completed</th>
                <th className="py-3 px-6 text-center">Balance</th>
                <th className="py-3 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-center">
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 bg-white transition"
                >
                  <td className="py-4 px-6 font-medium text-gray-800">
                    {index + 1}
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-800">
                    {user.name}
                  </td>
                  <td className="py-4 px-6">{user.email}</td>
                  <td className="py-4 px-6">{user.referrals}</td>
                  <td className="py-4 px-6">{user.clicks}</td>
                  <td className="py-4 px-6">{user.completed}</td>
                  <td className="py-4 px-6">{user.balance}</td>
                  <td className="py-4 px-6 flex justify-center gap-2">
                    <button className="px-3 py-1 rounded-[7px] text-xs font-medium bg-red-100 text-red-700 hover:bg-red-200 transition">
                      Delete
                    </button>
                    <button className="px-3 py-1 rounded-[7px] text-xs font-medium bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition">
                      Disable
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;

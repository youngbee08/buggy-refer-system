// src/components/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";
import {
  MdDashboard,
  MdHistory,
  MdAccountBalanceWallet,
  MdGroupAdd,
  MdPerson,
  MdLogout,
} from "react-icons/md"; // You can pick any set from react-icons
import assets from "../assets/assests";

const Sidebar = () => {
  const location = useLocation();

  const linkClasses = (path) =>
    `flex items-center gap-3 p-2 text-base rounded-md transition-colors ${
      location.pathname === path
        ? "text-yellow-400 font-semibold" // Active
        : "text-white hover:text-yellow-300"
    }`;

  return (
    <aside className="hidden lg:flex flex-col w-84 bg-pryClr text-white h-screen p-8 justify-between">
      {/* Top Section (Logo + Nav) */}
      <div>
        {/* Logo */}
        <div className="flex items-center gap-2 mb-12">
          <img src={assets.logo} alt="" className="w-[320px] h-auto"/>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-4">
          <Link to="/dashboard" className={linkClasses("/dashboard")}>
            <MdDashboard size={22} />
            <span className="text-lg">Dashboard</span>
          </Link>
          <Link to="/history" className={linkClasses("/history")}>
            <MdHistory size={22} />
            <span className="text-lg">History</span>
          </Link>
          <Link to="/withdraw" className={linkClasses("/withdraw")}>
            <MdAccountBalanceWallet size={22} />
            <span className="text-lg">Withdraw</span>
          </Link>
          <Link to="/refer" className={linkClasses("/refer")}>
            <MdGroupAdd size={22} />
            <span className="text-lg">Refer & Earn</span>
          </Link>
          <Link to="/profile" className={linkClasses("/profile")}>
            <MdPerson size={22} />
            <span className="text-lg">Profile</span>
          </Link>
        </nav>
      </div>

      {/* Logout at bottom */}
      <div className="mt-auto">
        <Link to="/logout" className="flex items-center gap-3 text-white hover:text-red-400">
          <MdLogout size={22} />
          <span className="text-lg">Logout</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;

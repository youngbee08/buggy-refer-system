import { Link, useNavigate } from "react-router-dom";
import {
  MdDashboard,
  MdHistory,
  MdAccountBalanceWallet,
  MdGroupAdd,
  MdPerson,
  MdLogout,
} from "react-icons/md";
import assets from "../assets/assests";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Sidebar = () => {
  const {logout} = useContext(AuthContext);
  const navigate = useNavigate()
  const linkClasses = (path) =>
    `flex items-center gap-4 p-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
      location.pathname === path
        ? "text-yellow-400 font-semibold bg-gradient-to-r from-white/10 to-transparent border-l-4 border-yellow-400"
        : "text-white hover:text-yellow-300 hover:bg-white/10"
    }`;

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-pryClr text-white h-screen p-6 justify-between shadow-xl">
      {/* Top Section (Logo + Nav) */}
      <div>
        {/* Logo */}
        <div className="flex items-center gap-2 mb-10">
          <img src={assets.logo} alt="Logo" className="w-48 h-auto transition-transform duration-300 hover:scale-110" />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-3">
          <Link to="/dashboard" className={linkClasses("/dashboard")}>
            <MdDashboard size={24} />
            <span className="text-base tracking-wide">Dashboard</span>
          </Link>
          <Link to="/history" className={linkClasses("/history")}>
            <MdHistory size={24} />
            <span className="text-base tracking-wide">History</span>
          </Link>
          <Link to="/withdraw" className={linkClasses("/withdraw")}>
            <MdAccountBalanceWallet size={24} />
            <span className="text-base tracking-wide">Withdraw</span>
          </Link>
          <Link to="/refer" className={linkClasses("/refer")}>
            <MdGroupAdd size={24} />
            <span className="text-base tracking-wide">Refer & Earn</span>
          </Link>
          <Link to="/profile" className={linkClasses("/profile")}>
            <MdPerson size={24} />
            <span className="text-base tracking-wide">Profile</span>
          </Link>
        </nav>
      </div>

      {/* Logout at bottom */}
      <div className="mt-auto" onClick={()=> logout(navigate)}>
        <p className="flex items-center gap-4 p-3 text-white hover:text-red-400 transition-all duration-300 transform hover:scale-105 hover:bg-white/10 rounded-xl">
          <MdLogout size={24} />
          <span className="text-base tracking-wide">Logout</span>
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
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
import { GiWantedReward } from "react-icons/gi";

const Sidebar = () => {
  const {logout,checkAccountType} = useContext(AuthContext);
  const accountType = checkAccountType();
  const linkClasses = (path) =>
    `flex items-center gap-4 p-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
      location.pathname === path
        ? "text-yellow-400 font-semibold bg-gradient-to-r from-white/10 to-transparent border-l-4 border-yellow-400"
        : "text-white hover:text-yellow-300 hover:bg-white/10"
  }`;
  const userPages = [
    {
      name:"Dashboard",
      path:"/dashboard",
      icon:MdDashboard
    },
    {
      name:"History",
      path:"/history",
      icon:MdHistory
    },
    {
      name:"Withdraw",
      path:"/withdraw",
      icon:MdAccountBalanceWallet
    },
    {
      name:"Refer & Earn",
      path:"/refer",
      icon:MdGroupAdd
    },
    {
      name:"Profile",
      path:"/profile",
      icon:MdPerson
    },
  ];
  const adminPages = [
    {
      name:"Dashboard",
      path:"/dashboard",
      icon:MdDashboard
    },
    {
      name:"Offers",
      path:"/offers",
      icon:GiWantedReward
    },
    {
      name:"Withdrawals",
      path:"/withdrawals",
      icon:MdAccountBalanceWallet
    },
    // {
    //   name:"Refer & Earn",
    //   path:"/refer"
    // },
    {
      name:"Profile",
      path:"/profile",
      icon:MdPerson
    },
  ];
  const navigate = useNavigate()

  const pages = accountType === "user" ? userPages : accountType === "admin" ? adminPages : navigate("/login")

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
          {
            pages.map((page,index) =>(
              <>
                <Link key={index} to={page.path} className={linkClasses(page.path)}>
                  <page.icon size={24} />
                  <span className="text-base tracking-wide">{page.name}</span>
                </Link>
              </>
            ))
          }
        </nav>
      </div>

      {/* Logout at bottom */}
      <div className="mt-auto" onClick={logout}>
        <p className="flex items-center gap-4 p-3 text-white hover:text-red-400 transition-all duration-300 transform hover:scale-105 hover:bg-white/10 rounded-xl">
          <MdLogout size={24} />
          <span className="text-base tracking-wide">Logout</span>
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
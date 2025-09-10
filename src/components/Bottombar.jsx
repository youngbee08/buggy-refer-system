import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  MdDashboard,
  MdHistory,
  MdAccountBalanceWallet,
  MdGroupAdd,
  MdPerson,
} from "react-icons/md";
import { GiWantedReward } from "react-icons/gi";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Bottombar = () => {
  const {checkAccountType} = useContext(AuthContext);
  const accountType = checkAccountType();
  const location = useLocation();

  const linkClasses = (path) =>
    `flex flex-col items-center justify-center text-sm transition-all duration-300 transform hover:scale-110 ${
      location.pathname === path
        ? "text-accClrYellow font-semibold bg-white/10 rounded-lg py-2 px-3"
        : "text-secClrWhite hover:text-accClrYellow hover:bg-white/5"
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
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-pryClr shadow-lg h-16 flex justify-around items-center z-50 border-t border-white/10">
      {
        pages.map((page,index) =>(
          <>
            <Link key={index} to={page.path} className={linkClasses(page.path)}>
              <page.icon size={26} />
              <span className="mt-1 text-xs tracking-wide">{page.name}</span>
            </Link>
          </>
        ))
      }
    </div>
  );
};

export default Bottombar;
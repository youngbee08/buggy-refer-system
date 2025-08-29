import { Link, useLocation } from "react-router-dom";
import {
  MdDashboard,
  MdHistory,
  MdAccountBalanceWallet,
  MdGroupAdd,
  MdPerson,
} from "react-icons/md";

const Bottombar = () => {
  const location = useLocation();

  const linkClasses = (path) =>
    `flex flex-col items-center justify-center text-sm transition-all duration-300 transform hover:scale-110 ${
      location.pathname === path
        ? "text-accClrYellow font-semibold bg-white/10 rounded-lg py-2 px-3"
        : "text-secClrWhite hover:text-accClrYellow hover:bg-white/5"
    }`;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-pryClr shadow-lg h-16 flex justify-around items-center z-50 border-t border-white/10">
      <Link to="/dashboard" className={linkClasses("/dashboard")}>
        <MdDashboard size={26} />
        <span className="mt-1 text-xs tracking-wide">Dashboard</span>
      </Link>
      <Link to="/history" className={linkClasses("/history")}>
        <MdHistory size={26} />
        <span className="mt-1 text-xs tracking-wide">History</span>
      </Link>
      <Link to="/withdraw" className={linkClasses("/withdraw")}>
        <MdAccountBalanceWallet size={26} />
        <span className="mt-1 text-xs tracking-wide">Withdraw</span>
      </Link>
      <Link to="/refer" className={linkClasses("/refer")}>
        <MdGroupAdd size={26} />
        <span className="mt-1 text-xs tracking-wide">Refer</span>
      </Link>
      <Link to="/profile" className={linkClasses("/profile")}>
        <MdPerson size={26} />
        <span className="mt-1 text-xs tracking-wide">Profile</span>
      </Link>
    </div>
  );
};

export default Bottombar;
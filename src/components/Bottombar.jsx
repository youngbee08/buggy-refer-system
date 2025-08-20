// src/components/Bottombar.jsx
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
    `flex flex-col items-center justify-center text-sm transition-colors ${
      location.pathname === path
        ? "text-accClrYellow font-semibold" // Active
        : "text-secClrWhite hover:text-accClrYellow"
    }`;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-pryClr shadow-md h-20 flex justify-around items-center z-50 ">
      <Link to="/dashboard" className={linkClasses("/dashboard")}>
        <MdDashboard size={28} />
      </Link>
      <Link to="/history" className={linkClasses("/history")}>
        <MdHistory size={28} />
      </Link>
      <Link to="/withdraw" className={linkClasses("/withdraw")}>
        <MdAccountBalanceWallet size={28} />
      </Link>
      <Link to="/refer" className={linkClasses("/refer")}>
        <MdGroupAdd size={28} />
      </Link>
      <Link to="/profile" className={linkClasses("/profile")}>
        <MdPerson size={28} />
      </Link>
    </div>
  );
};

export default Bottombar;


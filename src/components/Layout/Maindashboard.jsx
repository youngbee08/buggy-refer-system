import React from "react";
import Sidebar from "../../components/Sidebar";
import Bottombar from "../../components/Bottombar";
import TopBar from "../Topbar";

const Maindashboard = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar (only on large screens) */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ">
        <TopBar />
        <div className="p-4">
          {children}
        </div>
      </div>

      {/* Bottom Navigation (only on small/medium screens) */}
      <Bottombar />
    </div>
  );
};

export default Maindashboard;

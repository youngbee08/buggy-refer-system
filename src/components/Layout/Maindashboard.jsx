import React from "react";
import Sidebar from "../../components/Sidebar";
import Bottombar from "../../components/Bottombar";
import TopBar from "../Topbar";

const Maindashboard = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar (only on large screens) */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen bg-pryClr/10">
        {/* Sticky Top Bar */}
        <div className="sticky top-0 z-10 bg-pryClr/10 shadow-sm">
          <TopBar />
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>

      {/* Bottom Navigation (only on small/medium screens) */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden z-10">
        <Bottombar />
      </div>
    </div>
  );
};

export default Maindashboard;

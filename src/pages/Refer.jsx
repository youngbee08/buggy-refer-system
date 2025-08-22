
import React, { useState } from "react";
import Ongoing from "./subpage/Ongoing";
import Closed from "./subpage/Closed";

const Refer = () => {
  const [activeTab, setActiveTab] = useState("ongoing"); // default tab

  return (
    <div className="">
      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          className={`pb-2 px-4 font-semibold text-xl ${
            activeTab === "ongoing"
              ? "border-b-2 border-accClrYellow capitalize text-start text-pryClr"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("ongoing")}
        >
          Ongoing offer
        </button>
        <button
          className={`pb-2 px-4 font-semibold text-xl ${
            activeTab === "closed"
              ? "border-b-2 border-accClrYellow capitalize text-start text-pryClr"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("closed")}
        >
          Closed offer
        </button>
      </div>

      {/* Content */}
      <div>
        {activeTab === "ongoing" && <Ongoing />}
        {activeTab === "closed" && <Closed />}
      </div>
    </div>
  );
};

export default Refer;
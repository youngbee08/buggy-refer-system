// src/pages/Closed.jsx
import React from "react";
import assets from "../../assets/assests";
import { Copy } from "lucide-react";

const Closed = () => {
  const link = "closed";

  return (
    <div className="pb-[5rem] lg:pb-0 p-2">
      <div className="bg-accClrYellow rounded p-6 lg:mt-0">
        <div className="grid lg:grid-cols-2 grid-1 lg:gap-6 gap-10">
          <div>
            <img
              src={assets.flyer}
              alt="flyer"
              className="w-full h-auto rounded"
            />
          </div>

          <div className="space-y-3">
            {/* Username */}
            <div className="flex flex-col gap-2 items-start">
              <h1 className="capitalize lg:text-xl text-[18px]">My username</h1>
              <div className="bg-pryClr/65 p-3 rounded w-full">
                <h1 className="capitalize text-secClrWhite lg:text-xl text-[18px]">
                  musiliu
                </h1>
              </div>
            </div>

            {/* Link (disabled copy) */}
            <div className="flex flex-col gap-2 items-start">
              <h1 className="capitalize lg:text-xl text-[18px]">My link</h1>
              <div className="bg-pryClr/65 p-3 rounded w-full flex items-center justify-between gap-2">
                <h1 className="capitalize text-secClrWhite lg:text-xl text-[18px] truncate">
                  {link}
                </h1>
                {/* Disabled copy button */}
                <button disabled className="cursor-not-allowed opacity-50">
                  <Copy className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Bonus */}
            <div className="flex flex-col gap-2 items-start">
              <h1 className="capitalize lg:text-xl text-[18px]">
                Bonus Per Referral
              </h1>
              <div className="bg-pryClr/65 p-3 rounded w-full">
                <h1 className="capitalize text-secClrWhite lg:text-xl text-[18px]">
                  #5,000
                </h1>
              </div>
            </div>

            {/* End date */}
            <div className="flex flex-col gap-2 items-start">
              <h1 className="capitalize lg:text-xl text-[18px]">end date</h1>
              <div className="bg-pryClr/65 p-3 rounded w-full">
                <h1 className="capitalize text-secClrWhite lg:text-xl text-[18px]">
                  Closed
                </h1>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-4 justify-center mt-5">
              <div className="bg-pryClr/65 rounded-xl p-4 flex flex-col items-center justify-center flex-1">
                <p className="text-sm text-secClrWhite capitalize lg:text-xl">
                  No of clicks
                </p>
                <h2 className="text-3xl font-bold mt-2 text-secClrWhite">80</h2>
              </div>

              <div className="bg-pryClr/65 rounded-xl p-4 flex flex-col items-center justify-center flex-1">
                <p className="text-sm text-secClrWhite capitalize lg:text-xl">
                  Completed Sales
                </p>
                <h2 className="text-3xl font-bold mt-2 text-secClrWhite">1</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Closed;

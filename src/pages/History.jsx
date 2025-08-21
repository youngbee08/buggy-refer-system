import { ArrowDown } from "lucide-react";
import React from "react";

const History = () => {
  return (
    <div className="mt-16">
      <div className="bg-pryClr p-2 flex flex-col gap-3 rounded-[7px] w-[90%] lg:w-[95%] mx-auto my-6 lg:mb-6 mb-[6rem]">
        <div className="bg-secClrWhite rounded-[6px] p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="bg-pryClr rounded-full p-2 rotate-[-140deg] text-red-500">
              <ArrowDown />
            </div>
            <h3 className="text-xl lg:text-2xl font-bold">Withdraw</h3>
          </div>
          <div className="flex items-center gap-2 lg:gap-6">
            <p className="bg-[#2b7b20] text-white rounded w-[80px] text-center text-[14px] p-[.3rem]">
              Successful
            </p>
            <h3 className="text-xl font-medium">N5000</h3>
          </div>
        </div>
        <div className="bg-secClrWhite rounded-[6px] p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="bg-pryClr rounded-full p-2 rotate-[140deg] text-accClrYellow">
              <ArrowDown />
            </div>
            <h3 className="text-xl lg:text-2xl font-bold">Earn</h3>
          </div>
          <div className="flex items-center gap-2 lg:gap-6">
            <p className="bg-[#2b7b20] text-white rounded w-[80px] text-center text-[14px] p-[.3rem]">
              Successful
            </p>
            <h3 className="text-xl font-medium">N2000</h3>
          </div>
        </div>
        <div className="bg-secClrWhite rounded-[6px] p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="bg-pryClr rounded-full p-2 rotate-[-140deg] text-red-500">
              <ArrowDown />
            </div>
            <h3 className="text-xl lg:text-2xl font-bold">Withdraw</h3>
          </div>
          <div className="flex items-center gap-2 lg:gap-6">
            <p className="bg-accClrYellow w-[80px] text-center text-white rounded text-[14px] p-[.3rem]">
              Pending
            </p>
            <h3 className="text-xl font-medium">N3000</h3>
          </div>
        </div>
        <div className="bg-secClrWhite rounded-[6px] p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="bg-pryClr rounded-full p-2 rotate-[-140deg] text-red-500">
              <ArrowDown />
            </div>
            <h3 className="text-xl lg:text-2xl font-bold">Withdraw</h3>
          </div>
          <div className="flex items-center gap-2 lg:gap-6">
            <p className="bg-[#2b7b20] text-white rounded w-[80px] text-center text-[14px] p-[.3rem]">
              Successful
            </p>
            <h3 className="text-xl font-medium">N5000</h3>
          </div>
        </div>
        <div className="bg-secClrWhite rounded-[6px] p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="bg-pryClr rounded-full p-2 rotate-[140deg] text-accClrYellow">
              <ArrowDown />
            </div>
            <h3 className="text-xl lg:text-2xl font-bold">Earn</h3>
          </div>
          <div className="flex items-center gap-2 lg:gap-6">
            <p className="bg-[#2b7b20] text-white rounded w-[80px] text-center text-[14px] p-[.3rem]">
              Successful
            </p>
            <h3 className="text-xl font-medium">N12000</h3>
          </div>
        </div>
        <div className="bg-secClrWhite rounded-[6px] p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="bg-pryClr rounded-full p-2 rotate-[140deg] text-accClrYellow">
              <ArrowDown />
            </div>
            <h3 className="text-xl lg:text-2xl font-bold">Earn</h3>
          </div>
          <div className="flex items-center gap-2 lg:gap-6">
            <p className="bg-red-500 text-white rounded w-[80px] text-center text-[14px] p-[.3rem]">
              Failed
            </p>
            <h3 className="text-xl font-medium">N12000</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;

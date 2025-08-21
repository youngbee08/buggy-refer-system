import { EyeClosed } from "lucide-react";
import React from "react";
import { useState } from "react";
import WithdrawPopup from "../components/WithdrawPopup";

const Withdraw = () => {
  const [toggleWithdraw, setToggleWithdraw] = useState(false);
  const [withdrawPopup, setWithdrawPopup] = useState(false);
  return (
    <div className="">
      <div className="flex flex-col gap-6 pb-[6rem]">
        <div className="bg-pryClr flex flex-col w-100 mx-auto mt-4 rounded-[10px] p-4">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold">Wallet balance</h3>
            <EyeClosed size={18} />
          </div>
          <div className="flex flex-col gap-2 items-start lg:items-center">
            <h2 className="text-2xl lg:text-4xl font-bold text-accClrYellow">
              N5,000
            </h2>
            <button
              className="bg-secClrWhite text-secClrBlack rounded-[6px] px-7 py-2 text-base lg:text-xl font-semibold"
              onClick={() => setToggleWithdraw(!toggleWithdraw)}
            >
              Withdraw
            </button>
          </div>
        </div>
        {toggleWithdraw ? (
          <>
            <div
              className={`grid lg:grid-cols-2 w-[90%] lg:w-[95%] mx-auto gap-3`}
            >
              <div className="flex flex-col gap-1 lg:gap-3">
                <label
                  htmlFor="bankName"
                  className="text-base lg:text-xl font-semibold"
                >
                  Bank Name
                </label>
                <h2 className="bg-pryClr rounded-[7px] border-0 outline-0 px-5 py-2 text-base lg:text-xl font-semibold">
                  United Bank For Africa
                </h2>
              </div>
              <div className="flex flex-col gap-1 lg:gap-3">
                <label
                  htmlFor="accountNum"
                  className="text-base lg:text-xl font-semibold"
                >
                  Account Number
                </label>
                <h2 className="bg-pryClr rounded-[7px] border-0 outline-0 px-5 py-2 text-base lg:text-xl font-semibold">
                  2170000000
                </h2>
              </div>
              <div className="flex flex-col gap-1 lg:gap-3">
                <label
                  htmlFor="accountName"
                  className="text-base lg:text-xl font-semibold"
                >
                  Account Name
                </label>
                <h2 className="bg-pryClr rounded-[7px] border-0 outline-0 px-5 py-2 text-base lg:text-xl font-semibold">
                  Olatunji Ibrahim Olasunkanmi
                </h2>
              </div>
              <div className="flex flex-col gap-1 lg:gap-3">
                <label
                  htmlFor="accountName"
                  className="text-base lg:text-xl font-semibold"
                >
                  Amount
                </label>
                <input
                  type="text"
                  className="bg-[#d9d9d9] rounded-[7px] border-0 outline-0 px-5 py-2 text-base lg:text-xl font-semibold"
                />
              </div>
            </div>
            <button
              className="bg-[#2b7b20] rounded-[6px] px-7 py-2 text-base lg:text-xl font-semibold lg:w-1/2 cursor-pointer mx-auto text-secClrWhite"
              onClick={() => setWithdrawPopup(true)}
            >
              Confirm Withdrawal
            </button>
            {withdrawPopup ? <WithdrawPopup /> : null}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Withdraw;

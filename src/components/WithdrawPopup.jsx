import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";

const WithdrawPopup = () => {
  const acceptedNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [pin, setPin] = useState("");

  const handleNumberClick = (num) => {
    if (pin.length < 4) {
      setPin((prev) => prev + num);
    }
  };

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  const handleOk = () => {
    if (pin.length === 4) {
      alert(`PIN entered: ${pin}`);
    }
  };

  return (
    <div className="popUpPin w-[80%] lg:w-1/4 mx-auto absolute lg:bottom-[8rem] lg:right-[20rem] right-[2.3rem] bg-white p-[1rem_1rem] rounded-[7px] flex flex-col gap-5">
      <h3 className="text-xl lg:text-2xl font-semibold text-center">Enter your 4-digit PIN</h3>

      <div className="flex items-center gap-3 w-full justify-center">
        {[0, 1, 2, 3].map((i) => (
          <p
            key={i}
            className="bg-[#c7c8c8] h-[3rem] w-[3rem] rounded text-xl font-bold text-center flex items-center justify-center"
          >
            {pin[i] ? "•" : ""}
          </p>
        ))}
      </div>
      <div className="flex gap-2 w-[90%] lg:w-[70%] mx-auto">
        <div className="grid grid-cols-3 grid-rows-3 gap-2">
          {acceptedNumbers.map((number, key) => (
            <button
              key={key}
              onClick={() => handleNumberClick(number)}
              className="bg-[#dbdcdc] p-[.5rem_.8rem] cursor-pointer rounded text-lg font-semibold text-center"
            >
              {number}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2 lg:w-fit w-1/3">
          <button
            onClick={handleBackspace}
            className="bg-[#c7c8c8] cursor-pointer p-[.5rem_1.3rem] rounded text-base font-bold text-center h-[35%] flex items-center justify-center"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            onClick={handleOk}
            className="bg-[#c7c8c8] p-[.5rem_1.3rem] cursor-pointer rounded text-base font-bold text-center h-[80%] flex items-center justify-center"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawPopup;

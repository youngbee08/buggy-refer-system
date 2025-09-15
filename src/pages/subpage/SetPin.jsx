import React, { useContext, useRef, useState } from "react";
import { Loader2, Lock } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const SetPin = () => {
  const inputsRef = useRef([]);
  const [settingPin,setSettingPin] = useState(false);
  const {authRequestWithToken} = useContext(AuthContext);
  const navigate = useNavigate()

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
    const allFilled = inputsRef.current.every(input => input.value);
    if (allFilled) {
      handleSubmit();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async() => {
    setSettingPin(true)
    try {
      const pin = inputsRef.current.map((input) => input.value).join("");
      const res = await authRequestWithToken("/user/profile",{transaction_pin:pin},"PUT");
      if (res.success === true) {
        navigate("/dashboard")
      }else{
        toast.error("An unexpected error occured while setting up pin")
      }
    } catch (error) {
      console.log(error)
    } finally{
      setSettingPin(false)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 text-center">
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-pryClr/10 text-pryClr mx-auto mb-6">
          <Lock size={28} />
        </div>

        <h1 className="text-2xl font-semibold text-white mb-2">Set Up Your PIN</h1>
        <p className="text-gray-400 mb-8 text-sm">
          Create a secure 4-digit PIN to protect your account.
        </p>

        <div className="flex gap-3 justify-center mb-8">
          {[0, 1, 2, 3].map((_, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="password"
              maxLength={1}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-lg font-semibold border border-gray-600 focus:border-pryClr focus:ring-pryClr rounded-xl bg-gray-200 text-gray-800"
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-pryClr hover:bg-pryClr/90 text-white py-3 rounded-xl font-medium transition"
        >
          {settingPin ? <Loader2 className="w-full mx-auto animate-spin"/> : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default SetPin;
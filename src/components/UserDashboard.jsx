import React, { useContext, useState } from "react";
import { ArrowDown, CheckCircle, Eye, EyeOff, MousePointerClick, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import assets from "../assets/assests";
import { AuthContext } from "../context/AuthContext";
import Ongoing from "../pages/subpage/Ongoing";
import History from "../pages/History";

const UserDashboard = () => {
  const [showBalance, setShowBalance] = useState(true);
  const {getUserDetails} = useContext(AuthContext);
  const user = getUserDetails();
  console.log(user)
  const customizeName = (name)=>{
    if (name.split(' ')[0] && name.split(' ')[1]) {
      const firstName = name.split(" ")[0];
      const lastNameInitials = name.split(" ")[1][0];
      return `${firstName}, ${lastNameInitials}.`;
    }else{
      return name
    }
  }

  const customName = customizeName(user.full_name)

  return (
    <div className="flex flex-col gap-8">
      <div className="relative bg-pryClr/35 rounded-2xl p-5 lg:p-10 flex items-center shadow-md overflow-visible lg:mt-12">
        <div>
          <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-800">
            Hi, {customName}
          </h1>
          <p className="text-gray-600 mt-1 text-[12px] md:text-base lg:text-lg lg:w-full w-[70%]">
            Ready to start your day with some activities?
          </p>
        </div>

        <img
          src={assets.ill}
          alt="Illustration"
          className="absolute right-2 md:right-6 lg:-bottom-14 md:-bottom-11.5 -bottom-7
               w-40 h-40 md:w-65 md:h-65 lg:w-80 lg:h-80 
               object-contain"
        />
      </div>

       
      <div className="space-y-6">
        <p className="text-secClrBlack capitalize text-2xl font-semibold tracking-wide">
          Overview
        </p>

        <div className="flex gap-6 md:flex-row md:gap-8 flex-wrap">
          <div className="flex-1 bg-gradient-to-br from-pryClr to-pryClr/80 rounded-2xl p-6 flex flex-col lg:items-center md:items-start justify-center shadow-lg hover:shadow-xl transition">
            <div className="flex items-center gap-3">
              <Wallet className="w-7 h-7 text-accClrYellow" />
              <p className="text-sm lg:text-lg font-medium text-secClrWhite capitalize">
                Wallet Balance
              </p>
            </div>
            <div className="flex items-center gap-5">
              <h2 className="text-3xl lg:text-4xl font-extrabold mt-3 text-accClrYellow">
                {showBalance ? user.balance : "****"}
              </h2>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="mt-3 text-secClrWhite hover:text-accClrYellow transition"
              >
                {showBalance ? (
                  <EyeOff className="w-6 h-6 cursor-pointer" />
                ) : (
                  <Eye className="w-6 h-6 cursor-pointer" />
                )}
              </button>
            </div>
          </div>

          <div className="flex-1 bg-gradient-to-br from-pryClr to-pryClr/80 rounded-2xl p-6 flex flex-col lg:items-center md:items-start justify-center shadow-lg hover:shadow-xl transition">
            <div className="flex items-center gap-3">
              <MousePointerClick className="w-7 h-7 text-secClrWhite" />
              <p className="text-sm lg:text-lg font-medium text-secClrWhite capitalize">
                Links Clicked
              </p>
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold mt-3 text-secClrWhite">
              70
            </h2>
          </div>

          <div className="flex-1 bg-gradient-to-br from-pryClr to-pryClr/80 rounded-2xl p-6 flex flex-col lg:items-center md:items-start justify-center shadow-lg hover:shadow-xl transition">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-7 h-7 text-green-400" />
              <p className="text-sm lg:text-lg font-medium text-secClrWhite capitalize">
                Completed
              </p>
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold mt-3 text-secClrWhite">
              10
            </h2>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h2 className="text-xl font-medium">Ongoing Offer</h2>
          <Link
            to={"/refer"}
            className="text-base font-semibold flex items-center hover:underline"
          >
            See all
            <ArrowDown size={20} className="rotate-[-140deg]" />
          </Link>
        </div>
        <Ongoing isRecent={true}/>
      </div>

      <div className="flex flex-col gap-4">
        <History isRecent={true} />
      </div>
    </div>
  );
};

export default UserDashboard;

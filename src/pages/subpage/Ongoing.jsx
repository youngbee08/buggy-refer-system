import React, { useState } from "react";
import assets from "../../assets/assests";
import { Copy, Check } from "lucide-react";

const Ongoing = () => {
  const [copied, setCopied] = useState(false);
  const link = "https://wa.me/23470";

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        // Modern browsers (works best on HTTPS)
        await navigator.clipboard.writeText(link);
      } else {
        // Fallback for mobile/HTTP
        const textArea = document.createElement("textarea");
        textArea.value = link;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="pb-[5rem] lg:pb-0 p-2">
      <div className="bg-accClrYellow rounded p-6 lg:mt-0">
        <div className="grid lg:grid-cols-2 grid-1 lg:gap-6 gap-10">
          <div>
            <img src={assets.flyer} alt="flyer" className="w-full h-auto rounded" />
          </div>
          <div className="space-y-3 ">
            {/* Username */}
            <div className="flex flex-col gap-2 items-start">
              <h1 className="capitalize lg:text-xl text-[18px]">My username</h1>
              <div className="bg-pryClr/65 p-3 rounded w-full">
                <h1 className="capitalize text-secClrWhite lg:text-xl text-[18px]">
                  musiliu
                </h1>
              </div>
            </div>

            {/* Link with Copy */}
            <div className="flex flex-col gap-2 items-start">
              <h1 className="capitalize lg:text-xl text-[18px]">My link</h1>
              <div className="bg-pryClr/65 p-3 rounded w-full flex items-center justify-between gap-2">
                <h1 className="capitalize text-secClrWhite lg:text-xl text-[18px] truncate">
                  {link}
                </h1>
                <button onClick={handleCopy}>
                  {copied ? (
                    <Check className="w-5 h-5 text-green-400" />
                  ) : (
                    <Copy className="w-5 h-5 text-secClrWhite" />
                  )}
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

            {/* Username Again */}
            <div className="flex flex-col gap-2 items-start">
              <h1 className="capitalize lg:text-xl text-[18px]">end date</h1>
              <div className="bg-pryClr/65 p-3 rounded w-full">
                <h1 className="capitalize text-secClrWhite lg:text-xl text-[18px]">
                  12-June-2025
                </h1>
              </div>
            </div>
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

export default Ongoing;

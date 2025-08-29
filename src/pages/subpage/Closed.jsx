import React from 'react';
import { Copy } from 'lucide-react';
import assets from '../../assets/assests';

const Closed = () => {
  const link = 'closed';

  return (
    <div className="pb-24 lg:pb-6 max-w-4xl mx-auto">
      <div className="bg-pryClr rounded-2xl p-6 shadow-lg border border-accClrYellow transition-all duration-300 hover:shadow-xl opacity-90">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="overflow-hidden rounded-xl">
            <img
              src={assets.flyer}
              alt="Flyer"
              className="w-full h-auto object-cover filter grayscale transform hover:scale-105 transition-all duration-300"
            />
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-base lg:text-lg font-semibold text-secClrWhite">My Username</h1>
              <div className="bg-pryClr rounded-lg p-3 border border-secClrWhite/30">
                <h1 className="text-base lg:text-lg text-secClrWhite font-medium">musiliu</h1>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="text-base lg:text-lg font-semibold text-secClrWhite">My Link</h1>
              <div className="bg-pryClr rounded-lg p-3 border border-secClrWhite/30 flex items-center justify-between gap-2">
                <h1 className="text-base lg:text-lg text-secClrWhite truncate">{link}</h1>
                <button disabled className="p-2 rounded-full bg-pryClr opacity-50 cursor-not-allowed">
                  <Copy className="w-5 h-5 text-secClrWhite/50" />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="text-base lg:text-lg font-semibold text-secClrWhite">Bonus Per Referral</h1>
              <div className="bg-pryClr rounded-lg p-3 border border-secClrWhite/30">
                <h1 className="text-base lg:text-lg text-secClrWhite font-medium">₦5,000</h1>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="text-base lg:text-lg font-semibold text-secClrWhite">End Date</h1>
              <div className="bg-pryClr rounded-lg p-3 border border-secClrWhite/30">
                <h1 className="text-base lg:text-lg text-secClrWhite font-medium">Closed</h1>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-pryClr rounded-xl p-4 flex flex-col items-center justify-center border border-accClrYellow transition-all duration-300 hover:scale-105">
                <p className="text-sm lg:text-base text-secClrWhite capitalize">No of Clicks</p>
                <h2 className="text-2xl lg:text-3xl font-bold mt-2 text-accClrYellow">80</h2>
              </div>
              <div className="bg-pryClr rounded-xl p-4 flex flex-col items-center justify-center border border-accClrYellow transition-all duration-300 hover:scale-105">
                <p className="text-sm lg:text-base text-secClrWhite capitalize">Completed Sales</p>
                <h2 className="text-2xl lg:text-3xl font-bold mt-2 text-accClrYellow">1</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Closed;
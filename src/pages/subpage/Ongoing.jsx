import React, { useContext, useEffect, useRef, useState } from 'react';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Ongoing = () => {
  const linkRef = useRef(null)
  const [ongoingOffers,setOngoingOffers] = useState([]);
  const {getRequestWithToken,getUserDetails} = useContext(AuthContext);
  const navigate = useNavigate()
  const user = getUserDetails();
  const fetchOngoingOffer = async ()=>{
    try {
      const res = await getRequestWithToken(navigate,"/offers/ongoing");
      console.log(res);
      setOngoingOffers(res.offers.data)
    } catch (err) {
      console.log(err)
    }
  };

  

  const handleCopyLink = () => {
    navigator.clipboard.writeText(linkRef.current.textContent);
    toast.success('Link copied to clipboard!');
  };

  useEffect(() => {
    fetchOngoingOffer()
  }, [])

  return (
    <div className="pb-24 lg:pb-6  mx-auto">
      <div className="bg-pryClr rounded-2xl p-6 shadow-lg border border-accClrYellow transition-all duration-300 hover:shadow-xl">
       {
        ongoingOffers.map((offer,key) =>(
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8" key={key}>
            <div className="overflow-hidden rounded-xl">
              <img
                src={offer.image}
                alt="Flyer"
                className="w-full h-auto object-cover transform hover:scale-105 transition-all duration-300"
              />
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <h1 className="text-base lg:text-lg font-semibold text-secClrWhite">My Username</h1>
                <div className="bg-pryClr rounded-lg p-3 border border-secClrWhite/30">
                  <h1 className="text-base lg:text-lg text-secClrWhite font-medium">{user.username}</h1>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <h1 className="text-base lg:text-lg font-semibold text-secClrWhite">My Link</h1>
                <div className="bg-pryClr rounded-lg p-3 border border-secClrWhite/30 flex items-center justify-between gap-2">
                  <h1 className="text-base lg:text-lg text-secClrWhite truncate cursor-pointer" ref={linkRef}>{offer.referral_link}</h1>
                  <button
                    className="p-2 rounded-full bg-accClrPink cursor-pointer hover:bg-accClrPink/80 transition-all duration-300"
                    onClick={handleCopyLink}
                  >
                    <Copy className="w-5 h-5 text-secClrWhite" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <h1 className="text-base lg:text-lg font-semibold text-secClrWhite">Bonus Per Referral</h1>
                <div className="bg-pryClr rounded-lg p-3 border border-secClrWhite/30">
                  <h1 className="text-base lg:text-lg text-secClrWhite font-medium">₦{offer.bonus_per_referral}</h1>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <h1 className="text-base lg:text-lg font-semibold text-secClrWhite">End Date</h1>
                <div className="bg-pryClr rounded-lg p-3 border border-secClrWhite/30">
                  <h1 className="text-base lg:text-lg text-secClrWhite font-medium">{offer.end_date}</h1>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-pryClr rounded-xl p-4 flex flex-col items-center justify-center border border-accClrYellow transition-all duration-300 hover:scale-105">
                  <p className="text-sm lg:text-base text-secClrWhite capitalize">No of Clicks</p>
                  <h2 className="text-2xl lg:text-3xl font-bold mt-2 text-accClrYellow">{offer.clicks}</h2>
                </div>
                <div className="bg-pryClr rounded-xl p-4 flex flex-col items-center justify-center border border-accClrYellow transition-all duration-300 hover:scale-105">
                  <p className="text-sm lg:text-base text-secClrWhite capitalize">Completed Sales</p>
                  <h2 className="text-2xl lg:text-3xl font-bold mt-2 text-accClrYellow">{offer.completed_sales}</h2>
                </div>
              </div>
            </div>
          </div>
        ))
       }
      </div>
    </div>
  );
};

export default Ongoing;
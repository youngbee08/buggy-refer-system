import React, { useContext, useEffect, useRef, useState } from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { AuthContext } from "../../context/AuthContext";

const Ongoing = () => {
  const linkRef = useRef(null);
  const [ongoingOffers, setOngoingOffers] = useState([]);
  const { getRequestWithToken, getUserDetails } = useContext(AuthContext);
  const user = getUserDetails();

  const fetchOngoingOffer = async () => {
    try {
      const res = await getRequestWithToken("/offers/ongoing");
      console.log(res);
      setOngoingOffers(res.offers.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard!");
  };

  useEffect(() => {
    fetchOngoingOffer();
  }, []);

  return (
    <div className="pb-24 lg:pb-6">
      <div className="space-y-4">
        {ongoingOffers.map((offer, key) => (
          <div
            key={key}
            className="flex flex-col lg:flex-row items-start gap-6 lg:gap-10 bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all duration-300"
          >
            {/* Left side image */}
            <img
              src={offer.image}
              alt="Offer"
              className="w-full max-w-[120px] h-24 md:max-w-[190px] md:h-48 rounded-lg object-cover"
            />

            {/* Right side details */}
            <div className="flex-1 space-y-3">
              {/* Title */}
              <h2 className="text-blue-600 font-semibold text-base md:text-lg hover:underline cursor-pointer">
                {offer.title || "Ongoing Offer"}
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-sm md:text-base line-clamp-2">
                {offer.description ||
                  "This is a sample description for the ongoing offer."}
              </p>

              {/* Referral Link */}
              {/* Referral Link */}
              <div>
                <p className="text-gray-500 text-sm">My Link</p>
                <div className="flex items-center gap-2">
                  <span
                    className="text-blue-500 text-sm md:text-base truncate max-w-[200px] md:max-w-[400px] cursor-pointer"
                    ref={linkRef}
                  >
                    {offer.referral_link}
                  </span>
                  <button
                    className="p-2 rounded-full bg-pink-500 hover:bg-pink-600 transition-all duration-300"
                    onClick={() => handleCopyLink(offer.referral_link)}
                  >
                    <Copy className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

              {/* Bonus & End Date */}
              <div className="flex flex-wrap gap-6">
                <div>
                  <p className="text-gray-500 text-sm">Bonus Per Referral</p>
                  <p className="font-medium text-gray-800">
                    ₦{offer.bonus_per_referral}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">End Date</p>
                  <p className="font-medium text-gray-800">{offer.end_date}</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-row lg:flex-col gap-4 mt-4 w-full lg:w-auto">
              {/* Clicks */}
              <div className="flex-1 rounded-xl p-4 flex flex-col items-center justify-center border border-yellow-400 transition-all duration-300 hover:scale-105">
                <p className="text-sm lg:text-base text-gray-600 capitalize">
                  No of Clicks
                </p>
                <h2 className="text-2xl lg:text-3xl font-bold mt-2 text-accClrYellow">
                  {offer.clicks}
                </h2>
              </div>

              {/* Completed Sales */}
              <div className="flex-1 rounded-xl p-4 flex flex-col items-center justify-center border border-accClrYellow transition-all duration-300 hover:scale-105">
                <p className="text-sm lg:text-base text-gray-600 capitalize">
                  Completed Sales
                </p>
                <h2 className="text-2xl lg:text-3xl font-bold mt-2 text-accClrYellow">
                  {offer.completed_sales}
                </h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ongoing;

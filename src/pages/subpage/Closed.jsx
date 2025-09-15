import React, { useContext, useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import assets from "../../assets/assests";
import Notfound from "../../components/Notfound";

const Closed = ({ isRecent = false }) => {
  const linkRef = useRef(null);
  const [closedOffers, setClosedOffers] = useState([]);
  const { getRequestWithToken } = useContext(AuthContext);
  const [isFetching, setIsFetching] = useState(false);

  const fetchClosedOffers = async () => {
    setIsFetching(true);
    try {
      const res = await getRequestWithToken("/offers/closed");
      console.log(res);
      setClosedOffers(res.offers.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsFetching(false);
    }
  };


  useEffect(() => {
    fetchClosedOffers();
  }, []);

  const visibleOffers = isRecent ? closedOffers.slice(0, 2) : closedOffers;

  return (
    <div className={`${isRecent ? "pb-0" : "pb-24 lg:pb-6"}`} style={{userSelect:"none"}}>
      <div className="flex flex-col gap-3">
        {isFetching ? (
          <Loader2
            className="animate-spin text-pryClr w-full mx-auto text-[50px]"
            size={50}
          />
        ) : 
        closedOffers.length === 0 ? (
          <Notfound title={"No Offers"} message={"Looks like there are no closed offers yet."}/>
        ):(
          visibleOffers.map((offer, key) => (
            <div
              key={key}
              className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10 bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all duration-300 w-full"
            >
              {/* Left side image */}
              <img
                src={assets.flyer}
                alt="Offer"
                className="lg:w-[18%] w-full md:h-48 rounded-lg object-cover grayscale-100"
              />

              {/* Right side details */}
              <div className="flex-1 space-y-3">
                {/* Title */}
                <h2 className="font-semibold text-base md:text-lg">
                  {offer.title || "Closed Offer"}
                </h2>

                {/* Description */}
                <p className="text-gray-600 text-sm md:text-base line-clamp-2">
                  {offer.description || "This is a closed offer."}
                </p>

                {/* Referral Link */}
                <div>
                  <p className="text-gray-500 text-sm">
                    {offer.referral_link ? 'My Link' : ''}
                  </p>
                  <div className="flex items-center gap-2 pointer-events-none">
                    <span
                      className="text-blue-500 pointer-events-none text-sm md:text-base truncate max-w-[200px] md:max-w-[400px] cursor-pointer"
                      ref={linkRef}
                    >
                      {offer.referral_link}
                      https://referral.buggybillions.com.ng/public/api/r/ibrahimos/1
                    </span>
                  </div>
                </div>

                {/* Bonus & End Date */}
                <div className="flex flex-wrap gap-6">
                  <div>
                    <p className="text-gray-500 lg:text-sm text-xs">
                      Bonus Per Referral
                    </p>
                    <p className="font-medium text-gray-800">
                      ₦{offer.bonus_per_referral}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 lg:text-sm text-xs">End Date</p>
                    <p className="font-medium text-gray-800">
                      {offer.end_date}
                    </p>
                  </div>
                </div>
              </div>

              {
                offer.clicks && offer.completed_sales ? (
                  <div className="flex flex-row lg:flex-col gap-4 mt-4 w-full lg:w-auto">
                    <div className="rounded-xl p-4 flex gap-3 items-center justify-center border border-yellow-400 transition-all duration-300 hover:scale-105">
                      <p className="text-xs lg:text-base text-gray-600 capitalize font-medium">
                        No of Clicks
                      </p>
                      <h2 className="text-2xl lg:text-3xl font-bold mt-2 text-accClrYellow">
                        {offer.clicks}
                      </h2>
                    </div>

                    <div className="flex rounded-xl p-4 gap-2 items-center justify-center border border-accClrYellow transition-all duration-300 hover:scale-105">
                      <p className="text-xs lg:text-base text-gray-600 capitalize font-medium">
                        Completed Sales
                      </p>
                      <h2 className="text-2xl lg:text-3xl font-bold mt-2 text-accClrYellow">
                        {offer.completed_sales}
                      </h2>
                    </div>
                  </div>
                ) : (
                 null 
                )
              }
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Closed;

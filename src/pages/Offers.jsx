import React, { useContext, useState } from "react";
import { Loader2, PlusCircle } from "lucide-react";
import OfferModal from "../components/OfferModal"; // Import the modal you already have
import OfferCard from "../components/OffersCard"; // Import the card component
import { AuthContext } from "../context/AuthContext";
import { useEffect } from "react";
import { toast } from "sonner";

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingOffers, setLoadingOffers] = useState(false);
  const {getRequestWithToken} = useContext(AuthContext);
  const [saving,setSaving] = useState(false)
  const {authRequestWithToken} = useContext(AuthContext);

  const handleSaveOffer = async (offerDetails) => {
    setSaving(true)
    try {
      const formData = new FormData;
      formData.append("title", offerDetails.title)
      formData.append("image", offerDetails.image)
      formData.append("status", offerDetails.status)
      formData.append("description", offerDetails.description)
      formData.append("original_price", offerDetails.original_price)
      formData.append("discount_price", offerDetails.discount_price)
      formData.append("bonus_per_referral", offerDetails.bonus_per_referral)
      formData.append("end_date", offerDetails.end_date)
      const res = await authRequestWithToken("/offers",formData,"POST");
      if (res?.success === true) {
        toast.success("Offer created successfully");
        setIsModalOpen(false)
        loadOffers()
      }else{
        toast.error("An unexpected error occured while creating offer")
      }
    } catch (error) {
      console.log(error)
      if (error.message !== "Failed to fetch") {
        toast.error(error.message)
      }
    } finally{
      setSaving(false)
    }
  };

  const loadOffers = async ()=>{
    setLoadingOffers(true)
    try {
      const res = await getRequestWithToken("/offers");
      console.log(res)
      setOffers(res.offers.data)
    } catch (error) {
     console.log(error) 
    } finally{
      setLoadingOffers(false)
    }
  }

  useEffect(() => {
    loadOffers()
  }, [])

  

  return (
    <div className="">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl lg:text-2xl font-bold text-gray-800">Existing Offers</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-pryClr text-white rounded-lg hover:bg-pryClr/90 cursor-pointer transition"
        >
          <PlusCircle size={20} />
          <span>Create Offer</span>
        </button>
      </div>

      {
        loadingOffers ? <Loader2 size={50} className="w-full mx-auto mt-5 text-pryClr animate-spin"/> : 
        offers.length === 0 ? (
          <p className="text-gray-500">No offers yet. Create one to get started.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:pb-0 pb-16">
            {offers.map((offer, index) => (
              <OfferCard key={index} offer={offer} loadOffers={loadOffers}/>
            ))}
          </div>
        )
      }

      <OfferModal
      onSave={handleSaveOffer}
      isOpen={isModalOpen}
      closeAction={()=> setIsModalOpen(false)}
      updating={saving}
      isCreating={true}
      />
    </div>
  );
};

export default Offers;

      {/* <OfferCard image={assets.flyer} title={"Ongoing offer"} status={"Ongoing"} description={"This is a sample offer description."} price={99.99} date={"September 11, 2025"} clicks={140} sales={20}/> */}
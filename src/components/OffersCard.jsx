import React, { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import assets from '../assets/assests';
import OfferModal from './OfferModal';
import { toast } from 'sonner';

const OfferCard = ({ offer }) => {
  const [trackedOffer,setTrackedOffer] = useState({});
  const [isModalOpen,setIsModalOpen] = useState(false);
  const [isEditing,setIsEditing] = useState(false);
  const handleTrackOffer = (offerDetails)=>{
    setTrackedOffer(offerDetails)
    setIsModalOpen(true)
  }
  const handleEditOffer = async (offerDetails)=>{
    setIsEditing(true)
    try {
      const formData = new FormData;
      formData.append("title", offerDetails.title)
      formData.append("image", offerDetails?.image || trackedOffer.image)
      formData.append("status", offerDetails.status)
      formData.append("description", offerDetails.description)
      formData.append("original_price", offerDetails.price)
      formData.append("discount_price", offerDetails.discountPrice)
      formData.append("bonus_per_referral", offerDetails.bonus_per_referral)
      toast.success("edited successfully")
    } catch (error) {
      console.log(error)
    }finally{
      setIsEditing(false)
    }
  }
  return (
   <>
      <div className="w-full border group overflow-hidden border-gray-300 rounded-lg p-4 shadow-lg bg-white font-sans relative">
        <img 
          src={assets.flyer} 
          alt={offer.title} 
          className={`w-full h-40 object-cover rounded mb-3 group-hover:scale-107 transition-all ${offer.status === "closed" ? "grayscale-[100%]" : "grayscale-0"}`}
        />

        <div className="absolute top-3 right-3 flex gap-2">
          <button className={`bg-gray-100 hover:bg-gray-200 p-2 rounded-full shadow ${offer.status === "closed" ? "cursor-not-allowed" : "cursor-pointer"}`}>
            <Edit size={16} className={`${offer.status === "closed" ? "text-black" : "text-pryClr"}`} onClick={()=> offer.status === "closed" ? toast.error("Can't edit closed offer") : handleTrackOffer(offer)}/>
          </button>
          <button className={`bg-gray-100 hover:bg-gray-200 p-2 rounded-full shadow ${offer.status === "closed" ? "cursor-not-allowed" : "cursor-pointer"}`}>
            <Trash2 size={16} className={`${offer.status === "closed" ? "text-black" : "text-red-700"}`}/>
          </button>
        </div>

        <h2 className="text-lg font-semibold mb-2 text-gray-800">
          {offer.title}
        </h2>
        <div className="flex gap-1 flex-wrap">
          <p className="text-sm text-gray-600 my-1">
            <strong className="font-bold">Status:</strong> {offer.status}
          </p>
          <p className="text-sm text-gray-600 my-1">
            <strong className="font-bold">Description:</strong> {offer.description}
          </p>
          <p className="text-sm text-gray-600 my-1">
            <strong className="font-bold">Price:</strong> ${offer.original_price}
          </p>
          <p className="text-sm text-gray-600 my-1">
            <strong className="font-bold">Discount Price:</strong> {offer.discount_price}
          </p>
          <p className="text-sm text-gray-600 my-1">
            <strong className="font-bold">Bonus per referral:</strong> {offer.bonus_per_referral}
          </p>
          <p className="text-sm text-gray-600 my-1">
            <strong className="font-bold">End Date:</strong> {offer.end_date}
          </p>
        </div>
      </div>
      {
        trackedOffer ? (<OfferModal updating={isEditing} onSave={handleEditOffer} isCreating={false} defaultOffer={trackedOffer} isOpen={isModalOpen}
      closeAction={()=> setIsModalOpen(false)}/>) : null
      }
   </>
  );
};

export default OfferCard;
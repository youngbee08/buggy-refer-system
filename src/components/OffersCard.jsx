import React, { useContext, useState } from 'react';
import { AlertTriangle, Edit, Loader2, Trash2 } from 'lucide-react';
import OfferModal from './OfferModal';
import { toast } from 'sonner';
import { AuthContext } from '../context/AuthContext';

const OfferCard = ({ offer,loadOffers }) => {
  const [trackedOffer,setTrackedOffer] = useState({});
  const [isModalOpen,setIsModalOpen] = useState(false);
  const [isEditing,setIsEditing] = useState(false);
  const [deletingOffer,setDeletingOffer] = useState(false);
  const [deleteOfferModal, setDeleteOfferModal] = useState({ show: false, message: '' });
  const {authRequestWithToken} = useContext(AuthContext);

  const handleTrackOffer = (offerDetails)=>{
    setTrackedOffer(offerDetails)
    setIsModalOpen(true)
  }

  const handleEditOffer = async (offerDetails)=>{
    setIsEditing(true)
    try {
      const formData = new FormData;
      formData.append("title", offerDetails.title)
      if (offerDetails.image instanceof File) {
        formData.append("image", offerDetails.image);
      }
      formData.append("status", offerDetails.status)
      formData.append("description", offerDetails.description)
      formData.append("original_price", offerDetails.original_price)
      formData.append("discount_price", offerDetails.discount_price)
      formData.append("bonus_per_referral", offerDetails.bonus_per_referral)
      formData.append("end_date", offerDetails.end_date)
      const res = await authRequestWithToken(`/offers/${trackedOffer.id}`,formData,"POST");
      if (res.success == true) {
        toast.success(res.message)
        setIsModalOpen(false)
        loadOffers()
      }else{
        toast.error("An unexpected error occured while editing offer, please try again.")
      }
    } catch (error) {
      console.log(error)
    }finally{
      setIsEditing(false)
    }
  }

  const handleDeleteOffer = async ()=>{
    setDeletingOffer(true)
    try {
      const res = await authRequestWithToken(`/offers/${trackedOffer.id}`,"","DELETE");
      if (res.success === true) {
        toast.success(res.message);
        setDeleteOfferModal({show:false})
        loadOffers()
      }else{
        toast.error("An unexpected error occured while deleting offer.")
      }
    } catch (error) {
      console.log(error)
    } finally{
      setDeletingOffer(false)
    }
  }

  const showDeleteModal = ()=>{
    setDeleteOfferModal({show:true,message:"Are you sure you want to delete this offer?"});
    setTrackedOffer(offer);
  }
  
  return (
   <>
      <div className="w-full border group overflow-hidden border-gray-300 rounded-lg p-4 shadow-lg bg-white font-sans relative">
        <img 
          src={offer.image} 
          alt={offer.title} 
          className={`w-full h-40 object-cover rounded mb-3 group-hover:scale-107 transition-all ${offer.status === "closed" ? "grayscale-[100%]" : "grayscale-0"}`}
        />

        <div className="absolute top-3 right-3 flex gap-2">
          <button className={`bg-gray-100 hover:bg-gray-200 p-2 rounded-full shadow ${offer.status === "closed" ? "cursor-not-allowed" : "cursor-pointer"}`}>
            <Edit size={16} className={`${offer.status === "closed" ? "text-black" : "text-pryClr"}`} onClick={()=> offer.status === "closed" ? toast.error("Can't edit closed offer") : handleTrackOffer(offer)}/>
          </button>
          <button className={`bg-gray-100 hover:bg-gray-200 p-2 rounded-full shadow ${offer.status === "closed" ? "cursor-not-allowed" : "cursor-pointer"}`}>
            <Trash2 size={16} className={`${offer.status === "closed" ? "text-black" : "text-red-700"}`} onClick={showDeleteModal}/>
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
      {deleteOfferModal.show && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-pryClr/90 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl border border-accClrYellow/30 transition-all duration-300 transform scale-95 hover:scale-100">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle size={24} className="text-accClrYellow" />
              <h3 className="text-xl lg:text-2xl font-semibold text-secClrWhite">Warning</h3>
            </div>
            <p className="text-base text-secClrWhite mb-6 leading-relaxed">{deleteOfferModal.message}</p>
            <div className="flex justify-between gap-3">
              <button
                className="w-full bg-accClrPink text-secClrWhite px-4 py-2 rounded-lg font-semibold text-base lg:text-lg hover:bg-accClrPink/90 transition-all duration-300 transform hover:scale-105"
                onClick={() => setDeleteOfferModal({show:false})}
              >
                No
              </button>
              <button
                className="w-full bg-accClrPink text-secClrWhite px-4 py-2 rounded-lg font-semibold text-base lg:text-lg hover:bg-accClrPink/90 transition-all duration-300 transform hover:scale-105"
                onClick={handleDeleteOffer}
              >
                {deletingOffer ? <Loader2 className="animate-spin mx-auto"/> : "Yes"}
              </button>
            </div>
          </div>
        </div>
      )}
   </>
  );
};

export default OfferCard;
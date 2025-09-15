import React, { useState } from "react";
import { X, Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useEffect } from "react";

const OfferModal = ({ onSave,isOpen,closeAction,updating,defaultOffer,isCreating }) => {
  const defaultValue = {
    image: null,
    preview: null,
    title: "",
    status: "Ongoing",
    description: "",
    original_price: "",
    discount_price:"",
    bonus_per_referral:"",
    end_date: "",
  }
  const [offerDetails, setOfferDetails] = useState(defaultValue);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOfferDetails({ ...offerDetails, [name]: value });
    console.log(offerDetails)
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setOfferDetails({
        ...offerDetails,
        image: file,
        preview: URL.createObjectURL(file),
      });
    }
    console.log(offerDetails)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isCreating && !offerDetails.preview && !offerDetails.image) {
      return toast.error("Please provide an image!");
    }
    try {
      onSave(offerDetails)
    } catch (error) {
      console.log(error)
    }finally{
      isCreating && setOfferDetails(defaultValue)
    }
  };

  const handleCancel = ()=>{
    isCreating && setOfferDetails(defaultValue)
    closeAction();
  }

  useEffect(() => {
    defaultOffer ? setOfferDetails({
      ...defaultValue,
      preview:defaultOffer.image || null, 
      image:null, 
      title:defaultOffer.title || "", 
      status:defaultOffer.status || "", 
      original_price:defaultOffer.original_price || "", 
      description:defaultOffer.description || "",
      end_date:defaultOffer.end_date || "",
      discount_price:defaultOffer.discount_price || "",
      bonus_per_referral:defaultOffer.bonus_per_referral || "",

    }) : setOfferDetails(defaultValue)
  }, [defaultOffer])
  

  return (
    !isOpen ? null : (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4 sm:px-6">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 sm:p-8 relative animate-fadeIn overflow-y-auto max-h-[95vh]">
          <button
            onClick={handleCancel}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
          >
            <X size={22} />
          </button>

          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900 text-center">
            {isCreating ? "Create New Offer" : "Edit offer"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
          >
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Image
              </label>
              <div className="flex flex-col gap-3 items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-36 sm:h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                  {offerDetails.preview ? (
                    <img
                      src={offerDetails.preview}
                      alt="Preview"
                      className="h-full object-contain rounded-md"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-500 px-2 text-center">
                      <Upload size={24} className="mb-2" />
                      <span className="text-xs sm:text-sm">
                        Click to upload or drag & drop
                      </span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    name="image"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Offer title"
                value={offerDetails.title}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-pryClr focus:outline-none text-sm sm:text-base"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={offerDetails.status}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-pryClr focus:outline-none text-sm sm:text-base"
              >
                <option value="ongoing">Ongoing</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Write a short description"
                value={offerDetails.description}
                onChange={handleChange}
                rows={3}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-pryClr focus:outline-none text-sm sm:text-base"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="number"
                name="original_price"
                placeholder="Price"
                value={offerDetails.original_price}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-pryClr focus:outline-none text-sm sm:text-base"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount Price
              </label>
              <input
                type="number"
                name="discount_price"
                placeholder="Discounted Price"
                value={offerDetails.discount_price}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-pryClr focus:outline-none text-sm sm:text-base"
                // required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bonus per referral
              </label>
              <input
                type="number"
                name="bonus_per_referral"
                placeholder="Referral bonus"
                value={offerDetails.bonus_per_referral}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-pryClr focus:outline-none text-sm sm:text-base"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                name="end_date"
                value={offerDetails.end_date}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-pryClr focus:outline-none text-sm sm:text-base"
                required
              />
            </div>

            <div className="md:col-span-2 flex flex-col sm:flex-row justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-pryClr flex items-center justify-center gap-2 text-white font-semibold hover:bg-pryClr/90 cursor-pointer transition text-sm sm:text-base"
              >
                {updating ? (
                  <>
                    <span>{isCreating ? "Creating Offer" : "Saving changes"}</span> <Loader2 className="animate-spin"/>
                  </>
                ) : (
                  <span>{isCreating ? "Create Offer" : "Save Changes"}</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default OfferModal;
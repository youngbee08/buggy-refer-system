import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const OfferCard = ({ image, title, status, description, price, date, clicks, sales }) => {
  return (
    <div className="border group overflow-hidden border-gray-300 rounded-lg p-4 max-w-xs shadow-lg bg-white font-sans relative">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-40 object-cover rounded mb-3 group-hover:scale-107 transition-all"
      />

      <div className="absolute top-3 right-3 flex gap-2">
        <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full shadow cursor-pointer">
          <Edit size={16} className="text-pryClr" />
        </button>
        <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full shadow cursor-pointer">
          <Trash2 size={16} className="text-red-600" />
        </button>
      </div>

      <h2 className="text-lg font-semibold mb-2 text-gray-800">
        {title}
      </h2>
      <div className="flex gap-1 flex-wrap">
        <p className="text-sm text-gray-600 my-1">
          <strong className="font-bold">Status:</strong> {status}
        </p>
        <p className="text-sm text-gray-600 my-1">
          <strong className="font-bold">Description:</strong> {description}
        </p>
        <p className="text-sm text-gray-600 my-1">
          <strong className="font-bold">Price:</strong> ${price.toFixed(2)}
        </p>
        <p className="text-sm text-gray-600 my-1">
          <strong className="font-bold">Date:</strong> {date}
        </p>
        <p className="text-sm text-gray-600 my-1">
          <strong className="font-bold">Clicks:</strong> {clicks}
        </p>
        <p className="text-sm text-gray-600 my-1">
          <strong className="font-bold">Sales:</strong> {sales}
        </p>
      </div>
    </div>
  );
};

export default OfferCard;
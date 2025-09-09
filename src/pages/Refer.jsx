import React, { useState } from 'react';
import Ongoing from './subpage/Ongoing';
import Closed from './subpage/Closed';

const Refer = () => {
  const [activeTab, setActiveTab] = useState('ongoing');

  return (
    <div className="lg:p-6 rounded-lg mx-auto bg-transparent">
      <div className="flex gap-4 mb-6 rounded-xl  border border-pryClr shadow-md">
        <button
          className={`flex-1 py-3 px-4 text-base lg:text-lg font-semibold rounded-lg transition-all duration-300 ${
            activeTab === 'ongoing'
              ? 'bg-pryClr text-white shadow-md'
              : 'text-secClrBlack hover:bg-pryClr/50'
          }`}
          onClick={() => setActiveTab('ongoing')}
        >
          Ongoing Offer
        </button>
        <button
          className={`flex-1 py-3 px-4 text-base lg:text-lg font-semibold rounded-lg transition-all duration-300 ${
            activeTab === 'closed'
              ? 'bg-pryClr text-white shadow-md'
              : 'text-secClrBlack hover:bg-pryClr/50'
          }`}
          onClick={() => setActiveTab('closed')}
        >
          Closed Offer
        </button>
      </div>

      <div className="animate-fade-in">
        {activeTab === 'ongoing' && <Ongoing />}
        {activeTab === 'closed' && <Closed />}
      </div>
    </div>
  );
};

export default Refer;
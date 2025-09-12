import React from 'react'
import { Wallet, MousePointerClick, CheckCircle, Users } from "lucide-react";


const AdminDashboard = () => {
  return (
    <div className="space-y-6">
  <p className="text-secClrBlack capitalize text-2xl font-semibold tracking-wide">
    Overview
  </p>

  <div className="flex gap-6 md:flex-row md:gap-8 flex-wrap">
    {/* All Users */}
    <div className="flex-1 bg-gradient-to-br from-pryClr to-pryClr/80 rounded-2xl p-6 flex flex-col lg:items-center md:items-start justify-center shadow-lg hover:shadow-xl transition">
      <div className="flex items-center gap-3">
        <Users className="w-7 h-7 text-accClrYellow" />
        <p className="text-sm lg:text-lg font-medium text-secClrWhite capitalize">
          All Users
        </p>
      </div>
      <h2 className="text-3xl lg:text-4xl font-extrabold mt-3 text-accClrYellow">
        1200
      </h2>
    </div>

    {/* Total Clicked */}
    <div className="flex-1 bg-gradient-to-br from-pryClr to-pryClr/80 rounded-2xl p-6 flex flex-col lg:items-center md:items-start justify-center shadow-lg hover:shadow-xl transition">
      <div className="flex items-center gap-3">
        <MousePointerClick className="w-7 h-7 text-secClrWhite" />
        <p className="text-sm lg:text-lg font-medium text-secClrWhite capitalize">
          Total Clicked
        </p>
      </div>
      <h2 className="text-3xl lg:text-4xl font-extrabold mt-3 text-secClrWhite">
        3500
      </h2>
    </div>

    {/* Total Completed */}
    <div className="flex-1 bg-gradient-to-br from-pryClr to-pryClr/80 rounded-2xl p-6 flex flex-col lg:items-center md:items-start justify-center shadow-lg hover:shadow-xl transition">
      <div className="flex items-center gap-3">
        <CheckCircle className="w-7 h-7 text-green-400" />
        <p className="text-sm lg:text-lg font-medium text-secClrWhite capitalize">
          Total Completed
        </p>
      </div>
      <h2 className="text-3xl lg:text-4xl font-extrabold mt-3 text-secClrWhite">
        980
      </h2>
    </div>

    {/* Amount Distributed */}
    <div className="flex-1 bg-gradient-to-br from-pryClr to-pryClr/80 rounded-2xl p-6 flex flex-col lg:items-center md:items-start justify-center shadow-lg hover:shadow-xl transition">
      <div className="flex items-center gap-3">
        <Wallet className="w-7 h-7 text-accClrYellow" />
        <p className="text-sm lg:text-lg font-medium text-secClrWhite capitalize">
          Amount Distributed
        </p>
      </div>
      <h2 className="text-3xl lg:text-4xl font-extrabold mt-3 text-accClrYellow">
        $12,500
      </h2>
    </div>
  </div>
</div>

  )
}

export default AdminDashboard
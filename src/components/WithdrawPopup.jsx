import React from 'react'

const WithdrawPopup = () => {
  return (
    <div className='w-1/4 mx-auto translate-y-[-10rem] bg-secClrWhite p-4 rounded-[7px] flex flex-col gap-5'>
      <h3>Enter your 4-digit PIN</h3>
      <div className="flex flex-col gap-5 items-center">
        {
          [Array[4]].map((_,index)=>(
            <p key={index}>hi</p>
          ))
        }
      </div>
    </div>
  )
}

export default WithdrawPopup
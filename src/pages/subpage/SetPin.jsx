import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SetupPin = () => {
  const navigate = useNavigate();
  const [pin, setPin] = useState('')
  const numbers = [1,2,3,4,5,6,7,8,9,0]

  const handleNumberClick = (num) => {
    if (pin.length < 4) setPin(pin + num)
  }

  const handleBackspace = () => {
    setPin(pin.slice(0, -1))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (pin.length === 4) {
      console.log("PIN set to:", pin)
      navigate("/dashboard")
      // handle next action here
    }
  }

  return (
    <div className={`lbg-cover h-[100vh] w-full flex justify-center items-center lg:bg-black`} style={{
      backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url(${window.innerWidth >= 1000 ? '' : '../../../public/signup-logo.png'})`, backgroundRepeat:"no-repeat", backgroundPosition:"center", backgroundSize:"cover"
    }}>
      <form onSubmit={handleSubmit} className='lg:bg-pryClr w-[90%] lg:w-[40%] rounded-[10px] m-6 pt-6 pb-9 lg:shadow-[3px_3px_14px_#796fab] flex flex-col gap-6 items-center'>
        <div className="flex flex-col gap-4 items-center w-full">
          <h2 className='text-4xl lg:text-5xl text-secClrWhite font-bold'>Set up your pin</h2>
          <p className='text-accClrYellow text-base lg:text-[18px] font-[400] text-center'>Create a unique memorable pin for seamless transactions</p>
        </div>

        <div className="flex items-center gap-3 justify-center my-4">
          {[0,1,2,3].map((i) => (
            <div key={i} className="bg-[#c7c8c8] h-[3rem] w-[3rem] rounded flex items-center justify-center text-xl font-bold">
              {pin[i] ? '•' : ''}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 w-[80%] lg:w-[60%]">
          {numbers.map((num, idx) => (
            <button type="button" key={idx} onClick={() => handleNumberClick(num)} className="bg-[#dbdcdc] py-3 rounded text-xl font-bold text-secClrBlack">
              {num}
            </button>
          ))}
          <button type="button" onClick={handleBackspace} className="bg-[#dbdcdc] py-3 rounded text-xl font-bold text-secClrBlack">
            ⌫
          </button>
          <button type="submit" className="bg-accClrYellow py-3 rounded text-xl font-bold text-black col-span-2">
            OK
          </button>
        </div>
      </form>
    </div>
  )
}

export default SetupPin

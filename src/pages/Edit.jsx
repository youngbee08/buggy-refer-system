import React from 'react'
import assets from '../assets/assests'
import { Link } from 'react-router-dom'

const Edit = 
({fields,image,formSubject,formText,btnText,formAction,direction,disabled}) => {
  const flexDirection = direction[0] === "Sign Up" ? 'lg:flex-row-reverse' : 'lg:flex-row';
  return (
    <div className="relative lg:h-screen min-h-screen w-full flex items-center justify-center lg:bg-gray-100 lg:p-6 lg:flex-row flex-col" style={{
      backgroundImage: `${window.innerWidth <= 991 && 'linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.9))'}, url(${window.innerWidth <= 991 && image})`,
      backgroundPosition:"center",
      backgroundSize:"cover"
      }}>

      <div className={`w-full lg:max-w-[80rem] lg:bg-white rounded-2xl lg:shadow-2xl flex justify-between overflow-hidden h-full ${flexDirection} flex-col`}>
        {/* Left Section (Background image + gradient overlay) */}
        <div 
          className={`hidden w-[40%] lg:flex flex-col items-center justify-center text-white p-10 relative`}
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${image})`,
            backgroundSize: "cover",
            backgroundPosition:"center"
          }}
        >
          <img src={assets.logo} alt="logo" className="w-38 mb-6 absolute top-[2rem] left-[2rem]"/>
          <h2 className="text-4xl font-extrabold mb-4 text-center">{direction[0] === "Sign Up" ? "Hello, Friend!" : "Welcome Back!"}</h2>
          <p className="text-lg text-gray-200 text-center font-medium mb-6">{formText}</p>
          <Link to={direction[1]} className="px-8 py-3 bg-white text-indigo-700 font-semibold rounded-[10px] shadow hover:bg-gray-200 transition">{direction[0]}</Link>
        </div>

        {/* Right Section (Form) */}
        <form onSubmit={formAction} className={`lg:w-[55%] flex flex-col gap-6 p-5 lg:p-12 lg:justify-center`}>
          <div className={`flex flex-col gap-2 text-center`}>
            <h2 className="text-3xl lg:text-4xl font-bold text-white lg:text-gray-800">{formSubject}</h2>
          </div>

          <div className="flex flex-col gap-4">
            {fields?.map((field,key)=>(
              <div className="relative" key={key}>
                <input 
                  type={field.type} 
                  placeholder={field.placeholder} 
                  className="w-full border border-gray-300 rounded-xl py-3 px-4 lg:bg-none bg-white text-gray-800 text-base focus:ring-2 focus:ring-indigo-500 focus:outline-none" 
                  required 
                  onChange={field.onChange}
                />
                <div className="absolute right-3 top-3 text-gray-400">
                  <field.icon size={22}/>
                </div>
              </div>
            ))}

            <button disabled={disabled} className="w-full py-3 bg-pryClr hover:bg-[#3d346c] transition-all text-white rounded-xl font-semibold text-lg cursor-pointer">
              {btnText}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Edit
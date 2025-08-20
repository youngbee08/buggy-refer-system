import React from 'react'
import assets from '../../assets/assests'
import { Link } from 'react-router-dom'

const Edit = ({image,fields,formSubject,formText,otherActions,btnText,formAction,bg,otherTextcol,refCol,imgWid,smBg}) => {
  return (
    <div className={`overflowy-y-hidden lg:overflow-y-auto bg-[url(${smBg})] lg:bg-[url()]  bg-cover lg:bg-${bg} h-[100vh] w-full flex justify-between text-secClrWhite items-center`} style={{
    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url(${window.innerWidth >= 1024 ? bg : smBg})`
    }}>
      <div className="w-[60%] lg:flex flex-col h-full relative hidden">
        <img src={assets.logo2} alt="logo" className='absolute top-[2rem] w-1/3 left-[2rem]'/>
        <img src={image} alt="signup img" className={`w-[${imgWid}] h-[100%] object-cover`} />
        <div className={`flex flex-col absolute ${btnText === "login" ? "bottom-[10rem] left-[15rem]" : "bottom-[12rem] left-[10rem]"} text-[4rem] text-center font-bold text-shadow-[8px_8px_1px_#796fab] rotate-[-5deg] text-${refCol}`} style={{lineHeight:"2.5rem"}}>
          <h2>Refer</h2>
          <h2 className='text-[#e5aa2d] text-shadow-2xs'>&</h2>
          <h2 style={{lineHeight:"1rem"}}>Earn</h2>
        </div>
      </div>
      <form onSubmit={formAction} className='lg:bg-pryClr w-full lg:w-[40%] rounded-[10px] m-6 pt-6 pb-9 lg:shadow-[3px_3px_14px_#796fab] flex flex-col lg:h-fit lg:relative gap-6 items-center'>
        <div className="flex flex-col gap-4 items-center w-full">
          <h2 className='text-4xl lg:text-5xl text-secClrWhite font-bold'>{formSubject}</h2>
          <p className='text-accClrYellow text-base lg:text-[18px] font-[400]'>{formText}</p>
        </div>
        <div className="flex flex-col gap-6 w-full lg:w-[80%]">
          {
            fields?.map((field,key)=>(
              <div className="flex items-center justify-center relative" key={key}>
                <div className={`absolute ${field.labelPosition}-[-.5rem] bg-accClrYellow rounded-full text-black text-center p-[.7rem] lg:p-[1rem] font-medium`}>
                  <field.icon size={30}/>
                </div>
                <input type={`${field.type}`} placeholder={`${field.placeholder}`} className={`w-[90%] bg-secClrWhite rounded-full py-3 ${field.labelPosition === "right" ? "px-3" : "px-[3.3rem] lg:px-[4rem]"} text-black text-base font-bold outline-0 w-full`} required/>
              </div>
            ))
          }
          <button className='w-full p-2 bg-secClrWhite rounded-full font-bold text-xl lg:text-[24px] cursor-pointer text-black'>{btnText}</button>
          <h3 className={`lg:absolute bottom-[-2rem] text-${otherTextcol} text-center w-[89%] text-base lg:text-xl font-semibold`}>{otherActions[0]} <Link to={`/${otherActions[1].toLowerCase()}`} className='text-blue-800 hover:underline'>{otherActions[1]}</Link></h3>
        </div>
      </form>
    </div>
  )
}

export default Edit
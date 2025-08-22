import React from 'react'
import Edit from './Edit'
import { LockKeyholeIcon, Mail, User, UserPenIcon } from 'lucide-react'
import assets from '../assets/assests'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate()
  const fields = [
    {
      placeholder:"Fullname",
      labelPosition:"left",
      icon:UserPenIcon,
      type:"text"
    },
    {
      placeholder:"Email",
      labelPosition:"right",
      icon:Mail,
      type:"email"
    },
    {
      placeholder:"Username",
      labelPosition:"left",
      icon:User,
      type:"text"
    },
    {
      placeholder:"Password",
      labelPosition:"right",
      icon:LockKeyholeIcon,
      type:"password"
    },
  ]
  const handleSubmit = (e)=>{
    e.preventDefault()
    navigate("/setup-pin")
  };
  return (
    <>
      <Edit image={assets.signUp} fields={fields} formSubject={"user registration"} formText={"lets Start this journey and make money"} otherActions={["Already have an account?","Login","login"]} btnText={"Register"} formAction={handleSubmit} bg={"black"} imgWid={"90%"} smBg={"../../../public/signup-logo.png"}/>
    </>
  )
}

export default Signup

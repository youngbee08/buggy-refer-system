import React from 'react'
import Form from '../components/nav/form'
import { LockKeyholeIcon, Mail, User, UserPenIcon } from 'lucide-react'
import assets from '../assets/assests'

const Signup = () => {
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
  return (
    <>
      <Form image={assets.signUp} fields={fields} formSubject={"user registration"} formText={"lets Start this journey and make money"} otherActions={["Already have an account?","Login"]} btnText={"Register"} formAction={()=>alert("Signed Up successfully")} bg={"black"} imgWid={"70%"} smBg={"../../../public/signup-logo.png"}/>
    </>
  )
}

export default Signup

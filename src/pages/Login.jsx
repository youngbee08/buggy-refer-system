import React from 'react'
import Form from '../components/nav/form'
import { LockKeyholeIcon, User } from 'lucide-react'
import assets from '../assets/assests'

const Login = () => {
  const fields = [
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
      <Form image={assets.login} fields={fields} formSubject={"user login"} formText={"Welcome Back Champ 🍾🥂🏆"} otherActions={["Dont have an Account?","Register"]} btnText={"login"} formAction={()=>alert("Signed In successfully")} bg={"white"} otherTextcol={"black"} refCol={"black"} imgWid={"80%"} smBg={"../../../public/login.png"}/>
    </>
  )
}

export default Login

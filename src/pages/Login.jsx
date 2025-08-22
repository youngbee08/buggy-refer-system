import React from 'react'
import Edit from './Edit'
import { LockKeyholeIcon, User } from 'lucide-react'
import assets from '../assets/assests'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
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
  const handleSubmit = (e)=>{
    e.preventDefault()
    navigate("/dashboard")
  };
  return (
    <>
      <Edit image={assets.login} fields={fields} formSubject="user login" formText="Welcome Back Champ 🍾🥂🏆" otherActions={["Dont have an Account?", "Register", ""]} btnText={"login"} formAction={handleSubmit} bg="white" otherTextcol="black" refCol="black" imgWid={"90%"} smBg={"../../../public/login.png"}/>
    </>
  )
}

export default Login

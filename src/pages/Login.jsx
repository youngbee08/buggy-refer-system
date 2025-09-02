import React, { useContext, useState } from "react"; // Added useState import
import Edit from "./Edit";
import { LockKeyholeIcon, User } from "lucide-react";
import assets from "../assets/assests";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AuthContext } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const {setUser,isAuthenticated} = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Uncommented
  const [error, setError] = useState(""); // Uncommented

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // API call with proper error handling
  const loginUser = async (userData) => {
    const response = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Fixed typo: was "content-Type"
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    return response.json();
  };

  const fields = [
    {
      placeholder: "Username",
      labelPosition: "left",
      icon: User,
      type: "text",
      name: "username",
      value: formData.username,
      onChange: (e) => setFormData({...formData, username: e.target.value}), // Fixed: onchange -> onChange, terget -> target
    },
    {
      placeholder: "Password",
      labelPosition: "right",
      icon: LockKeyholeIcon,
      type: "password",
      name: "password",
      value: formData.password,
      onChange: (e) => setFormData({...formData, password: e.target.value}), // Fixed: onchange -> onChange
    },
  ];

  const handleSubmit = async (e) => { // Made async to handle API call
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validate form data
      if (!formData.username || !formData.password) {
        throw new Error("Please fill in all fields");
      }

      // Prepare data for API
      const userData = {
        username: formData.username,
        password: formData.password,
      };

      // Call API
      const result = await loginUser(userData);

      // Handle success
      toast.success(result.message)

      // Store user data or token if needed
      if (result.token) {
        localStorage.setItem("authToken", result.token);
      }
      if (result.user) {
        localStorage.setItem("userData", JSON.stringify(result.user));
      }

      const user = JSON.parse(localStorage.getItem("userData"));

      user && setUser(user)
      console.log(isAuthenticated)
      // Navigate to dashboard
      navigate("/dashboard");

    } catch (err) {
      console.error("Login error:", err);
      setError(err.message);
      toast.error(error || err.message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Edit
        image={assets.login}
        fields={fields}
        formSubject="user login"
        formText="Welcome Back Champ 🍾🥂🏆"
        otherActions={["Dont have an Account?", "Register", ""]}
        btnText={loading ? "Logging in..." : "Login"} // Dynamic button text
        formAction={handleSubmit}
        bg="white"
        otherTextcol="black"
        refCol="black"
        imgWid={"90%"}
        smBg={"../../../public/login.png"}
        disabled={loading} // Disable button while loading
      />
    </>
  );
};

export default Login;
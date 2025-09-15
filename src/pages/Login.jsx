import React, { useContext, useState } from "react"; // Added useState import
import Edit from "./Edit";
import { LockKeyholeIcon, User } from "lucide-react";
import assets from "../assets/assests";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AuthContext } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const {setUser,getUserDetails} = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Uncommented
  const [error, setError] = useState(""); // Uncommented

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const loginUser = async (userData) => {
    const response = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
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
      const currentUser = getUserDetails();
      if (currentUser.role === "user") {
        if (currentUser.transaction_pin === null) {
          navigate("/setup-pin")
        }else{
          navigate("/dashboard");
        }
      }else{
        navigate("/dashboard");
      }

    } catch (err) {
      console.error("Login error:", err);
      setError(err.message);
      toast.error(error || err.message)
      if (err.message === `Failed to fetch`) {
        toast.error('An unexpected error occured while logging in, please try again')
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Edit
        image={assets.login2}
        fields={fields}
        formSubject="User Login"
        formText="lets Start this journey and make money"
        direction={["Sign Up","/"]}
        btnText={loading ? "Logging in..." : "Login"} // Dynamic button text
        formAction={handleSubmit}
        disabled={loading} // Disable button while loading
        otherOption="Don't have an account?"
      />
    </>
  );
};

export default Login;
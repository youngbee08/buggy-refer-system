import React, { useState } from "react"; // Added useState import
import Edit from "./Edit";
import { LockKeyholeIcon, User } from "lucide-react";
import assets from "../assets/assests";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Uncommented
  const [error, setError] = useState(""); // Uncommented

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // API call with proper error handling
  const loginUser = async (userData) => {
    try {
      const response = await fetch(`https://referral.buggybillions.com.ng/public/api/login`, {
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
    } catch (error) {
      throw error;
    }
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
      console.log("Login successful:", result);

      // Store user data or token if needed
      if (result.token) {
        localStorage.setItem("authToken", result.token);
      }
      if (result.user) {
        localStorage.setItem("userData", JSON.stringify(result.user));
      }

      // Navigate to dashboard
      navigate("/dashboard");

    } catch (error) {
      console.error("Login error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Error display */}
      {error && (
        <div style={{
          color: 'red',
          padding: '10px',
          marginBottom: '10px',
          textAlign: 'center',
          backgroundColor: '#fee',
          border: '1px solid #fcc',
          borderRadius: '4px'
        }}>
          {error}
        </div>
      )}

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
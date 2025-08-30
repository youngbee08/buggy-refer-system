import React, { useState } from "react";
import Edit from "./Edit";
import { LockKeyholeIcon, Mail, User, UserPenIcon } from "lucide-react";
import assets from "../assets/assests";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_BASE_URL

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // form state
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    username: "",
    password: "",
  });

  // function to call API
  const registerUser = async (userData) => {
    const response = await fetch(`https://referral.buggybillions.com.ng/public/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    return response.json();
  };

  // fields config
  const fields = [
    {
      placeholder: "Fullname",
      labelPosition: "left",
      icon: UserPenIcon,
      type: "text",
      name: "fullname",
      value: formData.full_name,
      onChange: (e) => setFormData({ ...formData, full_name: e.target.value }),
    },
    {
      placeholder: "Email",
      labelPosition: "right",
      icon: Mail,
      type: "email",
      name: "email",
      value: formData.email,
      onChange: (e) => setFormData({ ...formData, email: e.target.value }),
    },
    {
      placeholder: "Username",
      labelPosition: "left",
      icon: User,
      type: "text",
      name: "username",
      value: formData.username,
      onChange: (e) => setFormData({ ...formData, username: e.target.value }),
    },
    {
      placeholder: "Password",
      labelPosition: "right",
      icon: LockKeyholeIcon,
      type: "password",
      name: "password",
      value: formData.password,
      onChange: (e) => setFormData({ ...formData, password: e.target.value }),
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // validation
      if (!formData.full_name || !formData.email || !formData.username || !formData.password) {
        throw new Error("Please fill in all fields");
      }

      if (formData.password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }

      // match backend field names
      // const userData = {
      //   full_name: formData.full_name,
      //   email: formData.email,
      //   username: formData.username,
      //   password: formData.password,
      // };

      const result = await registerUser(formData);

      // store token/user if available
      if (result.token) localStorage.setItem("authToken", result.token);
      if (result.user) localStorage.setItem("userData", JSON.stringify(result.user));

      // navigate to next page
      navigate("/setup-pin");
    } catch (err) {
      setError(err.message);
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && (
        <div
          style={{
            color: "red",
            padding: "10px",
            marginBottom: "10px",
            textAlign: "center",
            backgroundColor: "#fee",
            border: "1px solid #fcc",
            borderRadius: "4px",
          }}
        >
          {error}
        </div>
      )}

      <Edit
        image={assets.signUp}
        fields={fields}
        formSubject={"user registration"}
        formText={"lets Start this journey and make money"}
        otherActions={["Already have an account?", "Login", "login"]}
        btnText={loading ? "Registering..." : "Register"}
        formAction={handleSubmit}
        bg={"black"}
        imgWid={"90%"}
        smBg={"../../../public/signup-logo.png"}
        disabled={loading}
      />
    </>
  );
};

export default Signup;

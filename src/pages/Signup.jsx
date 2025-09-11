import React, { useState } from "react";
import Edit from "./Edit";
import { LockKeyholeIcon, Mail, User, UserPenIcon } from "lucide-react";
import assets from "../assets/assests";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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
    const response = await fetch(`${API_URL}/api/register`, {
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

      if (formData.password.length < 8) {
        throw new Error("Password must be at least 6 characters long");
      }

      const result = await registerUser(formData);

      // store token/user if available
      if (result.token) localStorage.setItem("authToken", result.token);
      if (result.user) localStorage.setItem("userData", JSON.stringify(result.user));

      // navigate to next page
      navigate("/setup-pin");
      toast.success(result.message)
    } catch (err) {
      setError(err.message);
      console.error("Registration error:", err);
      toast.error(error)
      if (err.message === `Failed to fetch`) {
        toast.error('An unexpected error occured while signing up, please try again')
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Edit
        image={assets.signUp2}
        fields={fields}
        formSubject={"User Registration"}
        formText={"To keep connected with us please login with your personal info"}
        direction={["Log in","/login"]}
        btnText={loading ? "Registering..." : "Register"}
        formAction={handleSubmit}
        disabled={loading}
        otherOption="Already have an account?"
      />
    </>
  );
};

export default Signup;

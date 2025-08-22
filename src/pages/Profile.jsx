import React, { useState } from "react";
import assets from "../assets/assests";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showBankForm, setShowBankForm] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  const [profile, setProfile] = useState({
    username: "Musiliu",
    email: "musiliu@example.com",
    phone: "07012345678",
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full space-y-6 mb-20">
     
      <div className="flex flex-col items-center">
        <img
          src={assets.profile}
          alt="Profile"
          className="w-34 h-34 rounded-full object-cover border-2 border-accClrYellow"
        />
      </div>

      
      <div className="bg-white shadow-md p-4 rounded-lg space-y-4">
        <div>
          <label className="block text-sm font-semibold">Username</label>
          <input
            type="text"
            name="username"
            value={profile.username}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full p-2 border rounded ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full p-2 border rounded ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Phone</label>
          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full p-2 border rounded ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>

        
        <button
          onClick={handleEditToggle}
          className="mt-4 bg-pryClr text-white px-4 py-2 rounded"
        >
          {isEditing ? "Save" : "Edit Profile"}
        </button>
      </div>

      
      <div className="bg-white shadow-md p-4 rounded-lg">
        <button
          onClick={() => setShowBankForm(!showBankForm)}
          className="w-full flex justify-between items-center font-semibold text-pryClr"
        >
          Bank Upload
          <span>{showBankForm ? "▲" : "▼"}</span>
        </button>

        {showBankForm && (
          <form action="
          ">
            <div className="mt-4 space-y-4">
            <input
              type="text"
              placeholder="Bank Name" required
              className="w-full p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Account Number" required
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Account Name" required
              className="w-full p-2 border rounded"
            />
            <button type="submit" className="bg-pryClr text-white px-4 py-2 rounded">
              Save Bank Details
            </button>
          </div>
          </form>
        )}
      </div>

     
      <div className="bg-white shadow-md p-4 rounded-lg">
        <button
          onClick={() => setShowResetPassword(!showResetPassword)}
          className="w-full flex justify-between items-center font-semibold text-pryClr"
        >
          Reset Password
          <span>{showResetPassword ? "▲" : "▼"}</span>
        </button>

        {showResetPassword && (
          <form action="">
            <div className="mt-4 space-y-4">
            <input
              type="password"
              placeholder="Current Password" required
              className="w-full p-2 border rounded"
            />
            <input
              type="password"
              placeholder="New Password" required
              className="w-full p-2 border rounded"
            />
            <input
              type="password"
              placeholder="Confirm New Password" required
              className="w-full p-2 border rounded"
            />
            <button type="submit" className="bg-pryClr text-white px-4 py-2 rounded">
              Update Password
            </button>
          </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;

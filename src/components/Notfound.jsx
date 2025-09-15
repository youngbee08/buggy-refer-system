import React from "react";
import assets from "../assets/assests";
import { Link } from "react-router-dom";

const Notfound = ({ title, message, isLost }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      {isLost && (
        <div className="flex flex-col items-center mb-6">
          <img
            src={assets.logo2}
            alt="Site Logo"
            className="w-40 h-20 object-contain mb-3"
          />
        </div>
      )}

      <img
        src={assets.notFound}
        alt="Not Found"
        className="w-64 max-w-full mb-6 lg:drop-shadow-none drop-shadow-md"
      />

      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2">
        {title || "Page Not Found"}
      </h2>
      <p className="text-gray-500 mb-6 max-w-md">
        {message || "Sorry, the page you’re looking for doesn’t exist or has been moved."}
      </p>

      {isLost && (
        <Link
          to="/login"
          className="px-6 py-2 rounded-lg bg-pryClr text-white font-medium hover:bg-pryClr/90 transition"
        >
          Go Home
        </Link>
      )}
    </div>
  );
};

export default Notfound;
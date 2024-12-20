import React, { useState } from "react";
import { useAuth } from "../../utils/AuthContext"; 
import { useNavigate } from "react-router-dom"; 

const DropdownMenu = ({ handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { username } = useAuth(); 
  const navigate = useNavigate(); 

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleEditProfile = () => {
    navigate("/AccountSetting"); 
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="bg-gradient-to-r from-primary to-secondary hover:bg-bg-gradient-to-r hover:from-secondary hover:bg-primary transition-all duration-600 text-blue px-3 py-1 rounded-full"
      >
        Hello, {username || "User"}!
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
          <button
            onClick={handleEditProfile}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
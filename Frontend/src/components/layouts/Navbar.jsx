import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { getInitials } from "../../utils/helper.js";
import { LuSparkles } from "react-icons/lu"; // Ensure you have this icon installed
const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  return (
    user && (
      <div className="w-full bg-white shadow-md px-6 py-3 flex justify-between items-center">
        {/* Logo on the left */}

<div className="flex items-center space-x-2">
  {/* Icon Box */}
  <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
    <LuSparkles className="text-white text-lg" />
  </div>

  {/* Text Logo */}
  <div className="text-xl font-bold text-amber-600 select-none">
    UpskillMe <span className="text-gray-900">AI</span>
  </div>
</div>

        {/* Profile section on the right */}
        <div className="flex items-center space-x-4">
          <div className="w-11 h-11 rounded-full bg-amber-500 text-white font-semibold text-lg flex items-center justify-center uppercase">
            {getInitials(user?.name || "")}
          </div>

          <div className="text-right">
            <div className="text-[15px] text-black font-semibold leading-tight">
              {user?.name || ""}
            </div>
            <button
              className="text-amber-600 text-sm font-medium hover:underline transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ProfileInfoCard;

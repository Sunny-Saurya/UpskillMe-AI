// import React, { useContext } from "react";
// import { UserContext } from "../../context/userContext";
// import { useNavigate } from "react-router-dom";


// const ProfileInfoCard = () =>{
//     const {user, clearUser} = useContext(UserContext);

//     const navigate = useNavigate();

//     const handleLogout = () =>{
//         localStorage.clear();
//         clearUser();
//         navigate("/");
//     };

//     return (
//         user && (
//         <div className="flex items-center">
//             <img
//   src={user?.profileImageUrl || "/default-profile.png"}
//   alt="Profile"
//   className="w-11 h-11 bg-gray-300 rounded-full mr-3"
// />


//             <div>
//                 <div className="text-[15px] text-black font-bold leading-3">
//   {user?.name || ""}
// </div>


//                 <button className="text-amber-600 text-sm font-semibold cursor-pointer hover:underline" onClick={handleLogout}>Logout</button>
//             </div>
//         </div>
//     )
// )
// }


// export default ProfileInfoCard;


import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { getInitials } from "../../utils/helper.js"; // Make sure this is defined

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
      <div className="flex items-center">
        {/* Initials Circle */}
        <div className="w-11 h-11 rounded-full bg-gray-300 text-black font-bold flex items-center justify-center mr-3 uppercase">
          {initial(user?.name || "")}
        </div>

        <div>
          <div className="text-[15px] text-black font-bold leading-3">
            {user?.name || ""}
          </div>

          <button
            className="text-amber-600 text-sm font-semibold cursor-pointer hover:underline"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    )
  );
};

export default ProfileInfoCard;

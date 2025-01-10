import { useNavigate, useLocation } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io"; // Add icon
import { LuLogOut } from "react-icons/lu"; // Logout icon
import { logoutUser } from "../store/userSlice";
import { useDispatch } from "react-redux";
export default function Header() {
  const navigate = useNavigate();
  const location = useLocation(); 
  const dispatch = useDispatch();

  return (
    <div className="flex justify-between items-center p-4 bg-[#093545]">
      {/* Left Section - My Movies and Add Button */}
      <div className="flex items-center space-x-1 ml-4">
        {/* My Movies */}
        <h2
          className="text-xl font-bold text-white cursor-pointer"
          onClick={() => navigate("/movies")}
        >
          My movies
        </h2>
        {/* Conditionally render the "Add" button if not on the MovieForm page */}
        {location.pathname !== "/movie/new" && !location.pathname.includes("/movie/") && (
          <button onClick={() => navigate("/movie/new")} className="p-1">
           <IoIosAddCircleOutline size={24} className="text-white" />
          </button>
        )}

      </div>

      {/* Right Section - Logout */}
      <div className="flex items-center space-x-2 mr-4 cursor-pointer" onClick={() => {
        console.log("Logout")
        dispatch(logoutUser());
        } }>
        {/* Logout Text */}
        <span className="text-white">Logout</span>
        {/* Logout Icon */}
        <LuLogOut size={20} className="text-white" />
      </div>
    </div>
  );
}


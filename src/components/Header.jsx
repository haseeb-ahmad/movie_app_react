import { useNavigate, useLocation } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
import { LuLogOut } from "react-icons/lu"; 
import { logoutUser } from "../store/userSlice";
import { useDispatch } from "react-redux";
export default function Header() {
  const navigate = useNavigate();
  const location = useLocation(); 
  const dispatch = useDispatch();

  return (
    <div className="flex justify-between items-center p-4 bg-[#093545]">
      <div className="flex items-center space-x-1 ml-4">
        <h2
          className="text-xl font-bold text-white cursor-pointer"
          onClick={() => navigate("/movies")}
        >
          My movies
        </h2>
        {location.pathname !== "/movie/new" && !location.pathname.includes("/movie/") && (
          <button onClick={() => navigate("/movie/new")} className="p-1">
           <IoIosAddCircleOutline size={24} className="text-white" />
          </button>
        )}
      </div>
      <div className="flex items-center space-x-2 mr-4 cursor-pointer" onClick={() => {
        dispatch(logoutUser());
        } }>
        <span className="text-white">Logout</span>
        <LuLogOut size={20} className="text-white" />
      </div>
    </div>
  );
}


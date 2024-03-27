/* eslint-disable react/prop-types */

import { logout } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { apiService } from "../api/apiService";
import { useNavigate } from "react-router-dom";

function LogoutBtn({ className = "" }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiService.post("/api/auth/logout");
      dispatch(logout());
      navigate("/login")
    } catch (error) {
      
      if (error.response.status == 401) {
        const response = await apiService.post("/api/auth/logout");
        console.log(response.data);
        dispatch(logout());
        navigate("/login")
      }
      console.log(JSON.parse(error.request.response).message);
    }
  };
  return (
    <>
      <button
        className={`text-md text-[18px] py-2 text-[#ffffff] ${className}`}
        onClick={handleLogout}
      >
        Logout
      </button>
    </>
  );
}

export default LogoutBtn;

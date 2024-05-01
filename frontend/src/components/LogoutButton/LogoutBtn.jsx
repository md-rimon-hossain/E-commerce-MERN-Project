/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../../store/authSlice";
import { apiService } from "../../api/apiService";

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
        className={`text-sm w-full transform text-left rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 font-medium ${className}`}
        onClick={handleLogout}
      >
        <LogOut className="inline-block mr-2" />
        Logout
      </button>
    </>
  );
}

export default LogoutBtn;

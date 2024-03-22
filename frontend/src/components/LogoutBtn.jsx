/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React from "react";
import { logout } from "../store/authSlice";
import { useDispatch } from "react-redux";

function LogoutBtn({ setUser }) {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      dispatch(logout());
    } catch (error) {
      if (error.response.data.statusCode == 401) {
        await axios.post("/api/auth/logout");
        dispatch(logout());
      }
      console.log(JSON.parse(error.request.response).message);
    }
  };
  return (
    <>
      <button className="text-md text-[18px] py-2 text-[#ffffff]" onClick={handleLogout}>Logout</button>
    </>
  );
}

export default LogoutBtn;

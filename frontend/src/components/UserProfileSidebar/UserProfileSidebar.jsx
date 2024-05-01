/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { CircleUser, X } from "lucide-react";


import userDefaultImage from "../../assets/user_default_image.jpg";
import {LogoutBtn} from "../index";

export default function UserProfileSidebar({
  showUserProfileSidebar,
  setShowUserProfileSidebar,
}) {
  const { authStatus, loginUserData } = useSelector((state) => state.auth);

  return (
    <aside className="sidebar flex absolute shadow-md rounded-md top-[4rem] right-0 z-50  w-64 flex-col overflow-y-auto border-r bg-white px-5 py-4">
      <div className="w-full">
        <div className="flex justify-between">
          <img
            className="duration-200 inline-block hover:outline-dotted h-10 w-10 rounded-full"
            src={userDefaultImage}
            alt="User Profile"
          />
          <X
            onClick={() => setShowUserProfileSidebar(!showUserProfileSidebar)}
            className="cursor-pointer"
          />
        </div>
        <span className={`text-sm font-medium text-gray-900 `}>
          {loginUserData?.name} <br />
          {loginUserData?.email}
        </span>
      </div>

      <div className=" flex flex-1 flex-col justify-between">
        <nav className="  ">
          <div className="">
            <label className="px-3 text-xs font-semibold uppercase text-gray-900">
              <hr />
            </label>
            <Link
              to={"/user-profile"}
              onClick={() => setShowUserProfileSidebar(!showUserProfileSidebar)}
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
            >
              <CircleUser />
              <span className="mx-2 text-sm font-medium">Profile</span>
            </Link>
            <a href="/login"
              onClick={() => setShowUserProfileSidebar(!showUserProfileSidebar)}
            >
              <LogoutBtn />
            </a>
          </div>
        </nav>
      </div>
    </aside>
  );
}

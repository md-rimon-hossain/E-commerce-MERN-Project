/* eslint-disable no-unused-vars */

import React from 'react'
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

import {
  BsCart,
  BsThreeDots,
} from "react-icons/bs";

import { IoSearchSharp } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

// import { logo } from "../../index";
import NavLinks from "./NavLinks";
import Container from "../Container";
import { useSelector } from 'react-redux';

import LogoutBtn from "../LogoutBtn"
import UserProfileBtn from "../UserProfileBtn";
import { UserProfileSidebar } from "../UserProfileSidebar/UserProfileSidebar";
import { LogIn } from "lucide-react";

const Header = () => {
  const { authStatus, loginUserData } = useSelector((state) => state.auth);
  console.log(authStatus);

  const [showNavbar, setShowNavbar] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // User profile sidebar
  const [showUserProfileSidebar, setShowUserProfileSidebar] = useState(false);

  return (
    <header className="h-[80px] relative flex items-center gap-1 justify-center shadow bg-[#EEB1B9] ">
      <Container>
        <nav>
          {/*  navbar  */}
          <div className="bg-inherit ">
            <div className="  flex items-center ">
              <div className="flex-1">
                <div className="md:hidden text-[#000] block cursor-pointer">
                  {showNavbar ? (
                    <FaXmark
                      className="text-2xl text-gray-600"
                      onClick={() => {
                        setShowNavbar(!showNavbar);
                        showDetails && setShowDetails(!showDetails);
                      }}
                    />
                  ) : (
                    <FaBars
                      className="text-2xl text-gray-600"
                      onClick={() => {
                        setShowNavbar(!showNavbar);
                        showDetails && setShowDetails(!showDetails);
                      }}
                    />
                  )}
                </div>

                <ul className="md:flex   justify-center text-center  items-center hidden">
                  <div className="text-[#000] px-2">
                    <Link to={"/"}>
                      <h1 className="text-2xl font-bold text-[#468CF7] w-[125px]">
                        SHOES STORE
                      </h1>
                      {/* <img src={logo} alt="Logo"  className='scale-100'/> */}
                    </Link>
                  </div>

                  <NavLinks
                    showNavbar={showNavbar}
                    setShowNavbar={setShowNavbar}
                  />
                </ul>
              </div>

              <div className=" w-full flex items-center justify-center">
                <form className="flex  justify-center items-center relative w-[90%] lg:w-[95%]">
                  <input
                    type="search"
                    name="search"
                    id="search"
                    required
                    onFocus={() => setShowNavbar(false)}
                    placeholder="Search any item"
                    autoComplete="false"
                    className=" w-full   text-[17px] h-[45px] text-black bg-white  px-4  outline-none md:font-medium border rounded-full focus:ring-1"
                  />
                  <button
                    type="submit"
                    className="bg-[#fff] absolute ro right-0  md:p-[8px] rounded-full text-[#F85606] font-extrabold p-[8px]"
                  >
                    <IoSearchSharp className="font-bold text-[25px] lg:text-[25px]" />
                  </button>
                </form>
              </div>

              <div className=" px-3">
                <div className="md:hidden text-gray-600 block">
                  {showDetails ? (
                    <div className="p-[3px] border  border-gray-500 text-gray-600 rounded-md">
                      <FaXmark
                        className="text-2xl  cursor-pointer"
                        onClick={() => {
                          setShowDetails(!showDetails);
                          showNavbar && setShowNavbar(!showNavbar);
                        }}
                      />
                    </div>
                  ) : (
                    <div className="p-[3px] border border-gray-500 rounded-md">
                      <BsThreeDots
                        className="text-2xl cursor-pointer"
                        onClick={() => {
                          setShowDetails(!showDetails);
                          showNavbar && setShowNavbar(!showNavbar);
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="md:flex justify-between items-center gap-2  sm:text-[13px] hidden lg:text-[17px]">
                  {!authStatus && (
                    <Link to={"/login"}>
                      <div className="flex justify-center font-semibold   duration-200   text-[#000] hover:text-[#468CF7]  px-3 items-center gap-1 cursor-pointer hover:text-cardHoverColor">
                        <button className="text-md py-2 font-semibold text-[18px] ">
                          Login
                        </button>
                      </div>
                    </Link>
                  )}

                  {authStatus && loginUserData.isAdmin ? (
                    <Link to={"/admin-dashboard"}>
                      <div className="flex justify-center hover:bg-[#DF4D05] duration-300 rounded-full  text-[#000] hover:text-[#fff] px-3 items-center gap-1 cursor-pointer hover:text-cardHoverColor">
                        <button className="text-md py-2 text-[18px] ">
                          Dashboard
                        </button>
                      </div>
                    </Link>
                  ) : null}

                  {!authStatus && (
                    <Link to={"/register"}>
                      <div className="flex justify-center    text-[#000]  px-3 items-center gap-1 cursor-pointer hover:text-cardHoverColor">
                        <button className="text-md py-2 text-[18px] font-semibold text-[#000] duration-200  hover:text-[#468CF7]">
                          SignUp
                        </button>
                      </div>
                    </Link>
                  )}

                  <Link to={"/cart"}>
                    <div className="flex justify-center  duration-200 rounded-full  text-[#000] hover:text-[#468CF7] px-3 items-center gap-1 cursor-pointer hover:text-cardHoverColor">
                      <BsCart className="lg:text-xl text-[17px] " />
                      <button className="text-md py-2 font-semibold text-[18px]">
                        Cart
                      </button>
                    </div>
                  </Link>

                  {authStatus && loginUserData ? (
                    <Link
                      onClick={() =>
                        setShowUserProfileSidebar(!showUserProfileSidebar)
                      }
                      className="w-[100px] font-bold"
                    >
                      <UserProfileBtn className={"text-black "} />
                    </Link>
                  ) : null}

                  {showUserProfileSidebar && (
                    <UserProfileSidebar
                      showUserProfileSidebar={showUserProfileSidebar}
                      setShowUserProfileSidebar={setShowUserProfileSidebar}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* upper navbar for mobile size  */}
          <div className=" md:hidden overflow-x-hidden overflow-y-scroll ">
            <div
              className={`duration-700 transition-all absolute left-[-100%] w-full h-full pt-4 ${
                showNavbar && "left-[0] bg-gray-100 "
              }`}
            >
              <ul className={`flex flex-col`}>
                <li className="font-semibold mx-3 px-2 my-2">
                  <NavLink
                    className={({ isActive }) =>
                      `hover:text-cardHoverColor ${
                        isActive ? "text-cardHoverColor" : "text-black"
                      }`
                    }
                    to="/"
                    onClick={() => setShowNavbar(!showNavbar)}
                  >
                    Home
                  </NavLink>
                </li>
                <div className="flex flex-col items-start">
                  <NavLinks
                    showNavbar={showNavbar}
                    setShowNavbar={setShowNavbar}
                  />
                </div>
              </ul>
            </div>
          </div>

          {/*Profile details for mobile size*/}
          <div
            className={`md:hidden shadow-md z-50 absolute pb-2 left-auto right-[10px] w-[200px] rounded-md  bg-white ${
              showDetails ? "block" : "hidden"
            }`}
          >
            <div className=" flex duration-500  w-full flex-col justify-start items-center ">
              <Link
                to={"/login"}
                className="w-full border
                 flex items-center justify-center py-2"
                onClick={() => setShowDetails(!showDetails)}
              >
                <div className="flex w-full items-center gap-1  cursor-pointer mb-1 ">
                  {authStatus ? (
                    <LogoutBtn
                      className={"py-0 hover:text-[#468CF7] text-center"}
                    />
                  ) : (
                    <span className="text-md w-full text-center font-semibold text-gray-600">
                      Login
                    </span>
                  )}
                </div>
              </Link>
              {authStatus && loginUserData.isAdmin ? (
                <Link
                  to={"/admin-dashboard"}
                  className="w-full border
                 flex items-center  py-2 justify-center"
                  onClick={() => setShowDetails(!showDetails)}
                >
                  <div className="flex  items-center gap-1 cursor-pointer mb-1 hover:text-cardHoverColor">
                    <span className="text-md font-semibold text-gray-600 hover:text-[#468CF7]">
                      Dashboard
                    </span>
                  </div>
                </Link>
              ) : null}
              {!authStatus && (
                <Link
                  to={"/register"}
                  className="w-full border
                 flex items-center justify-center  py-2"
                  onClick={() => setShowDetails(!showDetails)}
                >
                  <div className="flex  items-center gap-1 cursor-pointer mb-1 hover:text-cardHoverColor">
                    <span className="text-md font-semibold text-gray-600 hover:text-[#468CF7]">
                      SignUp
                    </span>
                  </div>
                </Link>
              )}
              <Link
                to={"/cart"}
                className="w-full border
                 flex items-center justify-center  py-2"
                onClick={() => setShowDetails(!showDetails)}
              >
                <div className="flex font-semibold text-gray-600 hover:text-[#468CF7] items-center gap-1 cursor-pointer mb-1">
                  <BsCart className="lg:text-xl text-[17px] " />
                  <span className="text-md ">Cart</span>
                </div>
              </Link>
              {authStatus ? (
                <Link
                  to={"/user-profile"}
                  className="w-full border
                 flex items-center justify-center  py-2"
                  onClick={() => setShowDetails(!showDetails)}
                >
                  <UserProfileBtn
                    username={loginUserData.name}
                    className={
                      "hover:text-[#468CF7] font-semibold text-gray-600"
                    }
                  />
                </Link>
              ) : null}
            </div>
            {/* <UserRightBarMobile /> */}
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Header;

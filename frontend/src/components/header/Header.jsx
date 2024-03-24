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

const Header = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const { authStatus, loginUserData } = useSelector((state) => state.auth);
  console.log(authStatus);


  return (
    <header className="h-[80px] flex items-center justify-center bg-[#2C1E1E] ">
      <Container>
        <nav>
          {/* bottom navbar  */}
          <div className="bg-inherit ">
            <div className="  flex items-center ">
              <div className="flex-1">
                <div className="md:hidden block cursor-pointer">
                  {showNavbar ? (
                    <FaXmark
                      className="text-xl"
                      onClick={() => {
                        setShowNavbar(!showNavbar);
                        showDetails && setShowDetails(!showDetails);
                      }}
                    />
                  ) : (
                    <FaBars
                      className="text-xl "
                      onClick={() => {
                        setShowNavbar(!showNavbar);
                        showDetails && setShowDetails(!showDetails);
                      }}
                    />
                  )}
                </div>

                <ul className="md:flex   justify-center text-center  items-center hidden">
                  <div className="text-[#ffffff]">
                    <Link to={"/"}>
                      <h1>Rimon</h1>
                    </Link>
                  </div>
                  <NavLinks
                    showNavbar={showNavbar}
                    setShowNavbar={setShowNavbar}
                  />
                </ul>
              </div>

              <div className=" w-full flex items-center justify-center">
                <form className="flex justify-center items-center relative w-[90%] lg:w-[65%]">
                  <input
                    type="search"
                    name="search"
                    id="search"
                    placeholder="Search any item"
                    className=" w-full outline-none px-2 md:text-md text-sm md:font-medium border border-borderColor rounded-md lg:p-1.5 p-1 focus:ring-1 ring-buttonColor"
                  />
                  <button
                    type="submit"
                    className="bg-[#FFE1D2] absolute right-0 md:p-[8px] rounded-r-md text-[#F85606] font-extrabold p-[8px]"
                  >
                    <IoSearchSharp className="font-bold text-[13px] lg:text-[17px]" />
                  </button>
                </form>
              </div>

              <div className=" px-3">
                <div className="md:hidden block">
                  {showDetails ? (
                    <div className="p-[3px] border border-gray-500 rounded-md">
                      <FaXmark
                        className="text-xl cursor-pointer"
                        onClick={() => {
                          setShowDetails(!showDetails);
                          showNavbar && setShowNavbar(!showNavbar);
                        }}
                      />
                    </div>
                  ) : (
                    <div className="p-[3px] border border-gray-500 rounded-md">
                      <BsThreeDots
                        className="text-xl cursor-pointer"
                        onClick={() => {
                          setShowDetails(!showDetails);
                          showNavbar && setShowNavbar(!showNavbar);
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="md:flex justify-between items-center gap-2  sm:text-[13px] hidden lg:text-[17px]">
                  <Link to={"/login"}>
                    <div className="flex justify-center font-semibold hover:bg-[#DF4D05] px-2 rounded items-center gap-1 cursor-pointer hover:text-cardHoverColor">
                      {authStatus ? (
                        <LogoutBtn />
                      ) : (
                        <button className="text-md py-2 font-semibold text-[18px] text-[#ffffff]">
                          Login
                        </button>
                      )}
                    </div>
                  </Link>

                  {authStatus && loginUserData.isAdmin ? (
                    <Link to={"/admin-dashboard"}>
                      <div className="flex justify-center hover:bg-[#DF4D05] px-2 rounded items-center gap-1 cursor-pointer hover:text-cardHoverColor">
                        <button className="text-md py-2 text-[18px] text-[#ffffff]">
                          Dashboard
                        </button>
                      </div>
                    </Link>
                  ) : null}

                  {!authStatus && (
                    <Link to={"/register"}>
                      <div className="flex justify-center hover:bg-[#DF4D05] px-2 rounded items-center gap-1 cursor-pointer hover:text-cardHoverColor">
                        <button className="text-md py-2 text-[18px] text-[#ffffff]">
                          SignUp
                        </button>
                      </div>
                    </Link>
                  )}
                  <Link to={"/cart"}>
                    <div className="flex justify-center hover:bg-[#DF4D05] px-2 rounded items-center gap-1 cursor-pointer hover:text-cardHoverColor">
                      <BsCart className="lg:text-xl text-[17px] text-[#fff]" />
                      <button className="text-md py-2 font-semibold text-[18px] text-[#ffffff]">
                        Cart
                      </button>
                    </div>
                  </Link>
                  {authStatus && loginUserData ? (
                    <Link to={"/user-profile"} className="w-[100px] font-bold">
                      <UserProfileBtn className={"text-white"} />
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          {/* small size */}

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
            className={`md:hidden absolute pb-2 right-[45px] w-[150px] rounded-md  bg-gray-100 ${
              showDetails ? "block" : "hidden"
            }`}
          >
            <div className=" flex  w-full flex-col justify-start items-center ">
              <Link to={"/login"} onClick={() => setShowDetails(!showDetails)}>
                <div className="flex  items-center gap-1  cursor-pointer mb-1 ">
                  {authStatus ? (
                    <LogoutBtn
                      className={"text-black hover:text-orange-500 text-center"}
                    />
                  ) : (
                    <span className="text-md">Login</span>
                  )}
                </div>
              </Link>
              {authStatus && loginUserData.isAdmin ? (
                <Link
                  to={"/admin-dashboard"}
                  onClick={() => setShowDetails(!showDetails)}
                >
                  <div className="flex  items-center gap-1 cursor-pointer mb-1 hover:text-cardHoverColor">
                    <span className="text-md hover:text-orange-500">
                      Dashboard
                    </span>
                  </div>
                </Link>
              ) : null}
              {!authStatus && (
                <Link
                  to={"/register"}
                  onClick={() => setShowDetails(!showDetails)}
                >
                  <div className="flex  items-center gap-1 cursor-pointer mb-1 hover:text-cardHoverColor">
                    <span className="text-md hover:text-orange-500">
                      SignUp
                    </span>
                  </div>
                </Link>
              )}
              <Link to={"/cart"} onClick={() => setShowDetails(!showDetails)}>
                <div className="flex  items-center gap-1 cursor-pointer mb-1 hover:text-cardHoverColor">
                  <span className="text-md hover:text-orange-500">Cart</span>
                </div>
              </Link>
              {authStatus ? (
                <Link
                  to={"/user-profile"}
                  onClick={() => setShowDetails(!showDetails)}
                >
                  <UserProfileBtn
                    username={loginUserData.name}
                    className={"hover:text-orange-500"}
                  />
                </Link>
              ) : null}
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Header;

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
import UserRightBarMobile from '../UserRightBarMobile';

const Header = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const { authStatus, loginUserData } = useSelector((state) => state.auth);
  console.log(authStatus);
  

  return (
    <header className="h-[80px] flex items-center gap-1 justify-center shadow bg-[#fff] ">
      <Container>
        <nav>
          {/* bottom navbar  */}
          <div className="bg-inherit ">
            <div className="  flex items-center ">
              <div className="flex-1">
                <div className="md:hidden text-[#000] block cursor-pointer">
                  {showNavbar ? (
                    <FaXmark
                      className="text-2xl"
                      onClick={() => {
                        setShowNavbar(!showNavbar);
                        showDetails && setShowDetails(!showDetails);
                      }}
                    />
                  ) : (
                    <FaBars
                      className="text-2xl "
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
                      <h1>Rimon</h1>
                    </Link>
                  </div>
                  <Link to={"/"}>
                    <div className="flex justify-center hover:bg-[#DF4D05] duration-300 rounded-full  text-[#000] hover:text-[#fff] px-3 items-center gap-1 cursor-pointer ">
                      <button className="text-md py-2 text-[18px] ">
                        Home
                      </button>
                    </div>
                  </Link>
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
                    className=" w-full   text-[17px] h-[45px] text-black bg-white  px-4  outline-none md:font-medium border border-gray-400 rounded-full focus:ring-1 ring-buttonColor"
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
                <div className="md:hidden text-[#000] block">
                  {showDetails ? (
                    <div className="p-[3px] border  border-gray-500 text-[#000] rounded-md">
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
                  <Link to={"/login"}>
                    <div className="flex justify-center font-semibold  hover:bg-[#DF4D05] duration-300 rounded-full  text-[#000] hover:text-[#fff] px-3 items-center gap-1 cursor-pointer hover:text-cardHoverColor">
                      {authStatus ? (
                        <LogoutBtn />
                      ) : (
                        <button className="text-md py-2 font-semibold text-[18px] ">
                          Login
                        </button>
                      )}
                    </div>
                  </Link>

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
                      <div className="flex justify-center hover:bg-[#DF4D05] duration-300 rounded-full  text-[#000] hover:text-[#fff] px-3 items-center gap-1 cursor-pointer hover:text-cardHoverColor">
                        <button className="text-md py-2 text-[18px] text-[#000] hover:text-[#fff]">
                          SignUp
                        </button>
                      </div>
                    </Link>
                  )}

                  {authStatus && (
                    <Link to={"/cart"}>
                      <div className="flex justify-center hover:bg-[#DF4D05] duration-300 rounded-full  text-[#000] hover:text-[#fff] px-3 items-center gap-1 cursor-pointer hover:text-cardHoverColor">
                        <BsCart className="lg:text-xl text-[17px] " />
                        <button className="text-md py-2 font-semibold text-[18px]">
                          Cart
                        </button>
                      </div>
                    </Link>
                  )}

                  {authStatus && loginUserData ? (
                    <Link to={"/user-profile"} className="w-[100px] font-bold">
                      <UserProfileBtn className={"text-black "} />
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
            className={`md:hidden absolute pb-2 left-auto right-[10px] w-[150px] rounded-md  bg-gray-100 ${
              showDetails ? "block" : "hidden"
            }`}
          >
            {/* <div className=" flex  w-full flex-col justify-start items-center ">
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
            </div> */}
            <UserRightBarMobile />
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Header;

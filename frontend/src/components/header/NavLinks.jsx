// import React from 'react'
import { NavLink } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { FiMinus } from "react-icons/fi";
import { LuPlusCircle } from "react-icons/lu";

import AllLinksData from "./AllLinksData";
import { useState } from "react";
import AllGroupLinks from "./AllGroupLinks";

// eslint-disable-next-line react/prop-types
const NavLinks = ({ showNavbar, setShowNavbar }) => {
  const [headingName, setHeadingName] = useState("");
  const [linkName, setLinkName] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openSubDropdown, setOpenSubDropdown] = useState(false);

  const handleClick = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <>
      {AllLinksData &&
        AllLinksData.map((link) => (
          <div key={link.id}>
            <div
              className="md:flex  justify-center items-center  hover:bg-[#DF4D05] duration-300 rounded-full  text-[#000] hover:text-[#fff] px-1 cursor-pointer font-semibold hidden"
              onClick={handleClick}
            >
              {link.path ? (
                <NavLink
                  className={({ isActive }) =>
                    `hover:text-gray-300 ${
                      isActive ? "text-gray-300" : "text-[#FFF9EF]"
                    }`
                  }
                  to={link.path}
                >
                  {link.linkName}
                </NavLink>
              ) : (
                <div className="md:py-1 z-40 hover:bg-[#DF4D05] duration-300 rounded-full  text-[#000] hover:text-[#fff] px-1  group ">
                  <div className="">
                    <li className=" rounded-full  hover:text-[#fff] px-3 py-1 group-hover:text-cardHoverColor">
                      {link.linkName}
                    </li>
                    <div className="absolute  transition-all text-black hidden md:group-hover:block hover:block bg-gray-50 top-14 left-40 rounded ">
                      {link.submenu &&
                        link.subLinks.map((subLink) => {
                          return (
                            <div
                              key={subLink.heading}
                              onMouseEnter={(e) =>
                                setHeadingName(e.target.innerText)
                              }
                              className="w-[140px] duration-500 py-1 hover:text-white hover:bg-gray-600 rounded-sm border group/edit"
                            >
                              <div className="w-full flex flex-col justify-start  ml-[-20px]">
                                <div className="flex justify-around w-full mx-[26px]  group-hover/edit:text-cardHoverColor">
                                  <h1>{subLink.heading}</h1>
                                  <FaArrowRight className="mt-1" />
                                </div>
                              </div>
                              <AllGroupLinks
                                subLink={subLink}
                                headingName={headingName}
                              />
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

      {/* small size  */}
      {AllLinksData &&
        AllLinksData.map((link) => (
          <div key={link.id} className="w-full z-[99] md:hidden">
            <div className="flex justify-start items-center mx-3 px-2 cursor-pointer font-semibold my-3 md:hidden">
              {link.path ? (
                <NavLink
                  className={({ isActive }) =>
                    `hover:text-cardHoverColor ${
                      isActive ? "text-cardHoverColor" : "text-black"
                    }`
                  }
                  to={link.path}
                  onClick={handleClick}
                >
                  {link.linkName}
                </NavLink>
              ) : (
                <div className="md:p-2 group z-30 w-full">
                  <div className="w-full">
                    <li
                      className="hover:text-cardHoverColor flex justify-between"
                      onClick={(e) => {
                        setLinkName(e.target.innerText);
                        setOpenDropdown(!openDropdown);
                      }}
                    >
                      <h1
                        className={
                          openDropdown && linkName === link.linkName
                            ? "text-cardHoverColor bg-orange-200 w-full rounded-full px-1"
                            : "text-black"
                        }
                      >
                        {link.linkName}
                      </h1>
                      {openDropdown && linkName === link.linkName ? (
                        <FiMinus
                          className={
                            openDropdown && linkName === link.linkName
                              ? "mt-1 absolute right-10 text-cardHoverColor"
                              : "text-black mt-1 absolute right-10"
                          }
                        />
                      ) : (
                        <LuPlusCircle
                          className={
                            openDropdown && linkName === link.linkName
                              ? "mt-1 absolute right-10 text-cardHoverColor"
                              : "text-black mt-1 absolute right-10"
                          }
                        />
                      )}
                    </li>
                    <div className="">
                      {linkName === "Category" &&
                        openDropdown &&
                        link.submenu &&
                        link.subLinks.map((subLink) => {
                          return (
                            <div
                              key={subLink.heading}
                              className="p-2 group/edit"
                            >
                              <div className="w-[100%] flex flex-col justify-start ml-[-25px]">
                                <div
                                  className="flex justify-between w-full mx-[30px] hover:text-cardHoverColor pr-5"
                                  onClick={(e) => {
                                    setHeadingName(e.target.innerText);
                                    e.target.innerText === subLink.heading &&
                                      setOpenSubDropdown(!openSubDropdown);
                                  }}
                                >
                                  <li
                                    className={
                                      openSubDropdown &&
                                      headingName === subLink.heading
                                        ? "flex justify-between duration-300 w-full bg-orange-100 px-2 rounded-full "
                                        : " bg-inherit flex duration-300 justify-between px-2 w-full"
                                    }
                                  >
                                    <h1
                                      className={`${
                                        openSubDropdown &&
                                        headingName === subLink.heading
                                          ? "text-cardHoverColor"
                                          : "text-black"
                                      }`}
                                    >
                                      {subLink.heading}
                                    </h1>
                                    {openSubDropdown &&
                                    headingName === subLink.heading ? (
                                      <FiMinus
                                        className={
                                          openSubDropdown &&
                                          headingName === subLink.heading
                                            ? "mt-1  text-cardHoverColor"
                                            : "text-black mt-1 "
                                        }
                                      />
                                    ) : (
                                      <LuPlusCircle
                                        className={
                                          openSubDropdown &&
                                          headingName === subLink.heading
                                            ? "mt-1  text-cardHoverColor"
                                            : "text-black mt-1 "
                                        }
                                      />
                                    )}
                                  </li>
                                </div>
                              </div>
                              <div className="md:hidden">
                                {openSubDropdown && (
                                  <AllGroupLinks
                                    subLink={subLink}
                                    headingName={headingName}
                                    showNavbar={showNavbar}
                                    setShowNavbar={setShowNavbar}
                                  />
                                )}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
    </>
  );
};

export default NavLinks;

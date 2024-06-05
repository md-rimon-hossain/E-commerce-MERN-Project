/* eslint-disable no-unused-vars */

import React from 'react'
import { IoIosSend } from "react-icons/io";

// import { appleStorePng, playStorePng, qrCodePng } from "../../index";
import { Link } from "react-router-dom";
import { Container } from "../";
const Footer = () => {
  return (
    <>
      <div className="h-auto bg-[#091020] w-full text-white">
        <Container>
          <div className="px-6 py-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:grid-cols-4">
              <div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-xl font-bold">Exclusive</h1>
                  <h3 className="text-[18px]">Subscribe</h3>
                  <p className="text-sm font-thin text-white">
                    Get 10% of your first order!
                  </p>
                </div>
                <div>
                  <form action="" className="flex relative">
                    <input
                      type="email"
                      name=""
                      id=""
                      required
                      placeholder="Email Here"
                      className="bg-transparent border-white border-2 px-2 py-1 mt-1 rounded-md w-[90%] text-white placeholder:text-white placeholder:focus:text-cardHoverColor outline-none focus:border-cardHoverColor"
                    />
                    <IoIosSend className="absolute right-16 md:right-12 top-2 text-[25px] rotate-45 hover:rotate-12 hover:transition hover:duration-200 cursor-pointer" />
                  </form>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-xl font-bold">Support</h1>
                <h3>Daulatpur, Kushtia</h3>
                <h3 className="font-extralight">mdrimonhossain462@gmail.com</h3>
                <h3>
                  <span className="text-cardHoverColor">Whats App+880</span>
                  1738252552
                </h3>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-xl font-bold">Account</h1>
                <Link
                  to={"/register"}
                  className="hover:underline hover:text-cardHoverColor"
                >
                  Login/Register
                </Link>
                <Link
                  to={"/cart"}
                  className="hover:underline hover:text-cardHoverColor"
                >
                  Cart
                </Link>
                <Link
                  to={"/wishlist"}
                  className="hover:underline hover:text-cardHoverColor"
                >
                  Wishlist
                </Link>
                <Link
                  to={"/shop"}
                  className="hover:underline hover:text-cardHoverColor"
                >
                  Shop
                </Link>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-xl font-bold">Quick Link</h1>
                <Link
                  to={"/privacy-policy"}
                  className="hover:underline hover:text-cardHoverColor"
                >
                  Privacy Policy
                </Link>
                <Link
                  to={"/terms-of-condition"}
                  className="hover:underline hover:text-cardHoverColor"
                >
                  Terms of Use
                </Link>
                <Link
                  to={"/faq"}
                  className="hover:underline hover:text-cardHoverColor"
                >
                  FAQ
                </Link>
                <Link
                  to={"/contact"}
                  className="hover:underline hover:text-cardHoverColor"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full h-[30px] bg-gray-800">
            <h1 className="text-center pt-1">
              &copy; All rights deserve by{" "}
              <Link to={"/"} className="font-bold hover:bg-cardHoverColor">
                Rimon Store
              </Link>
            </h1>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Footer;
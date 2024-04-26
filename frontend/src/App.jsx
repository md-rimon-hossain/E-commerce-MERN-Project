/* eslint-disable no-unused-vars */

import React, {  useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Container from "./components/Container";
import { login, logout } from "./store/authSlice";
import { apiService } from "./api/apiService";
import CartAddedNotification from "./components/CartNotification/CartAddedNotification";

function App() {

  const [loading, setLoading] = useState(true);
  const [
    continuousCheckAndUpdateAccessToken,
    setContinuousCheckAndUpdateAccessToken,
  ] = useState(true);
  const dispatch = useDispatch();


  useEffect(() => {
    (async () => {
      try {
        const response = await apiService.get("/api/auth/refresh-token");
        const userData = response.data.payload;
        if (response.data.success) {
          const response = await apiService.get("/api/auth/protected");
          if (response.data.success) {
            dispatch(login(userData));
          }
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        dispatch(logout());
        setLoading(false);
      }
    })();

    setInterval(() => {
      setContinuousCheckAndUpdateAccessToken(
        !continuousCheckAndUpdateAccessToken
      );
    }, 1200000);

    return () => {
      clearInterval();
    };
  }, [continuousCheckAndUpdateAccessToken, dispatch]);

  return (
    <>
      {!loading ? (
        <div className="w-full min-h-[90vh] bg-[#ffffff]">
          <Header />
          <div className="min-h-[90vh]">
            <Container>
              <CartAddedNotification/>
              <Outlet />
            </Container>
          </div>
          <Footer />
        </div>
      ) : (
        <div className="w-full h-screen flex items-center justify-center">
          <h2>
            <span className="loading loading-ring text-black  loading-xs"></span>
            <span className="loading loading-ring text-black  loading-sm"></span>
            <span className="loading loading-ring text-black  loading-md"></span>
            <span className="loading loading-ring  text-black loading-lg"></span>
          </h2>
        </div>
      )}
    </>
  );
}

export default App;

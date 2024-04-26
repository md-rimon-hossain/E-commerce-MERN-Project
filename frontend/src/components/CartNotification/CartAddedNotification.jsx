/* eslint-disable no-unused-vars */
// Notification.js

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideCartNotification } from "../../store/cartSlice";
import "./CartNotification.css"

const CartAddedNotification = () => {
  const showNotification = useSelector((state) => state.cart.showNotification);
  const dispatch = useDispatch();

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        dispatch(hideCartNotification());
      }, 3000); 
        
      return () => clearTimeout(timer);
    }
  }, [showNotification, dispatch]);

  return (
    <div className={`notification ${showNotification ? "show" : "hide"}`}>
      Product added to cart!
    </div>
  );
};

export default CartAddedNotification;

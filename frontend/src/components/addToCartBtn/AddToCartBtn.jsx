/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React from 'react'
import { useDispatch, useSelector,} from 'react-redux';
import {  addToCartAsync } from '../../store/cartSlice';
import { useNavigate } from 'react-router-dom';


function AddToCartBtn({ product, className = "" }) {
  const {  loading } = useSelector(
    (state) => state.cart
  );
  const {authStatus, loginUserData } = useSelector((state) => state.auth);
   
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const addToCartHandler = (userId, productId, quantity) => {
    if (authStatus) {
    dispatch(addToCartAsync({ userId, productId, quantity }));   
    } else {
     navigate("/login")
    }
  };

  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => addToCartHandler(loginUserData?._id, product?._id, 1)}
      className={`  bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${className}`}
    >
      Add to Cart
    </button>
  );
}

export default AddToCartBtn
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React from 'react'
import { useDispatch,} from 'react-redux';
import { addToCart } from '../../store/cartSlice';

function AddToCartBtn({ product, className = "" }) {
   
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart(product));
  };

  return (

      <button
        type="button"
        onClick={addToCartHandler}
        className={`  bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${className}`}
      >
        Add to Cart
        </button>
  );
}

export default AddToCartBtn
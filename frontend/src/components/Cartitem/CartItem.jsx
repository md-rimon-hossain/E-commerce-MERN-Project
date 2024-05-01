/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartAsync,
  deleteCartItemAsync,
  removeToCartAsync,
} from "../../store/cartSlice";
import { Trash } from "lucide-react";

function CartItem({ product, item }) {
  
  const { cartProducts, loading } = useSelector((state) => state.cart);
  const { loginUserData } = useSelector((state) => state.auth);
  const [localQuantity, setLocalQuantity] = useState(item.quantity);

  const dispatch = useDispatch();

  const handleIncrease = (userId, productId, quantity) => {
    const newQuantity = localQuantity + 1;
    setLocalQuantity(newQuantity);
    dispatch(addToCartAsync({ userId, productId, quantity }));
  };

  const handleDecrease = (userId, productId, quantity, itemQuantity) => {
    if (itemQuantity > 1) {
      const newQuantity = localQuantity - 1;
      setLocalQuantity(newQuantity);
      dispatch(removeToCartAsync({ userId, productId, quantity }));
    }
  };
  
  const handleDeleteToCart = (cartId, itemId) => {
    dispatch(deleteCartItemAsync({ cartId, itemId }));
  };

  return (
    <div
      key={product._id}
      className="border md:flex md:justify-around mb-1 shadow-sm"
    >
      <li className="flex px-2 md:w-[50%] py-4 sm:py-4 ">
        <div className="flex-shrink-0 ">
          <img
            src={product.image}
            alt={product.name}
            className="sm:h-38 sm:w-38 h-24 w-24 md:h-32 md:w-32 rounded-md object-contain object-center"
          />
        </div>
        <div className="ml-4 flex flex-col justify-between sm:ml-6">
          <div className="relative  sm:grid sm:gap-x-6 sm:pr-0">
            <div>
              <div className="flex justify-between">
                <h3 className="text-sm">
                  <a
                    href={product.href}
                    className="font-semibold text-black text-[18px]"
                  >
                    {product.name}
                  </a>
                </h3>
              </div>
              <div className="mt-1 flex text-sm">
                <p className="text-sm text-gray-500">{product.color}</p>
                {product.size ? (
                  <p className="ml-4 border-l border-gray-200 pl-4 text-sm text-gray-500">
                    {product.size}
                  </p>
                ) : null}
              </div>
              <div className="mt-1 flex items-end">
                <p className="text-sm font-medium text-gray-900">
                  {/* <span className="text-3xl">৳</span> */}
                  Tk.{product.price} &nbsp;
                </p>
                              <p className="text-xs font-medium text-gray-500 line-through">
                  {product.originalPrice && `Tk.${product.originalPrice}`}
                </p>
                &nbsp;&nbsp;
                <p className="text-sm font-medium text-green-500">
                  {product.discount}
                </p>
              </div>
            </div>
          </div>
        </div>
      </li>
      <div className="mb-2 flex w-[40%]">
        <div className="min-w-32 text-gray-900 flex justify-center items-center">
          <button
            type="button"
            disabled={loading}
            onClick={() =>
              handleDecrease(loginUserData._id, product._id, -1, item.quantity)
            }
            className="h-8 w-8 flex items-center justify-center  text-[30px] font-semibold"
          >
            -
          </button>
          <input
            type="text"
            readOnly
            className="h-8 w-9 text-[23px] font-semibold rounded-md border bg-white text-center"
            value={localQuantity}
          />
          <button
            type="button"
            disabled={loading}
            onClick={() => handleIncrease(loginUserData._id, product._id, 1)}
            className="flex h-8 w-8 text-[30px] font-semibold items-center justify-center"
          >
            +
          </button>
        </div>
        <div className="ml-6 flex text-sm">
          <button
            type="button"
            onClick={() => handleDeleteToCart(cartProducts._id, item._id)}
            className="flex items-center space-x-1 px-2 py-1 pl-0"
          >
            <Trash size={12} className="text-red-500" />
            <span className="text-xs font-medium text-red-500">Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;

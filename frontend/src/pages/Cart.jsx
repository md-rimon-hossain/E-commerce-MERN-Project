
// eslint-disable-next-line no-unused-vars
import React from "react";
import { useSelector } from "react-redux";

import PageTitle from "../components/PageTitle";

import { assets } from "../assets";
import CartItem from "../components/Cartitem/CartItem";
import { Link } from "react-router-dom";


export default function Cart() {
  const { cartProducts, cartItemsCount, totalPrice, discountPrice, loading } =
    useSelector((state) => state.cart);

  const afterDiscountTotalAmount = totalPrice - discountPrice;

  return (
    <>
      <PageTitle title={"Cart"} />
      <div className="mx-auto max-w-7xl  lg:px-0">
        <div className="mx-auto max-w-2xl py-8  xl:px-10 lg:max-w-7xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Shopping Cart
          </h1>

          <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section
              aria-labelledby="cart-heading"
              className="rounded-lg bg-white lg:col-span-8"
            >
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>
              <ul role="list" className="">
                {cartProducts !== null && cartProducts?.items?.length != 0 ? (
                  cartProducts?.items.map((item) => {
                    const { product } = item;
                    return (
                      <CartItem
                        key={product._id}
                        product={product}
                        item={item}
                      />
                    );
                  })
                ) : (
                  <>
                    <h1 className="text-slate-800 mb-2 text-xl text-center font-bold">
                      Your Cart is Empty
                    </h1>
                    <Link to={"/"} className="inline-block text-center w-full">
                      <button
                        type="button"
                        className="inline-flex items-center rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2"
                        >
                          <line x1="19" y1="12" x2="5" y2="12"></line>
                          <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        Back to Sopping
                      </button>
                    </Link>
                    <img src={assets.emptyCartImage} alt="" />
                  </>
                )}
              </ul>
            </section>
            {/* Order summary */}
            <section
              aria-labelledby="summary-heading"
              className="mt-16 rounded-md bg-white px-4 lg:col-span-4 lg:mt-0 lg:px-1"
            >
              <h2
                id="summary-heading"
                className=" border-b border-gray-200 px-4 py-3 text-xl font-medium text-gray-900 sm:p-4"
              >
                Price Details
              </h2>
              <div>
                <dl className=" space-y-1 px-2 py-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-base text-gray-800">
                      Price ({cartItemsCount} item)
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      <span className="text-3xl">৳</span>
                      &nbsp;
                      {loading == true ? (
                        <span className="loading loading-spinner text-secondary"></span>
                      ) : (
                        totalPrice
                      )}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <dt className="flex items-center text-base text-gray-800">
                      <span>Discount</span>
                    </dt>
                    <dd className="text-base font-medium text-green-700">
                      {discountPrice && !(discountPrice <= 0)
                        ? `-Tk.${discountPrice}`
                        : "0"}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <dt className="flex text-base text-gray-800">
                      <span>Delivery Charges</span>
                    </dt>
                    <dd className="text-base font-medium text-green-700">
                      Free
                    </dd>
                  </div>
                  <div className="flex items-center justify-between border-y border-dashed py-4 ">
                    <dt className="text-base font-medium text-gray-900">
                      Total Amount
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      <span className="text-3xl">৳</span>&nbsp;
                      {loading == true ? (
                        <span className="loading loading-spinner text-secondary"></span>
                      ) : (
                        afterDiscountTotalAmount
                      )}
                    </dd>
                  </div>
                </dl>
                <div className="px-2 pb-4 font-medium text-green-700">
                  You will save{" "}
                  {discountPrice && !(discountPrice <= 0)
                    ? `Tk.${discountPrice}`
                    : "0"}{" "}
                  on this order
                </div>
              </div>
            </section>
          </form>
        </div>
      </div>
    </>
  );
}

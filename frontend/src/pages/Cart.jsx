
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import PageTitle from "../components/PageTitle";
import { removeToCart } from "../store/cartSlice";

import { assets } from "../assets";

// const products = [
//   {
//     id: 1,
//     name: "Nike Air Force 1 07 LV8",
//     href: "#",
//     price: "₹47,199",
//     originalPrice: "₹48,900",
//     discount: "5% Off",
//     color: "Orange",
//     size: "8 UK",
//     imageSrc:
//       "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-force-1-07-lv8-shoes-9KwrSk.png",
//   },

// ];

export default function Cart() {
  const { cartProducts, cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch()
  
  return (
    <>
      <PageTitle title={"Cart"} />
      <div className="mx-auto max-w-7xl  lg:px-0">
        <div className="mx-auto max-w-2xl py-8 md:px-40 xl:px-10 lg:max-w-7xl">
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
              <ul role="list" className="divide-y divide-gray-200">
                {cartProducts.length !== 0 ? (
                  cartProducts.map((product) => (
                    <div key={product._id} className="border mb-1 shadow-sm">
                      <li className="flex px-2 py-6 sm:py-6 ">
                        <div className="flex-shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="sm:h-38 sm:w-38 h-24 w-24 md:h-32 md:w-32 rounded-md object-contain object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                          <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
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
                                <p className="text-sm text-gray-500">
                                  {product.color}
                                </p>
                                {product.size ? (
                                  <p className="ml-4 border-l border-gray-200 pl-4 text-sm text-gray-500">
                                    {product.size}
                                  </p>
                                ) : null}
                              </div>
                              <div className="mt-1 flex items-end">
                                <p className="text-xs font-medium text-gray-500 line-through">
                                  {product.originalPrice}
                                </p>
                                <p className="text-sm font-medium text-gray-900">
                                  <span className="text-3xl">৳</span>
                                  &nbsp;{product.price}
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
                      <div className="mb-2 flex">
                        <div className="min-w-32 flex justify-center items-center">
                          <button
                            type="button"
                            className="h-8 w-8 flex items-center justify-center  text-[30px] font-semibold"
                          >
                            -
                          </button>
                          <input
                            type="text"
                            readOnly
                            className="h-8 w-9 text-[23px] font-semibold rounded-md border bg-white text-center"
                            defaultValue={1}
                          />
                          <button
                            type="button"
                            className="flex h-8 w-8 text-[30px] font-semibold items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                        <div className="ml-6 flex text-sm">
                          <button
                            type="button"
                            onClick={() => dispatch(removeToCart(product.slug))}
                            className="flex items-center space-x-1 px-2 py-1 pl-0"
                          >
                            <Trash size={12} className="text-red-500" />
                            <span className="text-xs font-medium text-red-500">
                              Remove
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <h1 className="text-slate-800 mb-2 text-xl text-center font-bold">
                      Your Cart is Empty
                    </h1>
                    <img src={assets.emptyCartImage} alt="" />
                  </>
                )}
              </ul>
            </section>
            {/* Order summary */}
            <section
              aria-labelledby="summary-heading"
              className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
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
                      Price ({cartItems} item)
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      <span className="text-3xl">৳</span>
                      &nbsp;
                      {cartProducts.reduce(
                        (accumulator, product) => accumulator + product.price,
                        0
                      )}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <dt className="flex items-center text-base text-gray-800">
                      <span>Discount</span>
                    </dt>
                    <dd className="text-base font-medium text-green-700">0</dd>
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
                      {cartProducts.reduce(
                        (accumulator, product) => accumulator + product.price,
                        0
                      )}
                    </dd>
                  </div>
                </dl>
                {/* <div className="px-2 pb-4 font-medium text-green-700">
                  You will save ₹ 3,431 on this order
                </div> */}
              </div>
            </section>
          </form>
        </div>
      </div>
    </>
  );
}

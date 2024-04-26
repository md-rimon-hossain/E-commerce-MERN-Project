/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Star, ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getAllProducts } from "../store/productsSlice";
import { apiService } from "../api/apiService";
import AddToCartBtn from "../components/addToCartBtn/AddToCartBtn";

export const ProductOverview = () => {
  const { allProducts } = useSelector((state) => state.products);
  const [overviewProduct, setOverviewProduct] = useState([]);

  const { slug } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (allProducts.length === 0) {
      (async () => {
        const res = await apiService.get("/api/products");
        dispatch(getAllProducts(res.data.payload.products));
      })();
    }
    const overview = allProducts?.filter((product) => product?.slug === slug);
    setOverviewProduct(overview);
  }, [ allProducts, dispatch, slug]);

  return (
    <section className="overflow-hidden">
      <div className="mx-auto max-w-5xl px-5 py-24">
        <div className="mx-auto flex flex-wrap items-center lg:w-4/5">
          <img
            className="h-64 w-full rounded object-cover lg:h-96 lg:w-1/2"
            src={overviewProduct[0]?.image}
            alt={overviewProduct[0]?.slug}
          />
          <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
            <h2 className="text-sm font-semibold tracking-widest text-gray-500">
              Nike
            </h2>
            <h1 className="my-4 text-3xl font-semibold text-black">
              {overviewProduct[0]?.name}
            </h1>
            <div className="my-4 flex items-center">
              <span className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-500" />
                ))}
                <span className="ml-3 inline-block text-xs font-semibold">
                  4 Reviews
                </span>
              </span>
            </div>
            <p className="leading-relaxed">{overviewProduct[0]?.description}</p>
            <div className="mb-5 mt-6 flex items-center border-b-2 border-gray-100 pb-5">
              <div className="flex items-center">
                <span className="mr-3 text-sm font-semibold">Color</span>
                <button className="h-6 w-6 rounded-full border-2 border-gray-300 focus:outline-none"></button>
                <button className="ml-1 h-6 w-6 rounded-full border-2 border-gray-300 bg-gray-700 focus:outline-none"></button>
                <button className="ml-1 h-6 w-6 rounded-full border-2 border-gray-300 bg-green-200 focus:outline-none"></button>
              </div>
              <div className="ml-auto flex items-center">
                <span className="mr-3 text-sm font-semibold">Size</span>
                <div className="relative">
                  <select className="appearance-none rounded border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black">
                    <option>8 UK</option>
                    <option>9 UK</option>
                    <option>10 UK</option>
                  </select>
                  <span className="pointer-events-none absolute right-0 top-0 flex h-full w-10 items-center justify-center text-center text-gray-600">
                    <ChevronDown size={16} />
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="title-font text-xl font-bold text-gray-900">
                <span className="text-3xl">৳</span>
                {overviewProduct[0]?.price}
              </span>

              <AddToCartBtn
                product={overviewProduct[0]}
                className={"rounded-md"}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

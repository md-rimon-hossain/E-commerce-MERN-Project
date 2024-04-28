/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React from 'react'
import { Link } from 'react-router-dom'
import AddToCartBtn from '../addToCartBtn/AddToCartBtn';

export function ProductCard({ product }) {
  const {name, description, image, slug} = product
  
  return (
    <div className="rounded-md bg-[#ffffff] border">
      <Link to={`/product/${slug}`} className="">
        <img
          src={image}
          alt={slug}
          className="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px]"
        />
      </Link>
      <div className="p-4">
        <Link to={`/product/${slug}`} className="">
          <h1 className="inline-flex text-gray-600 hover:text-[#468CF7] items-center text-lg font-semibold">
            {name}
          </h1>
          <p className="mt-3 text-sm text-gray-600 hover:text-[#468CF7]">
            {description.slice(0, 100)}...
          </p>
        </Link>

        <div className="mt-3 flex items-center space-x-2">
          <span className="block text-sm font-semibold">Colors : </span>
          <span className="block h-4 w-4 rounded-full border-2 border-gray-300 bg-red-400"></span>
          <span className="block h-4 w-4 rounded-full border-2 border-gray-300 bg-purple-400"></span>
          <span className="block h-4 w-4 rounded-full border-2 border-gray-300 bg-orange-400"></span>
        </div>
        <div className="mt-5 flex items-center space-x-2">
          <span className="block text-sm font-semibold">Size : </span>
          <span className="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium">
            8 UK
          </span>
          <span className="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium">
            9 UK
          </span>
          <span className="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium">
            10 UK
          </span>
        </div>
        <AddToCartBtn product={product} className={"mt-4 w-full rounded-sm"} />
      </div>
    </div>
  );
}

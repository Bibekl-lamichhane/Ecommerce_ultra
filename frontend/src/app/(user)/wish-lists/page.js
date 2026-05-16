"use client";
import React from "react";
import ProductCard from "@/components/ProductCard";
import { useSelector } from "react-redux";
const page = () => {
  const wishLists = useSelector((state) => state.product.wishLists);
  return (
    <div className="flex flex-col gap-2">
      <div className="text-3xl text-red-500 font-bold m-8">Your WishLists: </div>
      <div className='grid grid-cols-2 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {wishLists.map((items, key) => (
          <ProductCard product={items} key={items._id} />
        ))}
      </div>
    </div>
  );
};

export default page;

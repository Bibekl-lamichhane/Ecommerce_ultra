"use client";
import React from "react";
import ProductCard from "@/components/ProductCard";
import { useSelector } from "react-redux";
const page = () => {
const wishLists=useSelector(state=>state.product.wishLists)
  return (<div>
     <div className="text-3xl text-orange-400 font-bold ml-8">Your Wish Lists: </div>
    <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      
  {wishLists?.map((items,key) => (
    <ProductCard
      product={items}
      key={key}
    />
  ))}
</div>
</div>
  );
};

export default page;

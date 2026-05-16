"use client";
import React from "react";
import ProductCard from "@/components/ProductCard";
import { useSelector } from "react-redux";
const page = () => {
const cartItems=useSelector(state=>state.product.cartItems)
  return (
    <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
  {cartItems.map((items) => (
    <ProductCard
      product={items}
      key={items._id.$oid}
    />
  ))}
</div>
  );
};

export default page;

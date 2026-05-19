"use client";
import React from "react";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { useSelector } from "react-redux";
const page = () => {
const wishLists=useSelector(state=>state.product.wishLists)

  return (<div>
     {wishLists.length !=0 &&<div className="text-3xl text-orange-400 font-bold ml-8 pt-4">Your Wish Lists: </div>}
    <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      
  {wishLists.length === 0 ? (
          <div className="h-145 w-98 flex flex-col justify-center items-center gap-10 md:w-310">
            <div className="text-3xl text-orange-400 font-bold">
              No products are WishListed Yet!
            </div>
            <Link href="/">
              <div className=" hover:bg-orange-600 hover:underline bg-amber-500 px-3 py-1 text-white">
                Wish List Now
              </div>
            </Link>
          </div>
        ):(wishLists?.map((items,key) => (
    <ProductCard
      product={items}
      key={key}
    />
  )))}
</div>
</div>
  )
};

export default page;

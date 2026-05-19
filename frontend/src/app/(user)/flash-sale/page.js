"use client";
import React, { useEffect,useState } from "react";
import ProductCard from "@/components/ProductCard";
import CircularProgress from '@mui/material/CircularProgress';

const page = () => {
const [products,setProducts]=useState([])
const [Loading,setLoading]=useState(true)

   useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/products");
        if (!response.ok) {
        throw new Error("Failed to fetch");
        }
        const data = await response.json();
        setProducts(data.products);
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();

  }, []);
const filteredProducts = products.filter((products) => {
  const discountPercent =
    ((products.actual_price - products.discount_price) / products.actual_price) * 100;

  return discountPercent >= 50;
});
  return (
       <div>
      {Loading ? (
        <div className="flex justify-center items-center h-60">
          <CircularProgress size={40} />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
              <div className="text-3xl text-orange-400 font-bold ml-8 pt-4">Flash Sale : </div>
             <div className='grid grid-cols-2 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
             {filteredProducts.map((items) => (
             <ProductCard key={items._id} product={items} />
  ))}
             </div>
           </div>
      )}

    </div>

  );
};

export default page;

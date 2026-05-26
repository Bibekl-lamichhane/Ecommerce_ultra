"use client";
import React, { useEffect,useState } from "react";
import ProductCard from "@/components/ProductCard";
import CircularProgress from '@mui/material/CircularProgress';
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import Statistic from "@/components/Statistic";

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

  return (
       <div className="">
        <HeroSection/>
        <Statistic/>
      {Loading ? (
        <div className="h-screen w-screen flex justify-center  items-center ">
          <CircularProgress size={40} />
        </div>
      ) : (
        <div  id="shopnow-section" className="flex flex-col gap-2">
             <div  className="text-3xl text-orange-400 font-bold ml-8">Shop Now: </div>
             <div className='grid grid-cols-2 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
               {products.map((items, key) => (
                 <ProductCard product={items} key={items._id} />
               ))}
             </div>
           </div>
      )}
    <Footer/>
    </div>

  );
};

export default page;

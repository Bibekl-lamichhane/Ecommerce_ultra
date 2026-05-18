"use client";

import React from "react";
import ReactStars from "react-stars";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import { useRouter } from 'next/navigation'
import { useDispatch } from "react-redux";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const router=useRouter()
  const {
    name,
    sub_category,
    discount_price,
    actual_price,
    ratings,
    _id
  } = product;
  const backendURL = "http://localhost:8000";
  const imageUrl = `${backendURL}/uploads/${product.image}`;

  const megasale =
    ((actual_price - discount_price) / actual_price) * 100 >= 50;
  return (
    <Card
      className="group relative flex h-full flex-col rounded-2xl shadow-sm transition-all duration-300 hover:shadow-xl cursor-pointer"
      sx={{
        overflow: "hidden",
      }} onClick={()=>router.push(`/product/${_id}`)}
      
    >
     
      {/* Image */}
      <div className="aspect-square overflow-hidden bg-gray-100 p-3">
        <CardMedia
          component="img"
          image={imageUrl}
          alt={name}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <CardContent className="flex flex-1 flex-col p-4">
        {/* Category */}
        <Typography
          variant="body2"
          className="mb-1 text-gray-500"
        >
          {sub_category}
        </Typography>

        {/* Title */}
        <Typography
          variant="h6"
          className="line-clamp-2 min-h-14 font-semibold text-sm md:text-2xl "
        >
          {name}
        </Typography>

        {/* Rating + Badge */}
        <div className="mt-3 flex items-center justify-between">
          <ReactStars
            count={5}
            value={ratings}
            size={20}
            half={true}
            edit={false}
            color2={"#ffd700"}
          />

          {megasale && (
            <span className=" flex justify-center items-center rounded-full bg-amber-500 px-2 py-1 text-xs font-medium text-slate-50">
              Mega Sale
            </span>
          )}
        </div>

        {/* Prices */}
        <div className="mt-auto pt-4">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-black">
              ${discount_price}
            </span>

            <span className="text-sm text-gray-400 line-through">
              ${actual_price}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
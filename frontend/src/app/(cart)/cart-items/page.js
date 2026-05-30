"use client";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { removeCartItems } from "@/redux/reducerslices/productSlice";
import Link from "next/link";
import { NumberSpinner } from "@/components/NumberSpinner";
import axios from "axios";

const Page = () => {
  const cartItems = useSelector((state) => state.product.cartItems);
  const dispatch = useDispatch();

  const [quantities, setQuantities] = useState(() =>
    Object.fromEntries(cartItems.map((item) => [item._id, 1]))
  );

  const handleQtyChange = (id, newQty) => {
    setQuantities((prev) => ({ ...prev, [id]: newQty }));
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (quantities[item._id] || 1) * item.actual_price,
    0
  );
 const handelPayButton=()=>{
 alert(totalPrice)
 } 
 

  return (
    <div className="text-gray-600 body-font md:px-10 md:h-screen">
    
      {/* EMPTY CART */}
      {cartItems.length === 0 ? (
        <div className="h-178 w-100 flex flex-col justify-center items-center gap-10 md:w-250 ">
          <div className="text-3xl text-orange-400 font-bold">
            Your Cart is Empty
          </div>
          <Link href="/">
            <div className=" hover:bg-orange-600 hover:underline bg-orange-500 px-3 py-1 text-white">
              Shop Now
            </div>
          </Link>
        </div>
      ) : (
        <div className="mx-auto">

          {/* TITLE */}
          <div className="text-3xl text-orange-400 font-bold pt-4 ml-6">
            Your Cart Items
          </div>

          {/* ================= TABLE (DESKTOP) ================= */}
          <div className="hidden md:block w-full overflow-x-auto mt-8">
            <table className="min-w-full text-left whitespace-nowrap">
              <thead>
                <tr className="bg-white">
                  <th className="px-4 py-3 w-12">S.N</th>
                  <th className="px-4 py-3 w-165">Name</th>
                  <th className="px-4 py-3 w-70">Product Type</th>
                  <th className="px-4 py-3 w-50">Quantity</th>
                  <th className="px-4 py-3 w-50">Price</th>
                  <th className="px-4 py-3 text-center">Delete</th>
                </tr>
              </thead>

              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={item._id} className="border-b">
                    <td className="px-4 py-3 w-12">{index + 1}</td>
                    <td className="px-4 py-3 max-w-xs truncate w-165">
                      {item.name}
                    </td>
                    <td className="px-4 py-3 w-70">{item.product_type}</td>
                    <td className="px-4 py-3 w-50">
                      <NumberSpinner
                        value={quantities[item._id] || 1}
                        onChange={(newQty) => handleQtyChange(item._id, newQty)}
                      />
                    </td>
                    <td className="px-4 py-3 w-50">
                      NRS {(quantities[item._id] || 1) * item.actual_price}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <DeleteIcon
                        className="cursor-pointer text-red-500"
                        fontSize="small"
                        onClick={() => dispatch(removeCartItems(item._id))}
                      />
                    </td>
                  </tr>
                ))}

                {/* TOTAL */}
                <tr className="bg-white font-bold">
                  <td colSpan="3" className="px-4 py-3 text-center">
                    Total Price
                  </td>
                  <td colSpan="2" className="px-4 py-3 text-center">
                    NRS {totalPrice.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ================= MOBILE VIEW (CARDS) ================= */}
          <div className="md:hidden m-4 space-y-4 w-85">
            {cartItems?.map((item, index) => (
              <div
                key={item._id}
                className="border rounded-lg p-4 shadow-sm bg-white"
              >
                <div className="flex justify-between">
                  <div className="flex gap-2 items-center">
                    <span className="font-semibold rounded-3xl bg-orange-400 text-white px-3">
                      {index + 1}
                    </span>
                    <img
                      width={100}
                      height={100}
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${item.image}`}
                      alt={item.name}
                    />
                  </div>
                  <DeleteIcon
                    className="text-red-500 cursor-pointer"
                    fontSize="small"
                    onClick={() => dispatch(removeCartItems(item._id))}
                  />
                </div>

                <p className="mt-2 font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">{item.product_type}</p>

                <NumberSpinner
                  value={quantities[item._id] || 1}
                  onChange={(newQty) => handleQtyChange(item._id, newQty)}
                />

                <p className="mt-2 font-semibold">
                  NRS {((quantities[item._id] || 1) * item.actual_price).toLocaleString()}
                </p>
              </div>
            ))}

            <div className="border-t pt-4 text-center font-bold text-lg">
              Total: NRS {totalPrice.toLocaleString()}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col md:flex-row gap-4 mt-6 md:items-center">
            <Link href="#">
              <div className="text-orange-400 hover:text-orange-600 hover:underline ml-8">
                Shop More
              </div>
            </Link>

            <button type='submit' onClick={handelPayButton} className="ml-auto text-white bg-orange-400 px-6 py-2 rounded hover:bg-orange-600 m-8">
              Pay Now
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default Page;
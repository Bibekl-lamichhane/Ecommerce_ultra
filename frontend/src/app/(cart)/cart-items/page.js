"use client";
import React from "react";
import ProductCard from "@/components/ProductCard";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { removeCartItems } from "@/redux/reducerslices/productSlice";
import Link from "next/link";
const page = () => {
const cartItems=useSelector(state=>state.product.cartItems)
const dispatch=useDispatch()
 let totalPrice=0
  return (
 <div className="text-gray-600 body-font ">
   {cartItems.length>0 ?<div className="  md:py-24 mx-auto">
     <div className="text-3xl text-orange-400 font-bold my-6 ">Your Cart Items: </div>
    <div className=" w-full  mx-auto overflow-auto">
      <table className="table-auto  text-left whitespace-no-wrap">
        <thead>
          <tr>
            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl md:w-30">S.N</th>
            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 max-w-30 lg:max-w-none">Name</th>
            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 md:w-80">Product Type</th>
            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 md:w-60 ">Price</th>
            <th className=" px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br cursor-pointer text-center md:30" >Delete</th>
          </tr>
        </thead>
        <tbody>{
          cartItems?.map((item,index)=>{
           
            totalPrice=item.actual_price+totalPrice
            return(<tr key={item._id}>
            <td className="px-4 py-3 ">{index+1}</td>
            <td className="px-4 py-3  max-w-32 truncate md:max-w-none md:whitespace-normal ">{item.name}</td>
            <td className="px-4 py-3 ">{item.product_type}</td>
            <td className="px-4 py-3 text-lg text-gray-900 w-">{item.actual_price}</td>
            <td className="w-10 text-center">
              <DeleteIcon fontSize="small" onClick={()=>dispatch(removeCartItems(item._id))}/>
            </td>
          </tr>)
          })
          }
          <tr> 
              <td  colSpan="2" className="px-4 py-3 title-font tracking-wider font-small text-gray-900  bg-gray-100 rounded-tl rounded-bl  text-center">Total Price:</td>
              <td colSpan="2" className="px-4 py-3 title-font tracking-wider font-small text-gray-900  text-center ">NRS {totalPrice}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
      <Link href='#'><div className="text-orange-400 hover:text-orange-600 inline-flex items-center md:mb-2 lg:mb-0 hover:underline">Shop More? Click here to ...</div>
      </Link>
      <button className="flex ml-auto text-white bg-orange-400 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded">Pay Now</button>
    </div>
  </div>:<div><div className="text-3xl text-orange-400 font-bold my-6 ">Your Cart is Empty </div><Link  href ='/'><div className="text-orange-400 inline-flex items-center m-2 lg:my-6  hover:text-orange-600 hover:underline">Shop Now</div>
      </Link></div>
}
      </div>
    
  );
};

export default page;

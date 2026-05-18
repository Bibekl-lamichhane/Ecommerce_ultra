"use client";
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from "react-redux";
const page = () => {
  const cartItems = useSelector((state) => state.product.cartItems);
  return (

      <div className="text-gray-600 body-font w-full">
    <div className="container px-5 md:py-24 mx-auto">
    <div className="flex flex-col text-center w-full md:mb-20">
      <h1 className=" text-2xl font-medium title-font mb-2 text-gray-900">My Orders</h1>
    </div>
    <div className=" w-full  lg:w-[225] mx-auto overflow-auto">
      <table className="table-auto w-full text-left whitespace-no-wrap">
        <thead>
          <tr>
            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">S.N</th>
            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Name</th>
            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Product Type</th>
            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Price</th>
            <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br">Delete</th>
          </tr>
        </thead>
        <tbody>{
          cartItems?.map((item,index)=>{
            return(<tr key={item._id}>
            <td className="px-4 py-3">{index+1}</td>
            <td className="px-4 py-3">{item.name}</td>
            <td className="px-4 py-3">{item.product_type}</td>
            <td className="px-4 py-3 text-lg text-gray-900">{item.actual_price}</td>
            <td className="w-10 text-center">
              <DeleteIcon fontSize="small"/>
            </td>
          </tr>)
          })
          }

        </tbody>
      </table>
    </div>
    <div className="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
      <a className="text-orange-400 inline-flex items-center md:mb-2 lg:mb-0">Learn More
        <svg fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
      </a>
      <button className="flex ml-auto text-white bg-orange-400 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded">Button</button>
    </div>
  </div>
      </div>
    
  );
};

export default page;

"use client";
import { IconButton } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactStars from "react-stars";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems, setWishItems ,removeWishItems} from "@/redux/reducerslices/productSlice";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import toast from "react-hot-toast";


const Page = () => {
  const params = useParams(); // ✅ correct
  const [productDetails, setProductDetails] = useState(null);
    const [size, setSize] = useState('');
  const cartItems=useSelector(state=>state.product.cartItems)
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(
        `http://localhost:8000/api/product/${params.id}`
      );
      const data = await res.json();
      setProductDetails(data.productDetails);
    };

    if (params?.id) fetchProduct();
  }, [params]);
  const backendURL = "http://localhost:8000";
  const imageUrl = `${backendURL}/uploads/${productDetails?.image}`;
  const wishLists=useSelector(state=>state.product.wishLists)
  const existInWishlist = wishLists?.some(
    item => item._id === productDetails?._id
  ); 
  const existInCartList=cartItems?.some(item=>item._id===params.id)
    const megasale =
      ((productDetails?.actual_price - productDetails?.discount_price) / productDetails?.actual_price) * 100 >= 50;
      if(!productDetails)return(<div>Loading...</div>)

  const handleChange = (event) => {
    setSize(event.target.value);
  };
const handleAddToWish=()=>{
  if(!existInWishlist){
   dispatch(setWishItems(productDetails))
   toast.success("Added to WishList")
  }
   else{
      dispatch(removeWishItems(productDetails))
      toast.error("Removed from WishList!")
   } 
}
const handleAddToCart=()=>{
 if (!existInCartList)
  {
  dispatch(setCartItems(productDetails))
   toast.success("Added to Cart")
 }
else toast.error("Item is already in you Cart!")

}
  return (
     
<div className="text-gray-600 body-font overflow-hidden flex justify-center items-center h-screen">
  <div className="container mx-auto">
    <div className="lg:w-300  mx-auto flex flex-wrap">
      <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-150 h-64 object-cover object-center rounded" src={imageUrl}/>
      <div className="lg:w-1/2 w-full lg:p-10 p-4">
      <div className="flex gap-5 my-3 items-center">
        <h2 className="text-sm title-font text-gray-500 ">{productDetails.usage}</h2>  {megasale && (
            <span className="flex justify-center items-center rounded-full bg-orange-400 p-2 text-xs font-medium text-slate-50 ">
              Mega Sale
            </span>
          )}
          </div>
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{productDetails.name}</h1>
        <div className="flex mb-4">
          <span className="flex items-center">
             <ReactStars
            count={5}
            value={productDetails.ratings}
            size={20}
            half={true}
            edit={false}
            color2={"#ffd700"}
          />
            <span className="text-gray-600 ml-3">{productDetails.no_of_ratings} Reviews</span>
          </span>
          <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
            <a className="text-gray-500">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a className="text-gray-500">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a className="text-gray-500">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
              </svg>
            </a>
          </span>
        </div>
        <p className="leading-relaxed">{productDetails.description}</p>
        <div className="flex  gap-18 mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
          <div className="flex">
            <span className="mr-3">Color :</span>
            <span>{productDetails.colour}</span>
          </div>
          <div className="flex ml-6 items-center">
             <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Size</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={size}
          label="Size"
          onChange={handleChange}
        >
          <MenuItem value={10}>SM</MenuItem>
          <MenuItem value={20}>M</MenuItem>
          <MenuItem value={30}>L</MenuItem>
          <MenuItem value={30}>XL</MenuItem>
        </Select>
      </FormControl>
    </Box>

          </div>
        </div>
        <div className="flex gap-4">
          <span className="title-font font-medium text-2xl text-gray-900">NRS {productDetails.actual_price}</span>
          <button onClick={handleAddToCart} className="flex ml-auto text-slate-50 bg-orange-400 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded hover:cursor-pointer">Add to cart</button>
        
         {/* Wishlist */ }
      <IconButton
        className=" bg-slate-50 p-8"
        
      >
        <FavoriteIcon className= {existInWishlist===true?"text-red-500" : "text-gray-500"} onClick={handleAddToWish} />
      </IconButton>
         
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default Page;
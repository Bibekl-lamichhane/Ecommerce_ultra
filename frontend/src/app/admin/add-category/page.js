"use client";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import toast from "react-hot-toast";
import FormControl from "@mui/material/FormControl";
import CreatableSelect from 'react-select/creatable';

const page = () => {
    const [fetchedCategoriesList, setFetchedCategoriesList] = useState([]); 
      const [usage, setUsage] = useState(null);
      const [product_type, setProduct_type] = useState(null);
      const [main_category, setMain_category] = useState(null);
      const [sub_category, setSub_category] = useState(null);
    const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
     
 
     const fetchInitally = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`);
          const data = await response.json();
          setFetchedCategoriesList(data);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };

  const handelAddMainCategory= (e) => {
      e.preventDefault(); // prevent page reload
    if(main_category===null){
      toast.error("Add Main Category First")
      return
    }
      const data = { 
      main_category: main_category
    };
    axios
      .post("http://localhost:8000/api/maincategory", data)
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((err) => {
        toast.error("Failed to add category");
        console.error(err);
      });
      fetchInitally()
  };
  const handelAddSubCategory= (e) => {
    e.preventDefault(); // prevent page reload
      if(sub_category===null){
      toast.error("Add Sub Category First")
      return
    }
    const data = {
      sub_category
    };
    axios
      .post("http://localhost:8000/api/subcategory", data)
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((err) => {
        toast.error("Failed to add Subcategory");
        console.error(err);
      });
      fetchInitally()
  };
  const handelAddUsage= (e) => {
    e.preventDefault(); // prevent page reload
          if(usage===null){
      toast.error("Add Usage First")
      return
    }
    const data = {
      usage
    };
    axios
      .post("http://localhost:8000/api/usage", data)
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((err) => {
        toast.error("Failed to add Usage");
        console.error(err);
      });
fetchInitally()
  };
  const handelAddProductType= (e) => {
    e.preventDefault(); // prevent page reload
          if(product_type===null){
      toast.error("Add Product Type First")
      return
    }
    const data = {
      product_type
    }
    axios
      .post("http://localhost:8000/api/producttype", data)
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((err) => {
        toast.error("Failed to Add Product Type");
        console.error(err);
      });
      fetchInitally()
  };

      useEffect(() => {
      fetchInitally();
    }, []);
  const mainCategoryOptions=fetchedCategoriesList?.main_category?.map((item)=>{
    return {value:item,label:item}
  })

  const subCategoryOptions=fetchedCategoriesList?.sub_category?.map((item)=>{
    return {value:item,label:item}
  })
  const productTypeOptions=fetchedCategoriesList?.sub_category?.map((item)=>{
    return {value:item,label:item}
  })
  const usageOptions=fetchedCategoriesList?.sub_category?.map((item)=>{
    return {value:item,label:item}
  })
  
const customStyles = {
   menu: (provided) => ({
    ...provided, 
   
  }),
   container: (provided) => ({
    ...provided,
    minHeight: '10px', // Set your desired tall height here
    height: 'auto', 
    
  }),

  // 2. Force the internal text wrapper to expand to match
  valueContainer: (provided) => ({
    ...provided,
    minHeight: '35px', // MUST match the control minHeight precisely
    height: '35px',
    padding: '0px 12px',
    display: 'flex',
    alignItems: 'center',
  }),

  // 3. Keep indicators vertically centered
  indicatorsContainer: (provided) => ({
    ...provided,
    height: '50px', // MATCH the height perfectly
  }),

  // 4. Force the hidden internal input line height to cooperate
  input: (provided) => ({
    ...provided,
    margin: '0px',
    padding: '0px',
  }),

 

  // 2. Option styles for hover/focus state
  option: (provided, state) => ({
    ...provided,
    // Background handling
    zIndex: 99,
    backgroundColor: state.isSelected 
      ? '#f0f0f0' // Background color when an item is actually clicked/selected
      : state.isFocused 
        ? '#fafafa' // Background color when mouse is hovering
        : '#ffffff', // Default background color

    // Text color handling
    color: state.isFocused 
      ? 'orange'  // Text turns orange on hover
      : '#000000', // Default text color is black

    // Optional: Keeps text orange even if clicked and held down
    '&:active': {
      backgroundColor: '#e6e6e6',
      color: 'orange',
    }
  }),

  // Optional: Ensure the text visible in the input box is also black
  singleValue: (provided) => ({
    ...provided,
    color: '#000000',
  })
};

  return (
    <div className="flex flex-col items-center  gap-10 md:mx-10  w-100 md:w-auto">
      <h1 className="text-3xl font-bold m-5 text-orange-400">Add Category:</h1>
      <form
        className="flex flex-col gap-12 text-xl  w-full"
        onSubmit={handelAddMainCategory}
      >
        <div className="flex justify-center ">
           <FormControl variant="outlined" sx={{ flex: 1 }}>     
      <CreatableSelect  styles={customStyles}  placeholder="Main Category" options={mainCategoryOptions}  onChange={(e) =>setMain_category(e.value)} className='bg-white' />
        </FormControl>
          <button
            className={`cursor-pointer  bg-amber-500 text-slate-50 p-1 md:px-6 ml-2 rounded-2xl w-30 md:w-60 text-[10px] md:text-lg`}
            type="submit"
          >
            Add Main Category
          </button>
        </div>
      </form>
      <form
        className="flex flex-col gap-12 text-xl  w-full"
        onSubmit={handelAddSubCategory}
      >
        <div className="flex justify-center">
          <FormControl variant="outlined" sx={{ flex: 1 }}>
                <CreatableSelect  styles={customStyles}  placeholder="Sub Category" options={subCategoryOptions} onChange={(e) => setSub_category(e.value)}  className='bg-white' />
          </FormControl>
          <button
            className={`cursor-pointer  bg-amber-500 text-slate-50 p-1 md:px-6 ml-2 rounded-2xl w-30 md:w-60 text-[10px] md:text-lg`}
            type="submit"
          >
            Add Sub Category
          </button>
        </div>
      </form>
      <form
        className="flex flex-col gap-12 text-xl  w-full"
        onSubmit={handelAddUsage}
      >
        <div className="flex justify-center">
           <FormControl variant="outlined" sx={{ flex: 1 }}>
                         <CreatableSelect  styles={customStyles}  placeholder="Usage" options={usageOptions} onChange={(e) => setUsage(e.value)}  className='bg-white' />
                   </FormControl>
          <button
            className={`cursor-pointer  bg-amber-500 text-slate-50 p-1 md:px-6 ml-2 rounded-2xl w-30 md:w-60 text-[10px] md:text-lg`}
            type="submit"
          >
            Add Usage
          </button>
        </div>
      </form>
      <form
        className="flex flex-col gap-12 text-xl  w-full"
        onSubmit={handelAddProductType}
      >
        <div className="flex justify-center w-full">
           <FormControl variant="outlined" sx={{ flex: 1 }}>
                          <CreatableSelect  styles={customStyles}  placeholder="Product Type" options={productTypeOptions} onChange={(e) => setProduct_type(e.value)}  className='bg-white' />
                    </FormControl>
          <button
            className={`cursor-pointer  bg-amber-500 text-slate-50 p-1 md:px-6 ml-2 rounded-2xl w-30 md:w-60 text-[10px] md:text-lg`}
            type="submit"
          >
            Add Product Type
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;

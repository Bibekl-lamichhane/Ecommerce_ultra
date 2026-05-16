"use client";
import React from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import toast from "react-hot-toast";

const page = () => {   
const handelAddProduct = (e) => {
  e.preventDefault(); // prevent page reload
  const formData = new FormData(e.target);
  const data = {
    main_category: formData.get("main_category"),
    sub_category: formData.get("sub_category")
  };
  axios
    .post("http://localhost:8000/api/add-category",data)
    .then((response) => {
      toast.success(response.data.message);
    })
    .catch((err) => {
      toast.error("Failed to add category");
      console.error(err);
    });
};

  return (
    <div className=" w-full flex flex-col items-center mx-40">
      <h1 className="text-3xl font-bold m-10">Add Category:</h1>
      <form className="flex flex-col gap-y-12 text-xl  w-full" onSubmit={handelAddProduct}>
        <TextField id="outlined-basic" label="Main Category" name='main_category' variant="outlined" />
        <TextField id="outlined-basic" label="Sub Category" name='sub_category' variant="outlined" />
        <button className='cursor-pointer bg-amber-500 text-white p-3 w-80 rounded-2xl' type='submit'>Add Category</button>
      </form>
    </div>
  );
};

export default page;





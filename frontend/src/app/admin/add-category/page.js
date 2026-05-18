"use client";
import React from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import toast from "react-hot-toast";

const page = () => {
  const handelAddMainCategory= (e) => {
    e.preventDefault(); // prevent page reload
    const formData = new FormData(e.target);
    const data = {
      main_category: formData.get("main_category"),
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
  };
  const handelAddSubCategory= (e) => {
    e.preventDefault(); // prevent page reload
    const formData = new FormData(e.target);
    const data = {
      sub_category: formData.get("sub_category"),
    };
    axios
      .post("http://localhost:8000/api/subcategory", data)
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((err) => {
        toast.error("Failed to add category");
        console.error(err);
      });
  };
  const handelAddUsage= (e) => {
    e.preventDefault(); // prevent page reload
    const formData = new FormData(e.target);
    const data = {
      usage: formData.get("usage"),
    };

    axios
      .post("http://localhost:8000/api/usage", data)
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((err) => {
        toast.error("Failed to add category");
        console.error(err);
      });
  };
  const handelAddProductType= (e) => {
    e.preventDefault(); // prevent page reload
    const formData = new FormData(e.target);
    const data = {
      product_type: formData.get("product_type"),
    }
    axios
      .post("http://localhost:8000/api/producttype", data)
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((err) => {
        toast.error("Failed to add category");
        console.error(err);
      });
  };

  return (
    <div className=" w-full flex flex-col items-center mx-40 gap-8">
      <h1 className="text-3xl font-bold m-10">Add Category:</h1>
      <form
        className="flex flex-col gap-12 text-xl  w-full"
        onSubmit={handelAddMainCategory}
      >
        <div className="flex justify-center">
          <TextField
            sx={{ width: "600px", marginRight: "20px" }}
            id="outlined-basic"
            label="Main Category"
            name="main_category"
            variant="outlined"
          />
          <button
            className="cursor-pointer bg-amber-500 text-white p-3 px-6  rounded-2xl w-60 text-x"
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
          <TextField
            sx={{ width: "600px", marginRight: "20px" }}
            id="outlined-basic"
            label="Sub Category"
            name="sub_category"
            variant="outlined"
          />
          <button
            className="cursor-pointer bg-amber-500 text-white p-3 px-6  rounded-2xl w-60 text-x"
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
          <TextField
            sx={{ width: "600px", marginRight: "20px" }}
            id="outlined-basic"
            label="Usage"
            name="usage"
            variant="outlined"
          />
          <button
            className="cursor-pointer bg-amber-500 text-white p-3 px-6  rounded-2xl w-60 text-x"
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
        <div className="flex justify-center">
          <TextField
            sx={{ width: "600px", marginRight: "20px" }}
            id="outlined-basic"
            label="Product Type"
            name="product_type"
            variant="outlined"
          />
          <button
            className="cursor-pointer bg-amber-500 text-white p-3 px-6  rounded-2xl w-60 text-x"
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

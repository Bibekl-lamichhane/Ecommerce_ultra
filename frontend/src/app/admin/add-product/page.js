"use client";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FileUploadButton from "@/components/FileUploadButton";
import axios from "axios";
import toast from "react-hot-toast";

const page = () => {
  const [fetchedCategoriesList, setFetchedCategoriesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [usage, setUsage] = useState("");
  const [product_type, setProduct_type] = useState("");
  const [main_category, setMain_category] = useState("");
  const [sub_category, setSub_category] = useState("");
  const [gender, setGender] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchInitally = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/categories");
        const data = await response.json();
        setFetchedCategoriesList(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchInitally();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;
  const handelAddProduct = (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a product image.");
      return;
    }

    if (!gender || !product_type || !usage || !main_category || !sub_category) {
      toast.error("Please fill all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("gender", gender);
    formData.append("product_type", product_type);
    formData.append("colour", e.target.colour.value);
    formData.append("usage", usage);
    formData.append("main_category", main_category);
    formData.append("sub_category", sub_category);
    formData.append("actual_price", e.target.actual_price.value);
    formData.append("discount_price", e.target.discount_price.value);
    formData.append("quantity", e.target.quantity.value);
    formData.append("description", e.target.description.value);
    formData.append("image", file);

    axios
      .post("http://localhost:8000/api/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast.success("Product Added!");
      })
      .catch((err) => {
        toast.error("Failed to Add Product");
        console.error(err);
      });
  };

  const handelFileChange = (fileFromButton) => {
    setFile(fileFromButton);
  };

  return (
    <div className="w-full flex flex-col items-center mx-40">
      <h1 className="text-3xl font-bold m-10 text-orange-500">Add Product:</h1>
      <form className="flex flex-col gap-y-8 text-xl w-full" onSubmit={handelAddProduct}>

        {/* Basic Info */}
        <TextField label="Name" name="name" variant="outlined" required />
 {/* Categories */}
        <div className="flex gap-6">
          <FormControl variant="outlined" sx={{ flex: 1 }}>
            <InputLabel>Main Category</InputLabel>
            <Select value={main_category} onChange={(e) => setMain_category(e.target.value)} label="Main Category">
              {fetchedCategoriesList?.main_category?.map((item) => (
                <MenuItem key={item} value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="outlined" sx={{ flex: 1 }}>
            <InputLabel>Sub Category</InputLabel>
            <Select value={sub_category} onChange={(e) => setSub_category(e.target.value)} label="Sub Category">
              {fetchedCategoriesList?.sub_category?.map((item) => (
                <MenuItem key={item} value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="flex gap-6">
          {/* Gender */}
          <FormControl variant="outlined" sx={{ flex: 1 }}>
            <InputLabel>Gender</InputLabel>
            <Select value={gender} onChange={(e) => setGender(e.target.value)} label="Gender">
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>

          {/* Colour */}
          <TextField label="Colour" name="colour" variant="outlined" sx={{ flex: 1 }} required />
        </div>

        <div className="flex gap-6">
          {/* Product Type */}
            <FormControl variant="outlined" sx={{ flex: 1 }}>
            <InputLabel>Product Type</InputLabel>
            <Select
              name="product_type"
              value={product_type}
              onChange={(e) => setProduct_type(e.target.value)}
              label="Product Type"
            >
              {fetchedCategoriesList?.product_type?.map((item) => (
                <MenuItem key={item} value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Usage */}
          <FormControl variant="outlined" sx={{ flex: 1 }}>
            <InputLabel>Usage</InputLabel>
            <Select
              name="usage"
              value={usage}
              onChange={(e) => setUsage(e.target.value)}
              label="Usage"
            >
              {fetchedCategoriesList?.usage?.map((item) => (
               <MenuItem key={item} value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

       

        {/* Pricing */}
        <div className="flex gap-6">
          <TextField label="Actual Price" name="actual_price" type="number" variant="outlined" sx={{ flex: 1 }} />
          <TextField label="Discount Price" name="discount_price" type="number" variant="outlined" sx={{ flex: 1 }} />
        </div>

        <TextField label="Quantity" name="quantity" type="number" variant="outlined" />
        <TextField label="Description" name="description" multiline rows={4} variant="outlined" />

        <FileUploadButton FileChange={handelFileChange} />

        <button className="cursor-pointer bg-amber-500 text-white p-3 text-sm rounded-2xl mb-2" type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default page;
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
import CreatableSelect from 'react-select/creatable';
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`);
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
  const mainCategoryOptions=fetchedCategoriesList?.main_category.map((item)=>{
    return {value:item,label:item}
  })

  const subCategoryOptions=fetchedCategoriesList?.sub_category.map((item)=>{
    return {value:item,label:item}
  })
  const productTypeOptions=fetchedCategoriesList?.sub_category.map((item)=>{
    return {value:item,label:item}
  })
  const usageOptions=fetchedCategoriesList?.sub_category.map((item)=>{
    return {value:item,label:item}
  })
  
const customStyles = {
   menu: (provided) => ({
    ...provided, 
    zIndex: 99,
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
    <div className="w-full flex flex-col items-center ">
      <h1 className="text-3xl font-bold mb-10 mt-5 text-orange-400">Add Product:</h1>
      <form className="flex flex-col gap-y-8 text-xl w-full" onSubmit={handelAddProduct}>

        {/* Basic Info */}
        <TextField label="Name" name="name" variant="outlined" required />
        {/* Categories */}
        <div className="flex gap-6">
          <FormControl variant="outlined" sx={{ flex: 1 }}>     
      <CreatableSelect  styles={customStyles}  placeholder="Main Category" options={mainCategoryOptions}  onChange={(e) => setMain_category(e.value)}  className='bg-white' />
          </FormControl>

          <FormControl variant="outlined" sx={{ flex: 1 }}>
                <CreatableSelect  styles={customStyles}  placeholder="Sub Category" options={subCategoryOptions} onChange={(e) => setSub_category(e.value)}  className='bg-white' />
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
                <CreatableSelect  styles={customStyles}  placeholder="Product Type" options={productTypeOptions} onChange={(e) => setProduct_type(e.value)}  className='bg-white' />
          </FormControl>
          {/* Usage */}
         <FormControl variant="outlined" sx={{ flex: 1 }}>
                <CreatableSelect  styles={customStyles}  placeholder="Usage" options={usageOptions} onChange={(e) => setUsage(e.value)}  className='bg-white' />
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

        <button className="cursor-pointer bg-amber-500 text-slate-50 p-3 text-sm rounded-2xl mb-2" type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default page;
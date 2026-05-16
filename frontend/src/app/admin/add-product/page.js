"use client";
import React from "react";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FileUploadButton from '@/components/FileUploadButton'
import  { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";


const page = () => {
    const[fetchedData,setFetchedData]=useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [main_category, setMain_category] = useState('');
    const [sub_category, setSub_category] = useState('');
    const[file,setFile]=useState(null)
    const [name,setName]=useState('')

     useEffect(() => {
    // POST request using fetch with async/await
    const fetchInitally=async()=>{
    try{
    const response = await fetch("http://localhost:8000/api/fetch-category");
    const data = await response.json();
     setFetchedData(data);
     setLoading(false)
    }   catch(error){
      console.log(error)
      setError(error)
      setLoading(false)
                  }
    }
     fetchInitally()
  },[]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;

  const handelAddProduct = (e) => {
  e.preventDefault(); // prevent page reload

  const formData = new FormData();
  formData.append("name", e.target.name.value);
  formData.append("discount_price", e.target.discount_price.value);
  formData.append("actual_price", e.target.actual_price.value);
  formData.append("quantity", e.target.quantity.value);
  formData.append("description", e.target.description.value);
  formData.append("main_category", main_category);
  formData.append("sub_category", sub_category);
  formData.append("image", file);
  axios
    .post("http://localhost:8000/api/add-product",formData)
    .then((response) => {
      toast.success("Product Added!",response.message);
    })
    .catch((err) => {
      toast.error("Failed to Add Product");
      console.error(err);
    });
};

 const handelFileChange=(fileFromButton)=>{
  setFile(fileFromButton)
  console.log(file)
 }
  const handleChange1 = (event) => {
    setMain_category(event.target.value);
  };
  const handleChange2 = (event) => {
    setSub_category(event.target.value);
  };
  return (
    <div className=" w-full flex flex-col items-center mx-40">
      <h1 className="text-3xl font-bold m-10 text-orange-500">Add Product:</h1>
      <form className="flex flex-col gap-y-12 text-xl  w-full "  onSubmit={handelAddProduct}>
        <TextField id="outlined-basic" label="Name" name='name' variant="outlined" />

        <FormControl variant="outlined" sx={{  minWidth: 123 }}>
        <InputLabel id="main-category-select-label">Main Category</InputLabel>
        <Select
          labelId="main_category-label"
          id="main_category"
          value={main_category}
          onChange={handleChange1}
          label="main_category"
        >
          {fetchedData?.main_category?.map((item) => {
         return  <MenuItem value={item} key={item}>{item}</MenuItem>
        })}
        </Select>
      </FormControl>
        <FormControl variant="outlined" sx={{  minWidth: 123 }}>
        <InputLabel id="sub-category-label">Sub Category</InputLabel>
        <Select
          labelId="sub-category-select-label"
          id="sub-category-select"
          value={sub_category}
          onChange={handleChange2}
          label="main_category"
        >
          {fetchedData?.sub_category?.map((item) => {
         return  <MenuItem value={item} key={item}>{item}</MenuItem>
        })}
        </Select>
      </FormControl>
        <TextField id="outlined-basic" label="Discount Price" name="discount_price" variant="outlined" />
        <TextField id="outlined-basic" label="Actual Price" name="actual_price" variant="outlined" />
        <TextField id="outlined-basic" label="Quantity" name="quantity" variant="outlined" />
        <TextField
          id="filled-textarea"
          label="Description"
          placeholder="Enter description"
          multiline
          variant='outlined'
          name="description"
        />
        <FileUploadButton FileChange={handelFileChange}/>
        <button className='cursor-pointer bg-amber-500 text-white p-3 w-80 rounded-2xl' type='submit' >Add Product</button>
      </form>
    </div>
  );
};

export default page;





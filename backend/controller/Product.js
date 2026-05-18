const mongoose = require('mongoose')
const Product=require('../models/Product')
const Category=require('../models/Category')

const fetchProducts=async(req,res)=>{
  try{
  const products= await Product.find()
  res.status(200).json({status:"success",message:"Product fetched from DB",products})
  }
  catch(error){
    res.status(500).json({status:"failed",message:"Failed to fetch products from DB"})
  }

}
const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        status: "failed",
        message: "Product not found",
      });
    }

    res.json({
      status: "success",
      productDetails: product,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Error fetching product",
    });
  }
};

const addProduct= async (req,res) => {
 
  try {
    const {name,gender,product_type,colour,usage,main_category,sub_category,discount_price,actual_price,quantity,description}=req.body
    const image=req.file
    if (!image) {
      return res.status(400).json({status:"failed",message:"Image file is required"})
    }
    await Product.create({name,gender,product_type,colour,usage,main_category,sub_category,discount_price,actual_price,quantity,description,image:image.filename})
    res.status(200).json({status:"success",message:"Product added successfully"})
  } catch (error) {
    res.status(500).json({status:"failed",message:error.message || error})
  } 
}

module.exports={addProduct,fetchProducts,getProductDetails}

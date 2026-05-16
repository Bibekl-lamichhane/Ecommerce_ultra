const Product=require('../models/Product')
const Category=require('../models/Category')

 const fetchCategory=async(req,res)=>{
     try {
    const main_category = await Category.distinct("main_category");
     const sub_category = await Category.distinct("sub_category");
    //Later i can change Product model cat and keep only cat once i have custom database
    res.status(200).json({main_category,sub_category});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

 const addCategory=async(req,res)=>{
     try {
    const{main_category,sub_category}=req.body
    await Category.create({main_category,sub_category})
    res.status(200).json({status:"success",message:"Category added successfully"});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const fetchProducts=async(req,res)=>{
  try{
  const products= await Product.find({})
  res.status(200).json({status:"success",message:"Product fetched from DB",products})
  }
  catch(error){
    res.status(500).json({status:"failed",message:"Failed to fetch products from DB"})
  }

}

const addProduct= async (req,res) => {
  try {
    const {name,main_category,sub_category,discount_price,actual_price,quantity,description}=req.body
    const image=req.file
    console.log(req.body,req.file)
    await Product.create({name,main_category,sub_category,discount_price,actual_price,quantity,description,image:image.filename})
    res.status(200).json({status:"success",message:"Product added sucessfully"})
  } catch (error) {
    res.status(500).json({status:"failed",message:error})
  } 
}

module.exports={fetchCategory,addProduct,addCategory,fetchProducts}

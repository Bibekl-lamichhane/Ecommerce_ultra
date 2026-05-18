const Category=require('../models/Category')
const fetchCategory=async(req,res)=>{
     try {
    const main_category = await Category.distinct("main_category");
     const sub_category = await Category.distinct("sub_category");
     const product_type = await Category.distinct("product_type");
     const usage = await Category.distinct("usage");
    res.status(200).json({main_category,sub_category,product_type,usage});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

 const addMainCategory=async(req,res)=>{
     try {
    const{main_category}=req.body
    await Category.create({main_category})
    res.status(200).json({status:"success",message:"Main Category added successfully"});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

 const addSubCategory=async(req,res)=>{
     try {
    const{sub_category}=req.body
    await Category.create({sub_category})
    res.status(200).json({status:"success",message:"Sub Category added successfully"});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

 const addUsage=async(req,res)=>{
     try {
    const{usage}=req.body
    await Category.create({usage})
    res.status(200).json({status:"success",message:"Usage added successfully"});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

 const addProductType=async(req,res)=>{
     try {
    const{product_type}=req.body
    await Category.create({product_type})
    res.status(200).json({status:"success",message:"Product Type added successfully"});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
module.exports={fetchCategory,addMainCategory,addSubCategory,addProductType,addUsage}
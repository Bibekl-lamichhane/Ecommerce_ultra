const express = require("express");
const router = express.Router();
const  {fetchCategory} = require("../controller/Category");
const  {addMainCategory,addSubCategory,addProductType,addUsage } = require("../controller/Category");

router.get('/categories',fetchCategory)
router.post('/maincategory',addMainCategory)
router.post('/subcategory',addSubCategory)
router.post('/usage',addUsage)
router.post('/producttype',addProductType)

module.exports=router
const express = require("express");
const { fetchCategory, addCategory } = require("../controller/Product");
const { addProduct,fetchProducts } = require("../controller/Product");
const router = express.Router();
const multer  = require('multer')
//image upload 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix+'.jpg')
  }
})

const upload = multer({ storage: storage })

router.get('/fetch-category',fetchCategory)
router.get('/fetch-products',fetchProducts)
router.post('/add-product',addProduct)
router.post('/add-category',upload.single('image'),addCategory)

module.exports=router
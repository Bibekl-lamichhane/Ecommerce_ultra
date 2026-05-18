const express = require("express");
const router = express.Router();
const {addProduct,fetchProducts,getProductDetails } = require("../controller/Product");

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

router.get('/products',fetchProducts)
router.get('/product/:id',getProductDetails)
router.post('/product',upload.single('image'),addProduct)

module.exports=router
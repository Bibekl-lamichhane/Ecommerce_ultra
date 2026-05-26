const express = require('express');
const path =require('path')
const app = express();
const cors = require('cors');
const dbConnect = require('./dbConnection');
require('dotenv').config();
const userRoutes=require('./api/User')
const productRoutes=require('./api/Product')
const categoryRoutes=require('./api/Category')
const messageRoutes=require('./api/Message')
//DB
dbConnect()
//MiddleWares
app.use(cors());
app.use(express.json())
app.use('/api',userRoutes);
app.use('/api',productRoutes);
app.use('/api',categoryRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/api',messageRoutes)
//server listning in port
app.listen(process.env.PORT, () => {
    console.log(`Server is runnning in Port : `+ process.env.PORT )
});
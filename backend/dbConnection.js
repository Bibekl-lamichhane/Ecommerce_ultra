const mongoose = require('mongoose');
const dbConnect=async()=>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/test');
        console.log("Connected to database successfully");
    }
catch(err){
    console.log("Error connecting to database",err);
}
}
module.exports = dbConnect;

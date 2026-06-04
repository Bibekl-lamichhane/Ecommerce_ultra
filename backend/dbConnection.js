const mongoose = require('mongoose');
const dbConnect=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to database successfully");
    }
catch(err){
    console.log("Error connecting to database",err);
}
}
module.exports = dbConnect;

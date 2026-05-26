const Message=require('../models/Message')

const sendedMessage=async(req,res)=>{
const {senderId,recieverId,message}=req.body
try{
const response=await Message.create({senderId,recieverId,message})
res.status(200).json({response})
}
catch(err){
console.log(err)
}  
}
const allMessageHistory = async (req, res) => {
  try {
    const { senderId, recieverId } = req.params;

    const messages = await Message.find({
      $or: [
        {
          senderId: senderId,
          recieverId: recieverId,
        },
        {
          senderId: recieverId,
          recieverId: senderId,
        },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json({ messages });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
module.exports={sendedMessage,allMessageHistory}
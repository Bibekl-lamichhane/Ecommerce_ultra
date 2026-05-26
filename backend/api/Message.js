const express=require('express')
const {sendedMessage,allMessageHistory} = require('../controller/Message')
const router=express.Router()

router.post('/message',sendedMessage)
router.get('/message/:senderId/:recieverId',allMessageHistory)
module.exports=router
const express = require('express');
const path =require('path')
const app = express();
//websocket import
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const cors = require('cors');
const dbConnect = require('./dbConnection');
require('dotenv').config();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  },
  path: '/socket.io',
});
const userRoutes=require('./api/User')
const productRoutes=require('./api/Product')
const categoryRoutes=require('./api/Category')
const messageRoutes=require('./api/Message')

//websocket connection
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
     socket.broadcast.emit('sendChatmessage', msg);
  });
}); 

//DB
dbConnect()
//MiddleWares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json())
app.use('/api',userRoutes);
app.use('/api',productRoutes);
app.use('/api',categoryRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/api',messageRoutes)
//server listning in port
server.listen(process.env.PORT, () => {
    console.log(`Server is runnning in Port : `+ process.env.PORT )
});


"use client";
import { Tab, Tabs, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import {setdetailsOfReciever} from '@/redux/reducerslices/messageSlice'
import Typography from '@mui/material/Typography';
const ChatInterface = () => {
  
  const [text, setText] = useState("");
  const { _id } = useSelector((state) => state.user.userDetails);
  const detailsOfReciever = useSelector((state) => state.message.detailsOfReciever);
  const [messages, setMessages] = useState([]);
  const [value, setValue] = React.useState(1);
  const [userList,setUserList]=useState([])

  const dispatch=useDispatch()
  useEffect(() => {
  fetchUserList()
}, [])
  useEffect(() => {
  if(detailsOfReciever?._id){
    fetchMessage()
  }
}, [detailsOfReciever])

const messagesEndRef = React.useRef(null);
// Automatically scroll to bottom when messages array updates
useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);

  const fetchUserList=async()=>{
    const {data}= await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`)
    setUserList(data.users)
  }
  const fetchMessage=async()=>{
    const {data}= await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/message/${_id}/${detailsOfReciever._id}`)
    setMessages(data.messages)

  }
  const handleChange = (event, newValue) => {
    if(detailsOfReciever._id){
       setValue(newValue);
    }
  };
const selectUserToChat=(details)=>{
  dispatch(setdetailsOfReciever(details))
  setValue(0)
}

  const handelChange = (e) => {
    setText(e.target.value);
  };
  const sendChat = async () => {
    try {
      const {data}  = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/message`,
        { message: text, senderId: _id ,recieverId:detailsOfReciever._id},
      );
      setText('')
        fetchMessage()
       if (!data) {
        return toast.error("Failed to send message");
      }
    } catch (err) {
      console.log(err);
    }   
  };
  const loadChat=<div className="">
          <div className="text-orange-500  font-extrabold mb-5">
            Message From {detailsOfReciever.username}:
          </div>
          {/* Load Chat */}
         <div className="h-155 flex-col overflow-y-scroll">
 {messages.map((m, key) => {
  const isMine = m.senderId === _id;

  return (
    <div
      key={key}
      className={`flex flex-col ${
        isMine ? "items-end" : "items-start"
      }`}
    >
      <div
        className={`px-3 py-2 rounded-2xl m-2 max-w-75 ${
          isMine
            ? "bg-blue-500 text-white"
            : "bg-gray-300 text-black"
        }`}
      >
        <p>{m.message}</p>

        <p className="text-xs text-right opacity-60 mt-1">
          {new Date(m.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
})} <div ref={messagesEndRef} />
          </div>
          
          {/* sending button */}
          <div className="flex items-center gap-2">
            <TextField
              sx={{ width: 325 }}
              value={text}
              onChange={handelChange}
            />
            <div>
              <button
                onClick={sendChat}
                className="bg-orange-500 text-white px-6 py-2 rounded-3xl cursor-pointer"
              >
                Send
              </button>
            </div>
          </div>
        </div>
const loadOnlineList = (
  <List
    sx={{
      width: 410,
      height:"600px"
    }}
  >
    {userList.map((item, key) => {
      return (
        <React.Fragment key={key}>
          <ListItem
            alignItems="flex-start"
            onClick={()=>selectUserToChat(item)}
          >
            <ListItemAvatar>
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
              />
            </ListItemAvatar>

            <ListItemText
              primary={item.username}
              secondary={
                <React.Fragment>
                  <span className="flex items-center">
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{
                        color: "text.primary",
                        display: "inline",
                        marginRight: 2,
                      }}
                    >
                      {item.email}
                    </Typography>

                    {item.phonenumber}
                  </span>
                </React.Fragment>
              }
            />
          </ListItem>

          <Divider variant="inset" component="li" />
        </React.Fragment>
      );
    })}
  </List>
);
  return (
    <div><Tabs
          value={value}
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
        <Tab label="Chat"  sx={{marginRight:15, marginLeft:8,}}/>
         <Tab label="Online"/>
        </Tabs>
      <div className="text-black flex justify-center items-center mt-3">
       {value===0?loadChat :loadOnlineList}
      </div>
    </div>
  );
};

export default ChatInterface;

"use client";

import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { setdetailsOfReciever } from "@/redux/reducerslices/messageSlice";

import { Tab, Tabs, TextField } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Typography from "@mui/material/Typography";

// SOCKET OUTSIDE COMPONENT
const socket = io("http://localhost:8000", {
  autoConnect: false,
});

const ChatInterface = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [userList, setUserList] = useState([]);
  const [value, setValue] = useState(1);

  const dispatch = useDispatch();

  const { _id, role } = useSelector(
    (state) => state.user.userDetails
  );

  const detailsOfReciever = useSelector(
    (state) => state.message.detailsOfReciever
  );

  // REFS
  const chatContainerRef = useRef(null);
  const messagesEndRef = useRef(null);

  // CONNECT SOCKET ONLY ONCE
  useEffect(() => {
    socket.connect();

    return () => {
      socket.off("sendChatmessage");
      socket.disconnect();
    };
  }, []);

  // FETCH USERS
  useEffect(() => {
    fetchUserList();
  }, []);

  // FETCH CHAT WHEN USER CHANGES
  useEffect(() => {
    if (detailsOfReciever?._id) {
      fetchMessage();
    }
  }, [detailsOfReciever?._id]);

  // SOCKET LISTENER
  useEffect(() => {
    socket.on("sendChatmessage", (incomingMessage) => {
      // FILTER CURRENT CHAT ONLY
      const isCurrentChat =
        (incomingMessage.senderId === detailsOfReciever?._id &&
          incomingMessage.recieverId === _id) ||
        (incomingMessage.senderId === _id &&
          incomingMessage.recieverId === detailsOfReciever?._id);

      if (!isCurrentChat) return;

      setMessages((prev) => [...prev, incomingMessage]);
    });

    return () => {
      socket.off("sendChatmessage");
    };
  }, [detailsOfReciever?._id, _id]);

  // SMART AUTO SCROLL
  useEffect(() => {
  const container = chatContainerRef.current;

  if (!container) return;

  // Distance from bottom
  const isNearBottom =
    container.scrollHeight - container.scrollTop - container.clientHeight < 100;

  if (isNearBottom) {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }
}, [messages]);

  
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));
// FETCH USER LIST
  const fetchUserList = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`
      );

      if (role === "user") {
        const filteredUsers = data.users.filter(
          (user) => user.role === "admin"
        );

        setUserList(filteredUsers);
      }

      if (role === "admin") {
        const filteredUsers = data.users.filter(
          (user) => user.role === "user"
        );

        setUserList(filteredUsers);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // FETCH MESSAGES
  const fetchMessage = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/message/${_id}/${detailsOfReciever._id}`
      );

      setMessages(data.messages);
    } catch (err) {
      console.log(err);
    }
  };

  // TAB CHANGE
  const handleChange = (event, newValue) => {
    if (detailsOfReciever?._id) {
      setValue(newValue);
    }
  };

  // SELECT USER
  const selectUserToChat = (details) => {
    dispatch(setdetailsOfReciever(details));
    setValue(0);
  };

  // INPUT CHANGE
  const handelChange = (e) => {
    setText(e.target.value);
  };

  // SEND MESSAGE
  const sendChat = async () => {
    if (!text.trim()) return;

    const messagePayload = {
      message: text,
      senderId: _id,
      recieverId: detailsOfReciever._id,
      createdAt: new Date().toISOString(),
    };

    // OPTIMISTIC UI
    setMessages((prev) => [...prev, messagePayload]);

    // CLEAR INPUT FAST
    setText("");

    try {
      // SOCKET REALTIME SEND
      socket.emit("chat message", messagePayload);

      // SAVE TO DATABASE
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/message`,
        messagePayload
      );

      if (!data) {
        toast.error("Failed to send message");
      }
    } catch (err) {
      console.log(err);
      toast.error("Message failed");
    }
  };

  // CHAT UI
  const loadChat = (
    <div >
      <div className="text-orange-500 font-extrabold mb-5 "  ref={chatContainerRef}>
        Message From {detailsOfReciever?.username}
      </div>

      {/* CHAT BODY */}
      <div  className=" h-150 md:h-100 overflow-y-scroll flex flex-col" >
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
        })}

        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}
      <div className="flex items-center gap-2 mt-3 ">
        <TextField
          sx={{minWidth:305 }}
          value={text}
          onChange={handelChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendChat();
            }
          }}
        />

        <button
          onClick={sendChat}
          className="bg-orange-500 text-white px-6 py-2 rounded-3xl cursor-pointer"
        >
          Send
        </button>
      </div>
    </div>
  );

  // USER LIST UI
  const loadOnlineList = (
    <List
    >
      {userList.map((item, key) => {
        return (
          <React.Fragment key={key}>
            <ListItem
              alignItems="flex-start"
              onClick={() => selectUserToChat(item)}
              sx={{ cursor: "pointer" ,  }}
            >
              <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
        sx={{marginRight:2, marginTop:1}}
      >
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </StyledBadge>

              <ListItemText
                primary={item.username}
                secondary={
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
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="chat tabs"
      >
        <Tab
          label="Chat"
          sx={{
            marginRight: 15,
            marginLeft: 8,
          }}
        />

        <Tab label="Online" />
      </Tabs>

      <div className="text-black flex justify-center items-center mt-3 ">
        {value === 0 ? loadChat : loadOnlineList}
      </div>
    </div>
  );
};

export default ChatInterface;
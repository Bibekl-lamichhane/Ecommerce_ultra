"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useSelector, useDispatch } from "react-redux";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Button, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import SearchBar from "./SearchBar";
import { setLogout } from "@/redux/reducerslices/userSlice";
import { useRouter } from "next/navigation";
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import user_navbar from '@/config/user_navbar'
import CancelIcon from '@mui/icons-material/Cancel';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';


import Link from "next/link";
const NavBar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const userDetails = useSelector((state) => state.user.userDetails);
  const cartItems=useSelector((state)=>state.product.cartItems)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
const [open, setOpen] = React.useState(false);
  const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const [isDarkMode, setDarkMode] = React.useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
  };
    
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handelLogOut = async () => {
    dispatch(setLogout());
    router.push("/");
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      sx={{ mt: 4, ml: 2 }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      
    >
        <MenuItem onClick={handleMenuClose}>
          <Avatar  sx={{bgcolor:"orange" , width: 34, height: 34  }}/> <p className="mx-2 text-black ">{userDetails.username}</p>
        </MenuItem>
        <Divider />
        <Link href='/customer-support'><MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <SupportAgentIcon  fontSize="small" />
          </ListItemIcon>
          Get Support
        </MenuItem></Link>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={()=>handelLogOut() }>
        <div className="hover:text-red-500 w-full">
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout</div>
        </MenuItem>
    </Menu>
  );
  

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
      <div className="bg-white text-orange text-2xl font-bold ">
      <div className="flex text-xl font-extrabold">
      <Box  role="presentation" onClick={toggleDrawer(false)}>
         <div className='text-orange-400'>
          <div className='ml-95 pt-6 '><CancelIcon fontSize="large" /></div>
           <div className=' flex justify-center items-center w-full'>
           <div className='flex justify-center items-center   rounded-3xl my-2'><img
              src="logo-blue.png"
              alt="Logo" 
              className="w-25 h-25 mr-2 inline-block"
            /></div> 
          </div> 
          </div>
           <hr/>
      <List >     
          {user_navbar.map((text, key) => (
            <div className="hover:text-orange-400 hover:font-bold w-screen pl-6 my-8" key={key}>
              <Link href={text.link}>
                <ListItem disablePadding>
                  <ListItemButton key={text.id}>
                    <ListItemText
                      primary={text.name}
                      key={text.id}
                      disableTypography="true"
                      sx={{ fontSize: "20px", margin: "10px" }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            </div>
          ))}
        </List>  
      </Box>
      </div>
      </div>)
  return (
    <div>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="warning">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: {  xs: "hidden" ,md: "none" } }}
          >
      <Button onClick={toggleDrawer(true) }><MenuIcon sx={{color:"white"}} fontSize="large"/></Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <img
              src="/logo.png"
              alt="Logo"
              className="h-15  w-15 mr-2 inline-block"
            />
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "flex", md: "flex" } }}>
               <div className="hidden md:flex pt-2"><SearchBar /></div>
              <div className="flex items-center mx-2 md:mx-6">
                <div>
                  <Link href='/cart-items'><IconButton
                    size="large"
                    aria-label="show 4 new mails"
                   
                  >
                    <Badge badgeContent={cartItems?.length} color="error">
                    <ShoppingCartIcon/>
                    </Badge>
                  </IconButton></Link>
                   {token&&
                  <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                  
                  >
                    <Badge badgeContent={17} color="error">
                      <NotificationsIcon />
                    </Badge>
                    
                  </IconButton>}
                </div>
                {!token && (
                <div className="flex items-center gap-2 md:gap-4  md:ml-10 text-white">
                  <a href="/sign-in">
                           <button className="inline-flex text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded text-lg cursor-pointer">Log In</button>
                  </a>
                  <a href="/sign-up">
                         <button className="inline-flex text-white bg-orange-400 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded text-lg cursor-pointer">Sign up</button>

                  </a>
                </div>)}
                
              </div>
            
            {token && (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar   sx={{bgcolor:"orange" , width: 34, height: 34  }}/>
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {token && renderMenu}
    </Box></div>
  );
};
export default NavBar;

"use client";
import React from "react";
import admin_navbar from "@/config/admin_navbar.json";
import SideBar from "@/components/SideBar";
import Divider from "@mui/material/Divider";
import CancelIcon from "@mui/icons-material/Cancel";
import Link from "next/link";
import ListItemIcon from "@mui/material/ListItemIcon";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import { setLogout } from "@/redux/reducerslices/userSlice";

const layout = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const token = useSelector((state) => state.user.token);
  const userDetails = useSelector((state) => state.user.userDetails);
  const cartItems=useSelector((state)=>state.product.cartItems)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
const [open, setOpen] = React.useState(false);
  const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    
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
        <MenuItem onClick={handleMenuClose}>
          <Avatar  sx={{bgcolor:"orange" , width: 34, height: 34  }}/> <p className="mx-2">My account</p>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
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
    <div className="bg-orange-400 text-slate-50 text-2xl font-bold h-screen">
      <div className="flex text-xl font-extrabold">
        <Box role="presentation" onClick={toggleDrawer(false)}>
          <div>
            <div className="ml-86 pt-6 ">
              <CancelIcon fontSize="large" />
            </div>
            <div className="flex justify-center items-center py-6">
              <div>
                <AdminPanelSettingsIcon sx={{ fontSize: "40px" }} />
              </div>
              <div>
                <ListItemButton>AdminPanel</ListItemButton>
              </div>
            </div>
          </div>
          <hr />
          <List>
            {admin_navbar.map((text, key) => (
              <div
                className="hover:text-orange-400 hover:font-bold w-screen pl-6 my-10"
                key={key}
              >
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
    </div>
  );
  return (
    <div className='md:flex'>
    <div >
      <div className="bg-orange-400 text-slate-50 w-screen  flex items-center  justify-between md:hidden h-18 gap-4">
        <Button onClick={toggleDrawer(true)}>
          <MenuIcon fontSize="large" sx={{ color: "white" }} />
        </Button>
        <div className="mr-4">
         {!token && (
                <div className="flex items-center gap-2 md:gap-4  md:ml-10 text-amber-50">
                  <a href="/sign-in">
                    <Button color="inherit">Login</Button>
                  </a>
                  <a href="/sign-up">
                    <Button variant="outlined" color="inherit">
                      Signup
                    </Button>
                  </a>
                </div>)}
              
            
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
            )}</div>
      </div>
      <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      </div>
      <div className="w-[250] hidden md:block  md:w-[230] my-30">
          <SideBar data={admin_navbar} key={admin_navbar.id} />
      </div>
      {token && renderMenu}
    </div>
    <div className="lg:w-300 lg:py-10 mx-4">{children}</div></div>
  );
};

export default layout;

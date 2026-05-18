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
} from "@mui/material";
const layout = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const DrawerList = (
    <div className="bg-orange-400 text-slate-50 text-2xl font-bold h-screen">
      <div className="flex text-xl font-extrabold">
        <Box role="presentation" onClick={toggleDrawer(false)}>
          <div>
            <div className="ml-95 pt-6 ">
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
      <div className="bg-orange-400 text-slate-50 w-screen  flex items-center md:hidden h-18">
        <Button onClick={toggleDrawer(true)}>
          <MenuIcon fontSize="large" sx={{ color: "white" }} />
        </Button>
      </div>
      <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      </div>
      <div className="w-[250] hidden md:block  md:w-[230] my-30">
          <SideBar data={admin_navbar} key={admin_navbar.id} />
      </div>
      
    </div>
    <div className="lg:w-300 lg:py-10 mx-4">{children}</div></div>
  );
};

export default layout;

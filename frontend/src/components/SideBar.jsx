"use client";
import * as React from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Link from "next/link";
export default function SideBar(props) {
  const isAdmin=props.data[0].link=='/admin'
  return (
    <div>
      {(isAdmin) ? <div className="flex text-xl font-extrabold text-orange-400 p-8">
        <AdminPanelSettingsIcon sx={{ fontSize: "40px" }} />
        <ListItemButton>AdminPanel</ListItemButton>
      </div>:<div></div>}
      <Divider />
      <List>
        {props.data.map((text, key) => (
          <div className="hover:text-orange-400 hover:font-bold" key={key}>
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
    </div>
  );
}

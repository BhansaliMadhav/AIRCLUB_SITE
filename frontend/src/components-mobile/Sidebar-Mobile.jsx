import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";

import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import SmartButtonOutlinedIcon from "@mui/icons-material/SmartButtonOutlined";

import {
  ChevronRightOutlined,
  ShoppingCartOutlined,
  AdminPanelSettingsOutlined,
} from "@mui/icons-material";
import AnnouncementOutlinedIcon from "@mui/icons-material/AnnouncementOutlined";

import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";

import { useEffect } from "react";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
const drawerWidth = window.innerWidth;

const navItems = [
  {
    text: "Announcement",
    icon: <AnnouncementOutlinedIcon />,
  },
  {
    text: "Events",
    icon: <EventOutlinedIcon />,
  },
  {
    text: "Projects",
    icon: null,
  },
  {
    text: "Projects",
    icon: <ShoppingCartOutlined />,
  },
  {
    text: "Members",
    icon: null,
  },
  {
    text: "Current Members",
    icon: <PeopleOutlineOutlinedIcon />,
  },
  {
    text: "Become Member",
    icon: <GroupAddOutlinedIcon />,
  },
  {
    text: "Management",
    icon: null,
  },
  {
    text: "Admin",
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    text: "Technology Stacks",
    icon: <SmartButtonOutlinedIcon />,
  },
];

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
  backgroundColor: "transparent",
}));

export default function SidebarMobile() {
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    var str = pathname.substring(1);
    var replaced = str.replace("%20", " ");

    setActive(replaced);
  }, [pathname]);
  return (
    <Box sx={{ display: "flex" }} mt={"0.55rem"}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        flexGrow={1}
        columnGap={"75vw"}
      >
        <IconButton onClick={handleDrawerOpen} sx={{ ml: "0.5rem" }}>
          <MenuOutlinedIcon sx={{ fontSize: "25px" }} />
        </IconButton>
      </Box>
      <Drawer
        sx={{
          background: "transparent ",
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon sx={{ fontSize: "25px" }} />
            ) : (
              <MenuOutlinedIcon sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
        </DrawerHeader>

        <List>
          {navItems.map(({ text, icon }) => {
            if (!icon) {
              return (
                <Typography
                  key={text}
                  variant="h4"
                  sx={{ m: "2.25rem 0 1rem 3rem" }}
                >
                  {text}
                </Typography>
              );
            }
            const lcText = text.toLowerCase();
            return (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate(`/${lcText}`);
                    handleDrawerClose();
                  }}
                  sx={{
                    backgroundColor:
                      active === lcText
                        ? theme.palette.background.alt
                        : "transparent",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      ml: "2rem",
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ variant: "h5" }}
                    primary={text}
                  />
                  {active === lcText && (
                    <ChevronRightOutlined sx={{ ml: "auto" }} />
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </Box>
  );
}

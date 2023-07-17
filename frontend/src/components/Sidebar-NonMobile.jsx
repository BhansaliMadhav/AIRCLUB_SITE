import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import {
  ChevronRightOutlined,
  ShoppingCartOutlined,
  AdminPanelSettingsOutlined,
} from "@mui/icons-material";
import List from "@mui/material/List";

import IconButton from "@mui/material/IconButton";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { tokens } from "theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import AnnouncementOutlinedIcon from "@mui/icons-material/AnnouncementOutlined";
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { ColorModeContext } from "theme";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";

const drawerWidth = 300;
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
];

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function SidebarNonMobile() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = React.useState(false);
  const colorMode = useContext(ColorModeContext);

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
    <Box sx={{ display: "flex" }} mt={"1rem"}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        flexGrow={"1"}
        width="100vw"
      >
        <IconButton sx={{ ml: "2rem" }} onClick={handleDrawerOpen}>
          <ChevronRightIcon />
        </IconButton>
        <IconButton sx={{ ml: "90vw" }} onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon fontSize="large" />
          ) : (
            <LightModeOutlinedIcon fontSize="large" />
          )}
        </IconButton>
      </Box>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: theme.palette.background.default,
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <List>
          {navItems.map(({ text, icon }) => {
            if (!icon) {
              return (
                <Typography
                  key={text}
                  variant="h3"
                  sx={{ m: "2.25rem 0 1rem 3rem" }}
                >
                  {text}
                </Typography>
              );
            }
            const lcText = text.toLowerCase();

            return (
              <ListItem
                key={text}
                disablePadding
                sx={{
                  backgroundColor:
                    active === lcText
                      ? theme.palette.background.alt
                      : "transparent",
                }}
              >
                <ListItemButton
                  onClick={() => {
                    navigate(`/${lcText}`);
                    setActive(lcText);
                    handleDrawerClose();
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
                    primaryTypographyProps={{ variant: "h4" }}
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

import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";

import { AppBar, Toolbar, Typography } from "@mui/material";

import { useLocation, useNavigate } from "react-router-dom";
import { tokens } from "theme";

const navItems = [
  {
    text: "Home",
  },
  {
    text: "Announcement",
  },
  {
    text: "Events",
  },
  {
    text: "Projects",
    icon: null,
  },

  {
    text: "Current Members",
  },
  {
    text: "Become Member",
  },
  {
    text: "Admin",
  },
  {
    text: "Technology Stacks",
  },
];

export default function SidebarNonMobile() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [active, setActive] = useState("");
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" sx={{ background: "transparent" }}>
        <Toolbar>
          <Box columnGap={"15.5%"} display={"flex"}>
            <Typography
              mt={"1.175%"}
              variant="h1"
              fontWeight={"500"}
              sx={{ flexGrow: 1 }}
            >
              AI&R
            </Typography>
            {/* Display the navigation items in the AppBar */}

            {navItems.map(({ text, icon }) => {
              const lcText = text.toLowerCase();

              return (
                <Box
                  key={text}
                  disablePadding
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor:
                      active === lcText
                        ? theme.palette.background.alt
                        : "transparent",
                  }}
                  onClick={() => {
                    navigate(`/${lcText}`);
                  }}
                >
                  <Typography fontSize={"16px"} fontWeight={"600"}>
                    {text}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

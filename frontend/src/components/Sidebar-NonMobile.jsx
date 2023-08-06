import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";
import { Fade } from "react-reveal";

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
      <AppBar
        position="sticky"
        sx={{
          background: "transparent",
          flexDirection: "column", // Stack content vertically on smaller screens
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
          whiteSpace: "nowrap", // Prevent text from wrapping
        }}
      >
        <Box width={"100%"}>
          <Toolbar>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              width={"100vw"}
              sx={{
                // Add media queries to adjust the gap between items and font size based on screen width
                "@media (max-width: 1024px)": {
                  gap: "8%", // Reduce gap between items on smaller screens
                },
                "@media (max-width: 768px)": {
                  gap: "5%", // Further reduce gap on even smaller screens
                },
              }}
            >
              <Typography mt={"1.175%"} variant="h1" fontWeight={"500"}>
                AI&R
              </Typography>

              {navItems.map(({ text }) => {
                const lcText = text.toLowerCase();

                return (
                  <Box
                    key={text}
                    sx={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      backgroundColor:
                        active === lcText
                          ? theme.palette.background.alt
                          : "transparent",
                      transition: "color 0.3s", // Add transition for smooth color change
                      "&:hover": {
                        color: "black", // Change the text color on hover to black
                        animation: "pulse 1s",
                      },
                    }}
                    onClick={() => {
                      navigate(`/${lcText}`);
                    }}
                  >
                    <Typography
                      fontSize={"1rem"}
                      fontWeight={"600"}
                      color="white"
                    >
                      {text}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Toolbar>
        </Box>
      </AppBar>
    </React.Fragment>
  );
}

import React, { useState, useEffect } from "react";
import { useTheme, Box, Typography } from "@mui/material";
import { tokens } from "theme";
import Fade from "react-reveal/Fade";

const HeaderNonMobile = ({ title, subTitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [showHeader, setShowHeader] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowHeader(true);
    } else {
      setShowHeader(false);
    }
  };

  useEffect(() => {
    // Show the header immediately when the component mounts
    setShowHeader(true);

    // Listen for the scroll event to control the animation
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box sx={{ color: "black" }}>
      <Fade top when={showHeader}>
        <Typography
          fontSize={"70px"}
          color={theme.palette.text.alt}
          fontWeight="bold"
          sx={{ mb: "5px" }}
        >
          {title}
        </Typography>
      </Fade>
      <Fade bottom when={showHeader}>
        <Typography fontSize={"30px"} color="#8FC82D">
          {subTitle}
        </Typography>
      </Fade>
    </Box>
  );
};

export default HeaderNonMobile;

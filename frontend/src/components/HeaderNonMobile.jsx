import React from "react";
import { useTheme, Box, Typography } from "@mui/material";
import { tokens } from "theme";

const HeaderNonMobile = ({ title, subTitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box sx={{ color: "black" }}>
      <Typography
        variant="h1"
        color={theme.palette.text.default}
        fontWeight={"bold"}
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography variant="h4" color={theme.palette.text.alt}>
        {subTitle}
      </Typography>
    </Box>
  );
};

export default HeaderNonMobile;

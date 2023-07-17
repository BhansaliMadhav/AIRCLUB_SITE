import React from "react";
import { useTheme, Box, Typography } from "@mui/material";
import { tokens } from "theme";

const HeaderMobile = ({ title, subTitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box>
      <Typography
        variant="h2"
        color={theme.palette.text.default}
        fontWeight={"bold"}
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography variant="h6" color={theme.palette.text.alt}>
        {subTitle}
      </Typography>
    </Box>
  );
};

export default HeaderMobile;

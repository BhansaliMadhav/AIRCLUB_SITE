import React from "react";
import { useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import SidebarAdmin from "components/SidebarAdmin";
import SidebarAdminMobile from "components-mobile/SidebarAdminMobile";
import Footer from "components/Footer";

import { tokens } from "theme";
const LayoutAdmin = () => {
  const isNonMobile = useMediaQuery("(min-width:768px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      display={isNonMobile ? "block" : "block"}
      width={"100%"}
      height={"100%"}
    >
      {isNonMobile ? <SidebarAdmin /> : <SidebarAdminMobile />}

      <Outlet />
      <Footer />
    </Box>
  );
};

export default LayoutAdmin;

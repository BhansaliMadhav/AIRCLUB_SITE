import React from "react";

import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "components/Footer";

import SidebarAdmin from "components/SidebarAdmin";
import SidebarAdminMobile from "components-mobile/SidebarAdminMobile";
const AdminLayout = () => {
  const isNonMobile = useMediaQuery("(min-width:768px)");
  const theme = useTheme();
  return (
    <Box
      display={isNonMobile ? "block" : "block"}
      width={"100%"}
      height={"100%"}
      sx={{ backgroundColor: theme.palette.background.default }}
    >
      {isNonMobile ? <SidebarAdmin /> : <SidebarAdminMobile />}
      <Outlet />
      <Footer />
    </Box>
  );
};

export default AdminLayout;

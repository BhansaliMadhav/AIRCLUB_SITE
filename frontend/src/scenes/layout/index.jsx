import React from "react";

import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import SidebarMobile from "components-mobile/Sidebar-Mobile";
import SidebarNonMobile from "components/Sidebar-NonMobile";
import { tokens } from "theme";
import Footer from "components/Footer";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width:768px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      display={isNonMobile ? "block" : "block"}
      width={"100%"}
      height={"100%"}
    >
      {isNonMobile ? <SidebarNonMobile /> : <SidebarMobile />}

      <Outlet />
      <Footer />
    </Box>
  );
};

export default Layout;

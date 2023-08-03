import React from "react";
import { useState, useEffect } from "react";
import { ClientJS } from "clientjs";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import SidebarMobile from "components-mobile/Sidebar-Mobile";
import SidebarNonMobile from "components/Sidebar-NonMobile";
import { tokens } from "theme";
import Footer from "components/Footer";
let clientJs = "";

function MyComponent() {
  useEffect(() => {
    const client = new ClientJS();
    const fingerprint = client.getFingerprint();
    console.log("Fingerprint:", fingerprint);
  }, []);
}
const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width:768px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  MyComponent();

  return (
    <Box
      display={isNonMobile ? "block" : "block"}
      width={"100%"}
      height={"100%"}
      sx={{ backgroundColor: theme.palette.background.default }}
    >
      {isNonMobile ? <SidebarNonMobile /> : <SidebarMobile />}

      <Outlet />
      <Footer />
    </Box>
  );
};

export default Layout;

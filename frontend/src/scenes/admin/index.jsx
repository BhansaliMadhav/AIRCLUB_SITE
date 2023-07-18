import React, { useState } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
  TextField,
} from "@mui/material";
import { tokens } from "theme";
import HeaderMobile from "components-mobile/HeaderMobile";
import HeaderNonMobile from "components/HeaderNonMobile";
import Footer from "components/Footer";
import { useNavigate } from "react-router-dom";
const Admin = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery("(max-width:686px)");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function Login(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:5001/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({
        userId,
        password,
      }),
    });
    const data = await response.json();
    if (data.user) {
      localStorage.setItem("token", data.user);
      // alert("Login Successful");
      console.log("triggered success");
      navigate("/admin-controls");
    } else {
      console.log("triggered failure");
      alert("Please Check your userId and password");
    }
    // console.log(data);
  }
  return (
    <Box m={isMobile ? "2vh 5vw" : "1.5rem 2.5rem"}>
      {isMobile ? (
        <HeaderMobile
          title={"Admin Login"}
          subTitle={"Login to access Admin Previllages"}
        />
      ) : (
        <HeaderNonMobile
          title={"Admin Login"}
          subTitle={"Login to access Admin Previllages"}
        />
      )}
      <Box mt={"3rem"}>
        <form onSubmit={Login}>
          <Box width={"100%"} display={"flex"} justifyContent={"center"}>
            <Box
              gap="30px"
              width={isMobile ? "200px" : "20%"}
              display={"inline-block"}
              alignItems={"center"}
              justifyContent="space-around"
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="User Id"
                onChange={(e) => setUserId(e.target.value)}
                name="firstName"
                sx={{ margin: "1rem 0" }}
                autoComplete="off"
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
                name="lastName"
                sx={{ margin: "1rem 0" }}
                autoComplete="off"
              />
            </Box>
          </Box>
          <Box display="flex" justifyContent="center" mt="20px">
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              sx={{ width: isMobile ? "200px" : "20%" }}
            >
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Admin;

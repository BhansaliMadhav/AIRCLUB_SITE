import React, { useState } from "react";
import { Box, useTheme, Button, TextField, FormControl } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tokens } from "theme";
import HeaderMobile from "components-mobile/HeaderMobile";
import HeaderNonMobile from "components/HeaderNonMobile";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Footer from "components/Footer";

const BecomeMember = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery("(max-width:768px)");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [link, setLink] = useState("");

  const [domain, setDomain] = React.useState("");
  const [domainOther, setDomainOther] = React.useState("");

  const handleChangeDomain = (event) => {
    setDomain(event.target.value);
  };
  const handleChangeDomainOther = (event) => {
    setDomainOther(event.target.value);
  };

  async function handleFormSubmit(event) {
    event.preventDefault();
    console.log({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      department: department,
      domain: domain === "Others" ? domainOther : domain,
      link: link,
    });
    const response = await fetch(
      process.env.REACT_APP_BASE_URL + "/member/becomeMember",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${process.env.REACT_APP_UserApiKey}`,
        },

        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          department,
          domain,
          link,
        }),
      }
    );
    const data = await response.json();
    if (data.requestRecived === true) {
      alert("Request Submitted");
    } else {
      alert("Request Already recived with one of the same contact details");
    }
    console.log(data);
  }

  return (
    <Box m={isMobile ? "2vh 5vw" : "1.5rem 2.5rem"}>
      {isMobile ? (
        <HeaderMobile
          title={"Become A Member"}
          subTitle={"Fill out the form to become a member"}
        />
      ) : (
        <HeaderNonMobile
          title={"Become A Member"}
          subTitle={"Fill out the form to become a member"}
        />
      )}
      <Box mt={"3rem"} justifyContent={"center"} display={"flex"}>
        <form onSubmit={handleFormSubmit} style={{ width: "75%" }}>
          <Box
            display="grid"
            rowGap={"30px"}
            columnGap={"5rem"}
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: !isMobile ? undefined : "span 4" },
              "& #file-upload-button": {
                color: "transparent",
              },
            }}
          >
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="First Name"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              name="firstName"
              required
              autoComplete="off"
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              name="lastName"
              required
              sx={{ gridColumn: "span 2" }}
              autoComplete="off"
            />
            <TextField
              fullWidth
              variant="filled"
              type="email"
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name="email"
              required
              sx={{ gridColumn: "span 2" }}
              autoComplete="off"
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Department"
              onChange={(e) => setDepartment(e.target.value)}
              value={department}
              name="department"
              required
              sx={{ gridColumn: "span 2" }}
              autoComplete="off"
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Contact Number"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              name="phone"
              required
              sx={{ gridColumn: "span 2" }}
              autoComplete="off"
            />

            {/* Resume link here */}
            <TextField
              fullWidth
              variant="filled"
              type="url"
              label="Drive link to Your Resume(Make Sure it is Accessible)"
              onChange={(e) => setLink(e.target.value)}
              value={link}
              name="phone"
              required
              sx={{ gridColumn: "span 2" }}
              autoComplete="off"
            />

            <FormControl required>
              <Box>
                <InputLabel id="demo-simple-select-helper-label">
                  Select Domain
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  variant="filled"
                  id="demo-simple-select-helper"
                  value={domain}
                  label="Domain"
                  onChange={handleChangeDomain}
                  sx={{ gridColumn: "span 1" }}
                  fullWidth
                  placeholder="Select Domain"
                >
                  <MenuItem value={"Robotics"}>Robotics</MenuItem>
                  <MenuItem value={"AI"}>AI</MenuItem>
                  <MenuItem value={"Others"}>Others(please Specify)</MenuItem>
                </Select>
              </Box>
            </FormControl>

            {domain === "Others" ? (
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Domain"
                onChange={handleChangeDomainOther}
                value={domainOther}
                name="phone"
                required
                sx={{ gridColumn: "span 1" }}
                autoComplete="off"
              />
            ) : (
              ""
            )}
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
              Create New User
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default BecomeMember;

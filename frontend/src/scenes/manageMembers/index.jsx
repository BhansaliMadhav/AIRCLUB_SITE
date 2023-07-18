import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";
import { useGetNewDataQuery } from "state/api";
import {
  Box,
  InputLabel,
  Select,
  useTheme,
  Button,
  TextField,
  FormControl,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tokens } from "theme";
import HeaderMobile from "components-mobile/HeaderMobile";
import HeaderNonMobile from "components/HeaderNonMobile";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  {
    field: "_id",
    headerName: "ID",
    flex: 1,
  },
  {
    field: "firstName",
    headerName: "First Name",
    flex: 1,
  },
  {
    field: "lastName",
    headerName: "Last Name",
    flex: 1,
  },
  {
    field: "position",
    headerName: "Position",
    flex: 1,
  },
  // Add more columns as needed
];

const ManageMember = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  async function populateQuote() {
    const req = await fetch(process.env.REACT_APP_BASE_URL + "api/quote", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const data = await req.json();
    if (data.status === "ok") {
    } else {
      alert(data.error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/admin");
      } else {
        populateQuote();
      }
    } else {
      navigate("/admin");
    }
  }, [navigate]);

  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery("(max-width:768px)");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");

  const [photo, setPhoto] = useState("");
  const [year, setYear] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [position, setPosition] = useState("");
  const [unit, setUnit] = useState("ADD");
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const { data, isLoading } = useGetNewDataQuery();
  // console.log(data);
  const handleChange = (event, newUnit) => {
    if (newUnit !== null) {
      setUnit(newUnit);
    }
  };

  const handleChangePosition = (event) => {
    setPosition(event.target.value);
  };
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
    const response = await fetch(
      process.env.REACT_APP_BASE_URL + "member/add",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
          department: department,
          rollNumber: rollNumber,
          photo: photo,
          position: position,
          year: year,
          domain: domain === "Others" ? domainOther : domain,
        }),
      }
    );
    const data = await response.json();
    // console.log("data", data);
    if (data.status === "200") {
      alert(data.message);
      window.location.reload();
    } else {
      alert(data.error);
    }
    // console.log({});
  }

  async function handleRemove(event) {
    event.preventDefault();
    const response = await fetch(
      process.env.REACT_APP_BASE_URL + "member/remove",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: selectedMemberId,
        }),
      }
    );
    const data = await response.json();
    // console.log("data", data);
    if (data.status === "200") {
      alert(data.message);
    } else {
      alert(data.error);
    }
  }

  return (
    <Box m={isMobile ? "2vh 5vw" : "1.5rem 2.5rem"}>
      {isMobile ? (
        <HeaderMobile
          title={"Manage Members"}
          subTitle={"Fill out the form to Add a Member"}
        />
      ) : (
        <HeaderNonMobile
          title={"Manage Members"}
          subTitle={"Fill out the form to Add a Member"}
        />
      )}
      <Box mt={"3rem"}>
        <form onSubmit={handleFormSubmit}>
          <Box width={"100%"} display={"flex"} justifyContent={"center"}>
            <ToggleButtonGroup
              color="secondary"
              value={unit}
              exclusive
              onChange={handleChange}
              aria-label="Unit"
            >
              <ToggleButton
                value="ADD"
                key={"ADD"}
                sx={{
                  height: "52.71px",
                  width: "12rem",
                  borderBottom: unit === "ADD" ? "none" : "inherit",
                }}
              >
                ADD
              </ToggleButton>
              <ToggleButton
                value="REMOVE"
                key={"REMOVE"}
                sx={{
                  height: "52.71px",
                  width: "12rem",
                  borderBottom: unit === "REMOVE" ? "none" : "inherit",
                }}
              >
                REMOVE
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          {unit === "ADD" ? (
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              gridAutoRows={"50px"}
              mt={"60px"}
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
                type="text"
                label="Roll Number"
                onChange={(e) => setRollNumber(e.target.value)}
                value={rollNumber}
                name="Year"
                required
                sx={{ gridColumn: "span 2" }}
                autoComplete="off"
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Year"
                onChange={(e) => setYear(e.target.value)}
                value={year}
                name="Year"
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
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Drive link for Photo "
                onChange={(e) => setPhoto(e.target.value)}
                value={photo}
                required
                name="photo"
                sx={{ gridColumn: "span 2" }}
                autoComplete="off"
              />
              <FormControl required sx={{ gridColumn: "span 2" }}>
                <Box>
                  <InputLabel id="demo-simple-select-helper-label">
                    Select Position
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    variant="filled"
                    id="demo-simple-select-helper"
                    value={position}
                    label="Position"
                    onChange={handleChangePosition}
                    sx={{ gridColumn: "span 2" }}
                    fullWidth
                    placeholder="Select Position"
                  >
                    <MenuItem value={"Member"}>Member</MenuItem>
                    <MenuItem value={"Executive"}>Executive</MenuItem>
                    <MenuItem value={"Jr-Secretary"}>Jr-Secretary</MenuItem>
                    <MenuItem value={"Co-Secretary"}>Co-Secretary</MenuItem>
                    <MenuItem value={"Secretary"}>Secretary</MenuItem>
                  </Select>
                </Box>
              </FormControl>
              {/* Form fields for adding a member */}
              <FormControl required>
                <Box>
                  <InputLabel id="demo-simple-select-helper-label">
                    Domain Of Intrest
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
          ) : undefined}

          {unit === "REMOVE" ? (
            <Box
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              gridAutoRows={"50px"}
              mt={"60px"}
              sx={{
                "& > div": { gridColumn: !isMobile ? undefined : "span 4" },
                "& #file-upload-button": {
                  color: "transparent",
                },
              }}
            >
              <Box display="flex" justifyContent="center">
                <TextField
                  style={{ width: "25%" }}
                  variant="filled"
                  type="text"
                  label="Member ID"
                  onChange={(e) => setSelectedMemberId(e.target.value)}
                  value={selectedMemberId}
                  name="selectedMemberId"
                  required
                  autoComplete="off"
                />
              </Box>
              {/* Form fields for removing a member */}
            </Box>
          ) : undefined}

          <Box display="flex" justifyContent="center" mt="20px">
            {unit === "REMOVE" ? (
              <Button
                type="button"
                color="secondary"
                variant="contained"
                onClick={handleRemove}
              >
                Remove Member
              </Button>
            ) : (
              <Button type="submit" color="secondary" variant="contained">
                Add New Member
              </Button>
            )}
          </Box>
        </form>
        {unit === "REMOVE" ? (
          <Box height={"74vh"} marginTop={"40px"}>
            <DataGrid
              loading={!data || isLoading}
              columns={columns}
              rows={data || []}
              getRowId={(row) => row._id}
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: theme.palette.background.alt,
                  color: colors.primary[100],
                  borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: colors.primary[500],
                },
                "& .MuiDataGrid-footerContainer": {
                  backgroundColor: theme.palette.background.alt,
                  color: colors.primary[100],
                  borderTop: "none",
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: `${colors.primary[200]} !important`,
                },
              }}
            />
          </Box>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

export default ManageMember;

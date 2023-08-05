import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, useMediaQuery, useTheme, Button, TextField } from "@mui/material";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { tokens } from "theme";
import HeaderMobile from "components-mobile/HeaderMobile";
import HeaderNonMobile from "components/HeaderNonMobile";
import { useGetAnnouncementsQuery } from "state/api";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
const columns = [
  {
    field: "_id",
    headerName: "ID",
    flex: 1,
  },
  {
    field: "title",
    headerName: "Title",
    flex: 1,
  },
  {
    field: "link",
    headerName: "Document Link",
    flex: 1,
  },
];

const ManageAnnouncement = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  async function populateQuote() {
    const req = await fetch(process.env.REACT_APP_BASE_URL + "/api/quote", {
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
  });
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery("(max-width:768px)");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [_id, set_id] = useState("");
  const { data, isLoading } = useGetAnnouncementsQuery();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [copiedText, setCopiedText] = useState("");

  async function Add(event) {
    event.preventDefault();
    const response = await fetch(
      process.env.REACT_APP_BASE_URL + "/announcement/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${process.env.REACT_APP_AdminApiKey}`,
        },

        body: JSON.stringify({
          title: title,
          link,
        }),
      }
    );
    const data = await response.json();
    console.log(data.status);
    if (data.status === 200) {
      alert("Announcement Added Successfully");
    } else {
      alert("There was an error Adding Announcement Please try Again later");
    }
    window.location.reload();
  }
  const handleCopyClick = (event) => {
    const idToCopy = event.value;

    navigator.clipboard.writeText(idToCopy);

    setCopiedText(idToCopy);

    setIsSnackbarOpen(true);
    setTimeout(() => {
      setIsSnackbarOpen(false);
    }, 3000);
  };

  async function Remove(event) {
    event.preventDefault();
    const response = await fetch(
      process.env.REACT_APP_BASE_URL + "/announcement/remove",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${process.env.REACT_APP_AdminApiKey}`,
        },

        body: JSON.stringify({
          _id,
        }),
      }
    );
    const data = await response.json();
    console.log("data", data);
    if (data.status === "200") {
      alert(data.message);
    } else {
      alert(data.error);
    }
    window.location.reload();
  }

  const [unit, setUnit] = React.useState("ADD");

  const handleChange = (event, newUnit) => {
    if (newUnit !== null) {
      setUnit(newUnit);
    }
  };
  return (
    <Box m={isMobile ? "2vh 5vw" : "1.5rem 2.5rem"}>
      {isMobile ? (
        <HeaderMobile
          title={"Manage Announcements"}
          subTitle={"Add or remove Announcements"}
        />
      ) : (
        <HeaderNonMobile
          title={"Manage Announcements"}
          subTitle={"Add or remove Announcements"}
        />
      )}
      <Box mt={"3rem"}>
        <form onSubmit={unit === "ADD" ? Add : Remove}>
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
                  borderBottom: unit === "ADD" ? "none" : "inherit",
                }}
              >
                REMOVE
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box width={"100%"} display={"flex"} justifyContent={"center"}>
            <Box
              gap="30px"
              width={isMobile ? "200px" : "20%"}
              display={"inline-block"}
              alignItems={"center"}
              justifyContent="space-around"
              margin={"1rem"}
            >
              {unit === "ADD" ? (
                <Box>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Title"
                    onChange={(e) => setTitle(e.target.value)}
                    name="firstName"
                    sx={{ margin: "1rem 0" }}
                    autoComplete="off"
                    value={title} // Use the trimmed title here
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Link"
                    onChange={(e) => setLink(e.target.value)}
                    name="lastName"
                    sx={{ margin: "1rem 0" }}
                    autoComplete="off"
                  />
                </Box>
              ) : (
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Id"
                  onChange={(e) => set_id(e.target.value)}
                  name="firstName"
                  sx={{ margin: "1rem 0" }}
                  autoComplete="off"
                />
              )}
            </Box>
          </Box>
          <Box display="flex" justifyContent="center" mt="20px">
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              sx={{ width: isMobile ? "200px" : "20%" }}
            >
              {unit}
            </Button>
          </Box>
        </form>
        {unit === "REMOVE" ? (
          <Box height={"74vh"} marginTop={"40px"}>
            <DataGrid
              loading={isLoading || !data}
              columns={columns}
              rows={data || []}
              getRowId={(row) => row._id}
              onCellClick={(event) => {
                handleCopyClick(event);
              }}
              sx={{
                cursor: "pointer",
                "& .MuiDataGrid-root": {
                  border: "none",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                "& .name-column--cell": {
                  color: colors.greenAccent[300],
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: colors.blueAccent[700],
                  borderBottom: "none",
                },
                "& .MuiDataGrid-virturalScroller": {
                  backgroundColor: colors.primary[400],
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: "none",
                  backgroundColor: colors.blueAccent[700],
                },
              }}
            />
          </Box>
        ) : (
          ""
        )}
      </Box>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={2000} // Adjust the time as needed (in milliseconds)
        onClose={() => setIsSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{
          transform: "translateY(-30px)",
        }}
      >
        <Alert
          onClose={() => setIsSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {`"${copiedText}" Copied!`}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ManageAnnouncement;

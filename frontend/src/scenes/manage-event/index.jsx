import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
  TextField,
} from "@mui/material";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { tokens } from "theme";
import HeaderMobile from "components-mobile/HeaderMobile";
import HeaderNonMobile from "components/HeaderNonMobile";
import { useGetEventDataQuery } from "state/api";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";
import Footer from "components/Footer";

const columns = [
  {
    field: "_id",
    headerName: "ID (Click to Copy)",
    flex: 1,
  },
  {
    field: "Event_title",
    headerName: "Title",
    flex: 1,
  },
  {
    field: "Event_date",
    headerName: "Date of Event",
    flex: 1,
  },
  {
    field: "Event_description",
    headerName: "Description",
    flex: 1,
  },
  {
    field: "Event_photos",
    headerName: "Photos",
    flex: 1,
  },
];

const ManageEventData = () => {
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
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState(new Date());
  const [eventDescription, setEventDescription] = useState("");
  const [eventPhotos, setEventPhotos] = useState("");
  // console.log(eventDate.toString());

  const [_id, set_id] = useState("");
  const { data, isLoading } = useGetEventDataQuery();
  const [copiedData, setCopiedDate] = useState("");
  async function Add(event) {
    event.preventDefault();
    const response = await fetch(
      process.env.REACT_APP_BASE_URL + "/event/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${process.env.REACT_APP_AdminApiKey}`,
        },

        body: JSON.stringify({
          Event_title: eventTitle,
          Event_date: eventDate.toString(),
          Event_description: eventDescription,
          Event_photos: eventPhotos,
        }),
      }
    );
    const data = await response.json();
    if (data.status === "200") {
      alert("Event Added Successfully");
    } else {
      alert("There was an error Adding Event Please try Again later");
    }
    window.location.reload();
  }

  async function Remove(event) {
    event.preventDefault();
    const response = await fetch(
      process.env.REACT_APP_BASE_URL + "/event/remove",
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
          title={"Manage Events"}
          subTitle={"Add or remove Events"}
        />
      ) : (
        <HeaderNonMobile
          title={"Manage Events"}
          subTitle={"Add or remove Events"}
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
                    onChange={(e) => setEventTitle(e.target.value)}
                    name="eventTitle"
                    sx={{ margin: "1rem 0" }}
                    autoComplete="off"
                    value={eventTitle}
                    required
                  />
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    Event Date
                  </Typography>
                  <div className="datepicker-container">
                    <ReactDatePicker
                      selected={eventDate}
                      onChange={(date) => setEventDate(date)}
                      dateFormat="dd/MM/yyyy"
                      label="Date"
                      name="eventDate"
                      autoComplete="off"
                      className="custom-datepicker"
                      showTimeSelect
                    />
                    {unit === "ADD" && !eventDate && (
                      <Box
                        position="absolute"
                        top={0}
                        left={0}
                        width="100%"
                        height="100%"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        fontWeight="bold"
                        color="#FFF"
                        backgroundColor="#000"
                        opacity={0.9}
                        zIndex={1}
                      >
                        Please pick an event date
                      </Box>
                    )}
                  </div>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Description"
                    onChange={(e) => setEventDescription(e.target.value)}
                    name="eventDescription"
                    sx={{ margin: "1rem 0" }}
                    autoComplete="off"
                    value={eventDescription}
                    required
                  />

                  <TextField
                    fullWidth
                    variant="filled"
                    type="url"
                    label="Photos"
                    onChange={(e) => setEventPhotos(e.target.value)}
                    name="eventPhotos"
                    sx={{ margin: "1rem 0" }}
                    autoComplete="off"
                    value={eventPhotos}
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
                navigator.clipboard.writeText(event.value);
              }}
              disableSelectionOnClick
              sx={{
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
        ) : undefined}
      </Box>
    </Box>
  );
};

export default ManageEventData;

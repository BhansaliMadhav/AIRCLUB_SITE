import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
  Box,
  InputLabel,
  useMediaQuery,
  useTheme,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { tokens } from "theme";
import HeaderMobile from "components-mobile/HeaderMobile";
import HeaderNonMobile from "components/HeaderNonMobile";
import { useGetProjectDataQuery } from "state/api";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";

const columns = [
  {
    field: "_id",
    headerName: "ID",
    flex: 1,
  },
  {
    field: "Project_title",
    headerName: "Title",
    flex: 1,
  },
  {
    field: "Project_description",
    headerName: "Project Description",
    flex: 1,
  },
  {
    field: "Current_fundings",
    headerName: "Project Fundings",
    flex: 1,
  },
  {
    field: "Project_contact_person",
    headerName: "Project ContactPerson",
    flex: 1,
  },
  {
    field: "Current_status",
    headerName: "Project Status",
    flex: 1,
  },
];

const ManageProjectData = () => {
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
  }, [navigate]);

  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery("(max-width:768px)");

  const [projecttitle, setProjectTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fundings, setFundings] = useState("");
  const [contactperson, setContactPerson] = useState("");
  const [currentstatus, setCurrentStatus] = useState("");
  const [modifiedFundings, setModifiedFundings] = useState("");
  const [modifiedStatus, setModifiedStatus] = useState("");
  const [projectId, setProjectId] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [copiedText, setCopiedText] = useState("");

  const [_id, set_id] = useState("");
  const { data, isLoading } = useGetProjectDataQuery();
  console.log("data", data);

  async function Add(event) {
    event.preventDefault();
    const response = await fetch(
      process.env.REACT_APP_BASE_URL + "/project/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${process.env.REACT_APP_AdminApiKey}`,
        },
        body: JSON.stringify({
          Project_title: projecttitle,
          Project_description: description,
          Current_fundings: fundings,
          Project_contact_person: contactperson,
          Current_status: currentstatus,
        }),
      }
    );
    const data = await response.json();
    if (data.status === "200") {
      alert(data.message);
    } else {
      alert(data.error);
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
      process.env.REACT_APP_BASE_URL + "/project/remove",
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
    if (data.status === "200") {
      alert("Successfull");
    } else {
      alert("error");
    }
    window.location.reload();
  }

  const [unit, setUnit] = React.useState("ADD");

  const handleChange = (event, newUnit) => {
    if (newUnit !== null) {
      setUnit(newUnit);
    }
  };

  const handleStatusChange = (event) => {
    setCurrentStatus(event.target.value);
  };

  const handleFundingsChange = (event) => {
    setModifiedFundings(event.target.value);
  };

  const handleModifiedStatusChange = (event) => {
    setModifiedStatus(event.target.value);
  };

  async function Modify(event) {
    event.preventDefault();
    const response = await fetch(
      process.env.REACT_APP_BASE_URL + "/project/update",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${process.env.REACT_APP_AdminApiKey}`,
        },
        body: JSON.stringify({
          _id: projectId,
          Current_fundings: modifiedFundings,
          Current_status: modifiedStatus,
        }),
      }
    );
    const data = await response.json();
    if (data.status === "200") {
      alert("successfull");
    } else {
      alert("error");
    }
    window.location.reload();
  }

  const handleProjectIdChange = (event) => {
    setProjectId(event.target.value);
  };

  const handleModifiedFundingsChange = (event) => {
    setModifiedFundings(event.target.value);
  };

  return (
    <Box m={isMobile ? "2vh 5vw" : "1.5rem 2.5rem"}>
      {isMobile ? (
        <HeaderMobile
          title={"Manage Project Data"}
          subTitle={"Add or remove Project Data"}
        />
      ) : (
        <HeaderNonMobile
          title={"Manage Project Data"}
          subTitle={"Add or remove Project Data"}
        />
      )}
      <Box mt={"3rem"}>
        <form
          onSubmit={unit === "ADD" ? Add : unit === "REMOVE" ? Remove : Modify}
        >
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
              <ToggleButton
                value="MODIFY"
                key={"MODIFY"}
                sx={{
                  height: "52.71px",
                  width: "12rem",
                  borderBottom: unit === "ADD" ? "none" : "inherit",
                }}
              >
                MODIFY
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box
            gap="30px"
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
          >
            {unit === "ADD" && (
              <Box
                width={"100%"}
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
                  label="Project Title"
                  onChange={(e) => setProjectTitle(e.target.value)}
                  name="ProjectName"
                  sx={{ gridColumn: "span 2" }}
                  autoComplete="off"
                  value={projecttitle}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Current Fundings"
                  onChange={(e) => setFundings(e.target.value)}
                  name="fundings"
                  sx={{ gridColumn: "span 2" }}
                  autoComplete="off"
                  value={fundings}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Description"
                  onChange={(e) => setDescription(e.target.value)}
                  name="description"
                  sx={{ gridColumn: "span 2" }}
                  autoComplete="off"
                  value={description}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Person in Charge"
                  onChange={(e) => setContactPerson(e.target.value)}
                  name="contactperson"
                  sx={{ gridColumn: "span 2" }}
                  autoComplete="off"
                />
                <FormControl required sx={{ gridColumn: "span 2" }}>
                  <Box>
                    <InputLabel id="demo-simple-select-helper-label">
                      Current Status
                    </InputLabel>
                    <Select
                      fullWidth
                      variant="filled"
                      labelId="demo-simple-select-helper-label"
                      value={currentstatus}
                      onChange={handleStatusChange}
                      name="currentstatus"
                      sx={{ gridColumn: "span 2" }}
                    >
                      <MenuItem value="ongoing">Ongoing</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                    </Select>
                  </Box>
                </FormControl>
              </Box>
            )}

            {unit === "REMOVE" && (
              <Box mt={"2rem"}>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Id"
                  onChange={(e) => set_id(e.target.value)}
                  name="firstName"
                  sx={{ gridColumn: "span 2" }}
                  autoComplete="off"
                />
              </Box>
            )}

            {unit === "MODIFY" && (
              <Box
                width={"100%"}
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
                  label="Project ID"
                  onChange={handleProjectIdChange}
                  value={projectId}
                  sx={{ gridColumn: "span 2" }}
                  autoComplete="off"
                  required
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Modified Fundings (leave empty if you dont want to change)"
                  onChange={handleModifiedFundingsChange}
                  name="modifiedFundings"
                  sx={{ gridColumn: "span 2" }}
                  autoComplete="off"
                  value={modifiedFundings}
                />
                <FormControl required sx={{ gridColumn: "span 2" }}>
                  <Box>
                    <InputLabel id="modifiedstatus-label">
                      Modified Status
                    </InputLabel>
                    <Select
                      fullWidth
                      variant="filled"
                      labelId="modifiedstatus-label"
                      value={modifiedStatus}
                      onChange={handleModifiedStatusChange}
                      name="modifiedStatus"
                      sx={{ gridColumn: "span 2" }}
                    >
                      <MenuItem value="ongoing">Ongoing</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                    </Select>
                  </Box>
                </FormControl>

                {selectedProject && (
                  <>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Modified Fundings"
                      onChange={handleModifiedFundingsChange}
                      name="modifiedFundings"
                      sx={{ gridColumn: "span 2" }}
                      autoComplete="off"
                      value={modifiedFundings}
                    />
                    <FormControl required sx={{ gridColumn: "span 2" }}>
                      <Box>
                        <InputLabel id="modifiedstatus-label">
                          Modified Status
                        </InputLabel>
                        <Select
                          fullWidth
                          variant="filled"
                          labelId="modifiedstatus-label"
                          value={modifiedStatus}
                          onChange={handleModifiedStatusChange}
                          name="modifiedStatus"
                          required
                          sx={{ gridColumn: "span 2" }}
                        >
                          <MenuItem value="ongoing">Ongoing</MenuItem>
                          <MenuItem value="completed">Completed</MenuItem>
                        </Select>
                      </Box>
                    </FormControl>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Modified Description"
                      onChange={(e) => setDescription(e.target.value)}
                      name="modifiedDescription"
                      sx={{ gridColumn: "span 4" }}
                      autoComplete="off"
                      value={description}
                    />
                  </>
                )}
              </Box>
            )}
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

        {(unit === "REMOVE" || unit === "MODIFY") && (
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

export default ManageProjectData;

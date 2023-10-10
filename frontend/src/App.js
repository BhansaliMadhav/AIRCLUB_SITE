import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { BrowserRouter, Navigate } from "react-router-dom";
import Announcement from "scenes/announcement";
import Events from "scenes/events";
import OngoingProjects from "scenes/Projects";
import CurrentMembers from "scenes/currentMembers";
import BecomeMember from "scenes/becomeMember";
import AdminLayout from "scenes/adminLayout";
import ManageAnnouncement from "scenes/manage-announcement";
import { Route, Routes } from "react-router-dom";
import Layout from "scenes/layout";
import Admin from "scenes/admin";
import AdminControls from "scenes/admin-controls";
import ManageMember from "scenes/manageMembers";
import ManageProjectData from "scenes/manage-projects";
import ManageEventData from "scenes/manage-event";
import MemberRequests from "scenes/memberRequests";
import TechnoPage from "scenes/TechnoPage";
import Home from "scenes/home";
import { useEffect } from "react";
import { ClientJS } from "clientjs";
function MyComponent() {
  useEffect(() => {
    const client = new ClientJS();
    const fingerprint = client.getFingerprint();
  }, []);
}

function App() {
  const [theme, colorMode] = useMode();

  const ongoingProjects = "/Projects"; // maine kiya hai dada
  MyComponent();
  const home = "/Home";
  const currentMembers = "/Current Members";
  const becomeaMember = "/Become Member";
  const manageAnnouncements = "/Manage Announcement";
  const manageMember = "/Manage Members";
  const manageProjectData = "/Manage Projects";
  const manageEventData = "/Manage Events";
  const memberRequests = "/Member Requests";
  const techPage = "/Technology Stacks";
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Navigate to={"/home"} replace />} />
                <Route path={"/home"} element={<Home />} />
                <Route path="/announcement" element={<Announcement />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/events" element={<Events />} />
                <Route
                  path={ongoingProjects.toLowerCase()}
                  element={<OngoingProjects />}
                />
                <Route
                  path={currentMembers.toLowerCase()}
                  element={<CurrentMembers />}
                />
                <Route
                  path={becomeaMember.toLowerCase()}
                  element={<BecomeMember />}
                />
                <Route path={techPage.toLowerCase()} element={<TechnoPage />} />
              </Route>
              <Route element={<AdminLayout />}>
                <Route path={"/admin-controls"} element={<AdminControls />} />
                <Route
                  path={manageAnnouncements.toLowerCase()}
                  element={<ManageAnnouncement />}
                />
                <Route
                  path={manageMember.toLowerCase()}
                  element={<ManageMember />}
                />
                <Route
                  path={manageProjectData.toLowerCase()}
                  element={<ManageProjectData />}
                />
                <Route
                  path={manageEventData.toLowerCase()}
                  element={<ManageEventData />}
                />
                <Route
                  path={memberRequests.toLowerCase()}
                  element={<MemberRequests />}
                />
                <Route
                  path={ongoingProjects.toLowerCase()}
                  element={<OngoingProjects />}
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

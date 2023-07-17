import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
  TextField,
} from "@mui/material";
import { tokens } from "theme";
import { Link } from "react-router-dom";

import HeaderMobile from "components-mobile/HeaderMobile";
import HeaderNonMobile from "components/HeaderNonMobile";
import { useGetEventDataQuery } from "state/api";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Footer from "components/Footer";

const Events = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:686px)");

  const { data } = useGetEventDataQuery();

  const extractDriveId = (url) => {
    const startIndex = url.indexOf("/d/") + 3;
    const endIndex = url.indexOf("/", startIndex);
    const driveId = url.substring(startIndex, endIndex);
    return driveId;
  };

  const [expandedAccordions, setExpandedAccordions] = useState([]);

  const handleAccordionToggle = (accordionId) => {
    if (expandedAccordions.includes(accordionId)) {
      setExpandedAccordions(
        expandedAccordions.filter((id) => id !== accordionId)
      );
    } else {
      setExpandedAccordions([...expandedAccordions, accordionId]);
    }
  };

  useEffect(() => {
    const eventsBar = document.getElementById("events-bar");
    if (eventsBar) {
      eventsBar.classList.add("animated-events-bar");
    }
  }, []);

  return (
    <Box m={isMobile ? "2vh 5vw" : "1.5rem 2.5rem"} className="events-tab">
      {/* Header component... */}
      <Box display="flex" flexDirection="column" gap={theme.spacing(2)}>
        {data &&
          data.map(
            ({
              _id,
              Event_title,
              Event_date,
              Event_description,
              Event_photos,
            }) => {
              const driveId = extractDriveId(Event_photos);
              const isAccordionExpanded = expandedAccordions.includes(_id);

              return (
                <Accordion
                  key={_id}
                  expanded={isAccordionExpanded}
                  onChange={() => handleAccordionToggle(_id)}
                  style={{
                    marginBottom: theme.spacing(2),
                    backgroundColor: theme.palette.primary.alt2,
                    color: "black",
                  }}
                >
                  <AccordionSummary
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: theme.spacing(1),
                      fontWeight: "bold",
                      position: "relative",
                    }}
                  >
                    <div style={{ textAlign: "left" }}>
                      <Typography
                        textAlign={"left"}
                        variant="h4"
                        style={{ flex: "1" }}
                      >
                        {Event_title}
                      </Typography>
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        right: theme.spacing(2),
                        transform: `translateY(-50%) rotate(${
                          isAccordionExpanded ? "180deg" : "0"
                        })`,
                        transition: "transform 0.3s",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M7 10l5 5 5-5z" />
                      </svg>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails
                    style={{
                      display: "grid",
                      gridTemplateColumns: "40% 60%",
                      gap: theme.spacing(2),
                    }}
                  >
                    <div>
                      <Typography>EVENT DATE: {Event_date}</Typography>
                      <Typography textAlign={"left"}>
                        {Event_description}
                      </Typography>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={`https://drive.google.com/thumbnail?id=${driveId}`}
                        alt="Event"
                        style={{
                          marginTop: "5%",
                          marginRight: "3%",
                          marginLeft: "3%",
                          marginBottom: "5%",
                        }}
                      />
                    </div>
                  </AccordionDetails>
                </Accordion>
              );
            }
          )}
      </Box>
    </Box>
  );
};

export default Events;

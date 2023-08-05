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
import { Slide, Bounce, Zoom } from "react-reveal";

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
    <Box m={isMobile ? "2vh 5vw" : "1.5rem 2.5rem"} width={"100%"}>
      {isMobile ? (
        <HeaderMobile title={"Events"} subTitle={"Recent Events"} />
      ) : (
        <HeaderNonMobile title={"Events"} subTitle={"Recent Events"} />
      )}
      {/* Header component... */}
      <Box
        mt={"20px"}
        display={"grid"}
        gridTemplateColumns={isMobile ? "1fr" : "repeat(2, minmax(300px, 1fr))"}
        justifyContent={"space-between"}
        width={"100%"}
        sx={{
          "& > div": {
            gridColumn: !isMobile ? undefined : "span 2",
          },
        }}
      >
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
                <Slide key={_id} bottom duration={1000}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Box
                      component="div"
                      p={12}
                      border-radius="20px"
                      background={`hsla(0, 0%, 3%, 1), linear-gradient(45deg, hsla(0, 0%, 3%, 1) 0%, hsla(120, 24%, 38%, 1) 40%, hsla(120, 24%, 19%, 1) 92%)`}
                      borderRadius={12}
                      boxShadow={5}
                      style={{ margin: " 20px" }}
                    >
                      <Bounce left>
                        <Typography
                          fontSize={"40px"}
                          gutterBottom
                          style={{
                            color: "#1CCECE",
                            marginBottom: "10px",
                          }}
                        >
                          {Event_title}
                        </Typography>
                      </Bounce>
                      <Zoom>
                        <Typography
                          fontSize={"25px"}
                          style={{ color: "#BFDA0D" }}
                        >
                          {Event_date}
                        </Typography>
                      </Zoom>
                      <img
                        src={`https://drive.google.com/thumbnail?id=${driveId}`}
                        alt="Event"
                        style={{
                          width: "100%",
                          borderRadius: "30%",
                          marginTop: "10px",
                        }}
                      />
                      <Typography variant="h2" style={{ color: "#f7f7f7" }}>
                        {Event_description}
                      </Typography>
                    </Box>
                  </div>
                </Slide>
              );
            }
          )}
      </Box>
    </Box>
  );
};

export default Events;

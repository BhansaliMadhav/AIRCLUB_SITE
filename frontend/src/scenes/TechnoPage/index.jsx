import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HeaderMobile from "components-mobile/HeaderMobile";
import HeaderNonMobile from "components/HeaderNonMobile";

const TechnoPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:768px)");

  // Sample technology details
  const technologyDetails = [
    {
      name: "FrontEnd Tech",
      description:
        "Our FrontEnd is built with Material UI, Emotion, and React for a seamless user experience. Security is a priority, with encrypted passwords and an Admin Panel for access management. Users can switch between Dark Mode and Light Mode for a personalized experience.",
    },
    {
      name: "Routing",
      description:
        "We've implemented the Routing aspect of our application using React Router DOM along with Express Router. This powerful combination ensures smooth and efficient navigation throughout the application, providing users with a seamless and interactive experience.",
    },
    {
      name: "Database",
      description:
        "Our data storage solution utilizes MongoDB, alongside Mongoose for seamless integration. Prior to storing in the database, user passwords are securely encrypted. With this approach, we ensure that sensitive information remains protected at all times. When responding to Get requests, our application fetches the relevant data, providing a secure and efficient data-driven experience for our users.",
    },
    {
      name: "Backend",
      description:
        "Our JavaScript-based application is structured into Controller, Model, Routes, and Index files, enabling smooth data transactions. Through Get and Post requests, users can seamlessly retrieve and submit data, enhancing the overall user experience.",
    },
    {
      name: "Api",
      description:
        "We've crafted APIs to establish a seamless connection between our Backend and Frontend. These APIs facilitate smooth data communication, enabling a cohesive and interactive user experience.",
    },

    // Add more technology details as needed
  ];

  return (
    <Box m={isMobile ? "2vh 5vw" : "1.5rem 2.5rem"}>
      {isMobile ? (
        <HeaderMobile
          title={"Technology Used"}
          subTitle={"Detailed Info of Tech Used"}
        />
      ) : (
        <HeaderNonMobile
          title={"Technology Used"}
          subTitle={"Detailed Info of Tech Used"}
        />
      )}

      {/* Technology details */}
      {technologyDetails.map((tech, index) => (
        <Box
          key={index}
          mt={"2rem"}
          p={"1rem 0.7rem"}
          sx={{
            backgroundColor: theme.palette.background.alt2,
            borderRadius: "10px",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            fontWeight={"bold"}
            color="#ffc300"
            // mt={"1rem"}
          >
            {tech.name}
          </Typography>
          <Typography
            variant="h5"
            sx={{ wordWrap: "break-word", width: "100%", ml: "10px" }}
          >
            {tech.description}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default TechnoPage;

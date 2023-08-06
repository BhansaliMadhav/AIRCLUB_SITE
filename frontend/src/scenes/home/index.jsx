import React, { useState, useEffect } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Typography } from "@mui/material";
import HeaderMobile from "components-mobile/HeaderMobile";
import HeaderNonMobile from "components/HeaderNonMobile";
import { Link } from "react-router-dom";
import { useGetAnnouncementsQuery } from "state/api";
import { tokens } from "theme";
import { Avatar } from "@mui/material";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom"; // Import the Fade animation component
import image1 from "images/img1.jpg";
import image2 from "images/img2 .jpg";
const Home = ({ _id, title, link }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isMobile = useMediaQuery("(max-width:1000px)");
  const secondisMobile = useMediaQuery("(max-width:1000px)");

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center" // Center both horizontally and vertically
      m={isMobile ? "2vh 5vw" : "1.5rem 2.5rem"}
      sx={{
        color: theme.palette.background.main,
        background: theme.palette.background.main,
      }}
    >
      {isMobile ? (
        <HeaderMobile
          title={
            <Typography variant="h3" fontWeight="bold" colo>
              AI & ROBOTICS CLUB
            </Typography>
          }
          subTitle={
            <Typography variant="h2" fontWeight="bold">
              NIT ANDHRA PRADESH
            </Typography>
          }
        />
      ) : (
        <HeaderNonMobile
          title={
            <Typography
              fontSize={"90px"}
              fontWeight="bold"
              fontFamily={"serif"}
            >
              AI & ROBOTICS CLUB
            </Typography>
          }
          subTitle={
            <Typography
              fontSize={"40px"}
              fontWeight="bold"
              fontFamily={"serif"}
            >
              NIT ANDHRA PRADESH
            </Typography>
          }
        />
      )}
      <Zoom>
        <img
          src={image1}
          alt="this is a robotic hand"
          style={{
            margin: "40px 10px 40px 10px",

            width: isMobile ? "85%" : "60%", // To occupy half the space
            borderRadius: "10px", // To give it a circular shape
            border: "2px solid black", // To add a black border
            boxShadow: "0 4px 8px darkgreen", // To add a box shadow with dark green color
          }}
        />
      </Zoom>

      <Fade bottom duration={1500}>
        <Box
          textAlign={"justify"}
          sx={{
            background: `hsla(0, 0%, 3%, 1), linear-gradient(45deg, hsla(0, 0%, 3%, 1) 0%, hsla(120, 24%, 38%, 1) 40%, hsla(120, 24%, 19%, 1) 92%)`,
          }}
          borderRadius={20}
          boxShadow="5px 4px 16px green"
          mt={"2%"}
          mb={"4%"}
          pt={"1.5%"}
          pb={"4%"}
          pl={"4%"}
          pr={"4%"}
        >
          <Typography fontSize={"36px"} fontWeight="bold" mt={4}>
            Importance of AI and Robotics in Life
          </Typography>
          <Typography color={"#C4985A"} fontSize={"20px"} mt={2}>
            Artificial Intelligence (AI) and Robotics are two revolutionary
            fields that have the potential to transform various aspects of human
            life. From automation and optimization to healthcare and education,
            AI and Robotics play crucial roles in shaping the future. Here are
            some key points highlighting their importance in our lives:
          </Typography>
          <Typography color={"#C4985A"} fontSize={"20px"} mt={2}>
            - Automation: AI and Robotics enable automation of repetitive tasks,
            freeing up human resources for more creative and complex endeavors.
          </Typography>
          <Typography color={"#C4985A"} fontSize={"20px"} mt={2}>
            - Healthcare: AI-powered medical devices and robotics aid in
            diagnostics, surgery, and patient care, improving healthcare
            outcomes and saving lives.
          </Typography>
          <Typography color={"#C4985A"} fontSize={"20px"} mt={2}>
            - Education: AI-driven adaptive learning platforms personalize
            educational content, enhancing student engagement and learning
            outcomes.
          </Typography>
          <Typography color={"#C4985A"} fontSize={"20px"} mt={2}>
            - Industry: Robotics and automation streamline industrial processes,
            increasing efficiency and productivity in manufacturing and beyond.
          </Typography>
          <Typography color={"#C4985A"} fontSize={"20px"} mt={2}>
            - Future Innovations: AI and Robotics hold the potential to unlock
            unimaginable innovations and discoveries, leading to a better and
            more sustainable future for humanity.
          </Typography>
        </Box>
      </Fade>
      <Zoom>
        <img
          src={image2}
          alt="this is a robotic hand"
          style={{
            margin: "10px",
            width: isMobile ? "85%" : "50%", // To occupy half the space
            borderRadius: "10px", // To give it a circular shape
            border: "2px solid black", // To add a black border
            boxShadow: "0 4px 8px darkgreen", // To add a box shadow with dark green color
          }}
        />
      </Zoom>
      <Fade>
        <Box
          textAlign={"justify"}
          sx={{
            background: `hsla(0, 0%, 3%, 1), linear-gradient(45deg, hsla(0, 0%, 3%, 1) 0%, hsla(120, 24%, 38%, 1) 40%, hsla(120, 24%, 19%, 1) 92%)`,
          }}
          borderRadius={20}
          boxShadow="5px 4px 16px green"
          mt={"2%"}
          mb={"4%"}
          pt={"1.5%"}
          pb={"4%"}
          pl={"4%"}
          pr={"4%"}
        >
          <Typography fontSize={"36px"} fontWeight="bold" mt={4}>
            Various New Technologies Used:
          </Typography>
          <Typography color={"#C4985A"} fontSize={"20px"} mt={2}>
            - Raspberry Pi: A small, affordable single-board computer that can
            be used for a variety of projects, from home automation to robotics.
          </Typography>
          <Typography color={"#C4985A"} fontSize={"20px"} mt={2}>
            - Arduino: An open-source electronics platform based on easy-to-use
            hardware and software, often used for prototyping and robotics
            projects.
          </Typography>
          <Typography color={"#C4985A"} fontSize={"20px"} mt={2}>
            - Machine Learning: A subset of AI that enables machines to learn
            from data and make predictions or decisions based on that learning.
          </Typography>
          <Typography color={"#C4985A"} fontSize={"20px"} mt={2}>
            - Computer Vision: The field of AI and computer science that focuses
            on enabling computers to interpret and understand visual information
            from the world.
          </Typography>
          <Typography color={"#C4985A"} fontSize={"20px"} mt={2}>
            - Natural Language Processing (NLP): An AI technology that enables
            computers to understand, interpret, and generate human language.
          </Typography>
          <Typography color={"#C4985A"} fontSize={"20px"} mt={2}>
            - Robotics: The design, construction, operation, and use of robots
            to automate tasks, perform complex actions, or interact with the
            environment.
          </Typography>
          <Typography color={"#C4985A"} fontSize={"20px"} mt={2}>
            - Internet of Things (IoT): A network of interconnected devices and
            objects that can collect and exchange data through the internet.
          </Typography>
        </Box>
        <Typography fontSize={"60px"} fontWeight="bold" mt={4}>
          About Us
        </Typography>
        <Typography color={"#C4985A"} fontSize={"20px"} mt={2}>
          The AI & Robotics Club at NIT Andhra Pradesh is a passionate group of
          students dedicated to exploring the world of artificial intelligence
          and robotics. Our mission is to foster innovation and creativity
          through hands-on projects, workshops, and engaging events. We believe
          in pushing the boundaries of technology and making a positive impact
          on society through our endeavors.
        </Typography>
        <Typography fontSize={"30px"} fontWeight="bold" mt={4}>
          Random Message of Enthusiasm:
        </Typography>
        <Typography color={"#C4985A"} fontSize={"20px"} mt={2}>
          "Together, we are shaping the future, one robot at a time. Let's
          discover, learn, and build amazing things that will change the world!"
        </Typography>
      </Fade>
    </Box>
  );
};

export default Home;

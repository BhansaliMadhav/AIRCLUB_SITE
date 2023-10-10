import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Typography } from "@mui/material";
import Announcement from "../announcement";
import HeaderMobile from "components-mobile/HeaderMobile";
import HeaderNonMobile from "components/HeaderNonMobile";
import { useGetShortAnnouncementQuery } from "state/api";
import { tokens } from "theme";
import { Avatar } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import MuiImageSlider from "mui-image-slider";

import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom"; // Import the Fade animation component
import image1 from "images/img1.jpg";
import makima from "images/makima.jpg";
import back2 from "images/back3.jpeg";
import abc from "images/ABC.jpg";
import back from "images/back-g.jpg";
import image2 from "images/img2 .jpg";
import image3 from "images/img3.jpeg";
import slideshow1 from "images/WhatsApp Image 2023-08-08 at 13.49.32 (1).jpeg";
import slideshow2 from "images/WhatsApp Image 2023-08-08 at 13.49.32.jpeg";
//import Slider from "@mui/lab/";

const Home = ({ _id, title, link }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data, isLoading } = useGetShortAnnouncementQuery();

  const slides = [slideshow1, slideshow2];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAnnouncements, setShowAnnouncements] = useState(false);

  useEffect(() => {
    if (data && !isLoading) {
      setShowAnnouncements(true);
    }
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 1000); // Change the interval time as needed (4000ms = 4 seconds)

    return () => {
      clearInterval(interval);
    };
  }, [data, isLoading]);

  const isMobile = useMediaQuery("(max-width:1000px)");
  const secondisMobile = useMediaQuery("(max-width:1000px)");
  const items1 = data
    ? data.map(({ title, link, _id }) => ({ text: title, link, _id }))
    : [];

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center" // Center both horizontally and vertically
      m={isMobile ? "2vh 5vw" : "-5.75rem 0 0 0"}
    >
      <div style={{ padding: "0", margin: "0", width: "100%" }}>
        <img src={back} style={{ height: "800px", width: "100%" }} />
        <div
          style={{
            position: "absolute",
            top: "100px",
            left: "10px",
            padding: "0",
            margin: "0",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Merriweather",
              fontWeight: "400",
              fontStyle: "italic",
              fontSize: "100px",
              textAlign: "left",
            }}
          >
            We Build
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: "bold",
              fontSize: "120px",
              marginTop: "-50px",
              textAlign: "left",
            }}
          >
            Differently
          </Typography>
        </div>
      </div>
      <div style={{ width: "900px" }}></div>
      <Fade bottom duration={1500}>
        <Box
          display={"flex"}
          textAlign={"justify"}
          sx={{
            background: `hsla(0, 0%, 3%, 1), linear-gradient(45deg, hsla(0, 0%, 3%, 1) 0%, hsla(196, 100%, 41%, 1) 40%, hsla(196, 100%, 21%, 1) 92%)`,
          }}
          borderRadius={20}
          boxShadow="5px 4px 16px #18C9AC"
          mt={"0%"}
          marginLeft={"20px"}
          marginRight={"20px"}
          mb={"4%"}
          pt={"1.5%"}
          pb={!isMobile ? "4%" : "8%"}
          pl={"4%"}
          pr={"4%"}
        >
          <div>
            <Typography fontSize={"36px"} fontWeight="bold" mt={4}>
              Sriman Phani Krishna
            </Typography>
            <Typography color={"#2EEECE"} fontSize={"20px"} mt={2}>
              Artificial Intelligence (AI) and Robotics are two revolutionary
              fields that have the potential to transform various aspects of
              human life. From automation and optimization to healthcare and
              education, AI and Robotics play crucial roles in shaping the
              future. Here are some key points highlighting their importance in
              our lives:
            </Typography>
            <Typography color={"#2EEECE"} fontSize={"20px"} mt={2}>
              - Automation: AI and Robotics enable automation of repetitive
              tasks, freeing up human resources for more creative and complex
              endeavors.
            </Typography>
            <Typography color={"#2EEECE"} fontSize={"20px"} mt={2}>
              - Healthcare: AI-powered medical devices and robotics aid in
              diagnostics, surgery, and patient care, improving healthcare
              outcomes and saving lives.
            </Typography>
          </div>

          <div>
            <Zoom>
              <img
                src={image3}
                alt="this is a robotic hand"
                style={{
                  margin: "20px",
                  // To occupy half the space
                  borderRadius: "10px",
                  marginLeft: "110px", // To give it a circular shape
                  border: "2px solid black", // To add a black border
                  boxShadow: "5px 4px 16px #18C9AC",
                  maxWidth: "400px",
                  minHeight: "450px", // To add a box shadow with dark green color
                }}
              />
            </Zoom>
          </div>
        </Box>
      </Fade>
      <div style={{ display: "flex", gap: "20%" }}>
        <div>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: "40px",
              fontWeight: "600",
              marginTop: "30px",
            }}
          >
            Recent Announcements
          </Typography>
        </div>
        <div style={{ width: "600px", marginLeft: "40px" }}>
          {showAnnouncements &&
            items1.map(({ text, link, _id }, index) => (
              <Box
                sx={{
                  m: secondisMobile
                    ? "1rem 0.5rem 0rem 0.5rem"
                    : "2rem 2rem 2rem 2rem",
                  fontSize: "4rem", // Doubled the font size
                  color: "black",
                  backgroundColor: "#000000",
                  borderRadius: "8px",
                  padding: "1rem",
                  textAlign: "justify",
                  boxShadow: `0px 0px 20px #18C9AC`,
                  display: "flex", // Align text vertically
                  alignItems: "center", // Center text vertically
                  justifyContent: "center", // Center text horizontally
                }}
              >
                <Link
                  to={`${link}`}
                  variant="h3"
                  sx={{
                    m: secondisMobile
                      ? "1rem 0.5rem 0rem 0.5rem"
                      : "2.25rem 0 1rem 1.25rem",
                    color: theme.palette.text.alt3,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                  style={{
                    cursor: "pointer",
                    textDecoration: "none",
                    fontStyle: "italic",
                  }}
                >
                  <Typography
                    style={{
                      color: "#FFFFFF",
                      fontFamily: "Arial",
                      fontWeight: 600,
                      fontSize: "20px",
                      wordWrap: "break-word",
                    }}
                  >
                    {text.length > 50 ? `${text.slice(0, 50)}...` : text}
                  </Typography>
                </Link>
              </Box>
            ))}
        </div>
      </div>

      <Zoom>
        <div style={{ marginLeft: "620px", width: "80%", height: "30%" }}>
          {/* <Carousel
            showArrows={true}
            showStatus={false}
            showThumbs={false}
            autoPlay={true}
            interval={5000}
            width={"50%"} // Adjust the width of the Carousel
            height={"40%"} // Adjust the height of the Carousel
          >
            {slides.map((slide, index) => (
              <div key={index}>
                <img
                  src={slide}
                  alt={`slide ${index}`}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "10px",
                    border: "2px solid black",
                    boxShadow: "5px 4px 16px #18C9AC",
                  }}
                />
              </div>
            ))}
          </Carousel> */}
        </div>
      </Zoom>

      <div>
        <Fade>
          <Box
            textAlign={"justify"}
            sx={{
              background: `hsla(0, 0%, 3%, 1), linear-gradient(45deg, hsla(0, 0%, 3%, 1) 0%, hsla(120, 24%, 38%, 1) 40%, hsla(120, 24%, 19%, 1) 92%)`,
            }}
            borderRadius={20}
            boxShadow="5px 4px 16px #18C9AC"
            mt={"2%"}
            mb={"4%"}
            pt={"1.5%"}
            pb={!isMobile ? "4%" : "8%"}
            pl={"4%"}
            pr={"4%"}
          >
            <Typography fontSize={"36px"} fontWeight="bold" mt={4}>
              Various New Technologies Used:
            </Typography>
            <Typography color={"#C4985A"} fontSize={"20px"} mt={2}>
              - Raspberry Pi: A small, affordable single-board computer that can
              be used for a variety of projects, from home automation to
              robotics.
            </Typography>
            <Typography color={"#C4985A"} fontSize={"20px"} mt={2}>
              - Arduino: An open-source electronics platform based on
              easy-to-use hardware and software, often used for prototyping and
              robotics projects.
            </Typography>
            <Typography color={"#C4985A"} fontSize={"20px"} mt={2}>
              - Machine Learning: A subset of AI that enables machines to learn
              from data and make predictions or decisions based on that
              learning.
            </Typography>
            <Typography color={"#C4985A"} fontSize={"20px"} mt={2}>
              - Computer Vision: The field of AI and computer science that
              focuses on enabling computers to interpret and understand visual
              information from the world.
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
              - Internet of Things (IoT): A network of interconnected devices
              and objects that can collect and exchange data through the
              internet.
            </Typography>
          </Box>
          <Typography fontSize={"60px"} fontWeight="bold" mt={4}>
            About Us
          </Typography>
          <Typography color={"#C4985A"} fontSize={"20px"} mt={2}>
            The AI & Robotics Club at NIT Andhra Pradesh is a passionate group
            of students dedicated to exploring the world of artificial
            intelligence and robotics. Our mission is to foster innovation and
            creativity through hands-on projects, workshops, and engaging
            events. We believe in pushing the boundaries of technology and
            making a positive impact on society through our endeavors.
          </Typography>
          <Typography fontSize={"30px"} fontWeight="bold" mt={4}>
            Random Message of Enthusiasm:
          </Typography>
          <Typography color={"#C4985A"} fontSize={"20px"} mt={2}>
            "Together, we are shaping the future, one robot at a time. Let's
            discover, learn, and build amazing things that will change the
            world!"
          </Typography>
        </Fade>
      </div>
    </Box>
  );
};

export default Home;

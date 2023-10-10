import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Box, Card, useMediaQuery, useTheme, Button } from "@mui/material";
import { Typography } from "@mui/material";
import { useGetAnnouncementsQuery } from "state/api";
import Announcement from "../announcement";
import HeaderMobile from "components-mobile/HeaderMobile";
import HeaderNonMobile from "components/HeaderNonMobile";
import { useGetShortAnnouncementQuery } from "state/api";
import { tokens } from "theme";
import { Avatar } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import droneImage from "images/drone.jpeg";
import colloqiumimage from "images/coll-5.jpeg";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom"; // Import the Fade animation component

import back from "images/back-g.jpg";
import image3 from "images/img3.jpeg";
import slideshow1 from "images/WhatsApp Image 2023-08-08 at 13.49.32 (1).jpeg";
import slideshow2 from "images/WhatsApp Image 2023-08-08 at 13.49.32.jpeg";
//import Slider from "@mui/lab/"
import backgroundImage from "images/1.jpg";
import { DoubleArrowOutlined } from "@mui/icons-material";

const Home = ({ _id, title, link }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data, isLoading } = useGetAnnouncementsQuery();

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
        <img src={backgroundImage} style={{ height: "800px", width: "100%" }} />
        <div
          style={{
            position: "absolute",
            top: "140px",
            left: "50px",
            padding: "0",
            margin: "0",
          }}
        >
          <Typography
            sx={{
              fontFamily: "sans-serif",
              fontWeight: "bold",

              fontSize: "70px",
              textAlign: "left",
            }}
          >
            Unleashing Innovation
          </Typography>
          <Typography
            sx={{
              fontFamily: "sans-serif",
              fontWeight: "400",
              fontSize: "70px",
              marginTop: "-30px",
              textAlign: "left",
            }}
          >
            One byte at a time
          </Typography>
          <div
            style={{
              width: "100%",
              alignItems: "left",
              justifyContent: "left",
              textAlign: "left",
              marginTop: "-10px",
            }}
          >
            <DoubleArrowOutlined
              style={{
                stroke: "#000",
                fontSize: "72px",
                rotate: "90deg",
                strokeWidth: "1.5",
              }}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          margin: "1.5rem 0",
          alignItems: "center",
        }}
      >
        <div
          style={{
            marginRight: "5rem",
            marginLeft: "5rem",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: "40px",
              fontWeight: "600",
              textAlign: "left",
              width: "250px",
            }}
          >
            Recent Announcements
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            width: "65%",
            marginLeft: "40px",
            overflowX: "auto",
            marginRight: "0",
          }}
        >
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
                  textAlign: "left",
                  boxShadow: `0px 0px 7px #18C9AC`,
                  display: "flex", // Align text vertically
                  alignItems: "end", // Center text vertically
                  justifyContent: "center", // Center text horizontally
                  height: "7rem",
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
                    width: "15rem",
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
                  <Typography
                    style={{
                      color: "#FFFFFF",
                      fontFamily: "Arial",
                      fontWeight: 400,
                      fontSize: "12px",
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
      <hr style={{ width: "90%", borderBottom: "3px solid #fff" }} />
      <Box
        width={"100%"}
        paddingLeft={"5%"}
        paddingRight={"10%"}
        marginTop={"3%"}
        marginBottom={"3%"}
      >
        <Box justifyContent={"left"} width={"100%"}>
          <Typography fontSize={"36px"} textAlign={"left"} fontWeight={"bold"}>
            Hi there!
          </Typography>
          <Typography
            fontSize={"22px"}
            mt={"1.5rem"}
            textAlign={"justify"}
            fontWeight={"400"}
          >
            We're a dynamic and passionate group of undergraduate students who
            are deeply immersed in the world of artificial intelligence and
            robotics. Our club is a hub of innovation and a platform for
            enthusiastic young minds to come together and explore the exciting
            realms of AI and robotics.
          </Typography>
          <Typography
            mt={"1rem"}
            fontSize={"22px"}
            textAlign={"justify"}
            fontWeight={"400"}
          >
            Here at our club, you'll find an array of thrilling projects that
            span the technological spectrum. We've ventured into the skies with
            automated drones, conquered precision and control with our robotic
            arm, and delved into the immersive world of Augmented Reality (AR).
            Our Micromouse project has challenged our members to design and
            build autonomous, maze-solving robots, showcasing our dedication to
            problem-solving.
          </Typography>
          <Button
            variant="outlined"
            sx={{
              padding: "7px 30px",
              fontSize: "24px",
              borderRadius: "4rem",
              border: "",
              color: "#fff",
              boxShadow: `0px 0px 7px #18C9AC`,
              width: "20rem",
              marginTop: "1.5rem",
            }}
          >
            Join us !
          </Button>
        </Box>
      </Box>
      <hr
        style={{
          width: "90%",
          borderBottom: "3px solid #fff",
        }}
      />
      <Fade bottom duration={1500}>
        <Box
          display={"flex"}
          textAlign={"justify"}
          sx={{
            background: `hsla(0, 0%, 3%, 1), linear-gradient(45deg, hsla(0, 0%, 3%, 1) 0%, hsla(196, 100%, 41%, 1) 40%, hsla(196, 100%, 21%, 1) 92%)`,
          }}
          mt={"0%"}
          marginLeft={"80px"}
          marginRight={"80px"}
          pt={"1.5%"}
          pl={"4%"}
          pr={"4%"}
          columnGap={"7%"}
          alignItems={"center"}
          alignContent={"center"}
        >
          <div>
            <Zoom>
              <img
                src={droneImage}
                alt="this is a robotic hand"
                style={{
                  // To occupy half the space
                  marginTop: "20%",
                  borderRadius: "10px", // To give it a circular shape
                  maxWidth: "350px",
                  minHeight: "350px", // To add a box shadow with dark green color
                }}
              />
            </Zoom>
          </div>
          <div>
            <Typography
              color={"#FFF"}
              fontSize={"36px"}
              mt={2}
              fontWeight={"bold"}
            >
              Our Projects
            </Typography>
            <Typography color={"#fff"} fontSize={"20px"} mt={2}>
              Our journey through innovation and technology has led us to a
              diverse range of remarkable projects. We've ventured into the
              creation of a versatile quadcopter drone and a hexacopter - a
              six-rotor aerial system, designed a simple yet effective robotic
              arm, and organized the immersive event "Vision X," showcasing the
              boundless possibilities of Augmented Reality.
            </Typography>
            <Typography color={"#fff"} fontSize={"20px"} mt={2}>
              In addition to these accomplishments, we are also actively engaged
              in several ongoing projects, including the development of a
              Micromouse – a miniature, maze-solving robot, and the creation of
              an advanced Rover for exploring terrestrial environments.
            </Typography>
          </div>
        </Box>
      </Fade>
      <Fade bottom duration={1500}>
        <Box
          display={"flex"}
          textAlign={"justify"}
          sx={{
            background: `hsla(0, 0%, 3%, 1), linear-gradient(45deg, hsla(0, 0%, 3%, 1) 0%, hsla(196, 100%, 41%, 1) 40%, hsla(196, 100%, 21%, 1) 92%)`,
          }}
          marginLeft={"80px"}
          marginRight={"80px"}
          pl={"4%"}
          pr={"4%"}
          columnGap={"6%"}
          alignItems={"center"}
          alignContent={"center"}
        >
          <div>
            <Typography color={"#FFF"} fontSize={"36px"} fontWeight={"bold"}>
              Our Events
            </Typography>
            <Typography color={"#fff"} fontSize={"20px"} mt={2}>
              Numerous thrilling events have taken place, among which we have
              Colloquium '23, a poster presentation extravaganza. Additionally,
              a robotic workshop was conducted, featuring the esteemed CEO of
              Nugenix Robotics. Furthermore, we offered a comprehensive
              exploration of the fundamentals of deep learning, led by the DLI
              ambassador, Dr. Sri Phani Krishna Sir.
            </Typography>
          </div>
          <div>
            <Zoom>
              <img
                src={colloqiumimage}
                alt="this is a robotic hand"
                style={{
                  // To occupy half the space
                  marginTop: "20%",
                  borderRadius: "10px", // To give it a circular shape
                  maxWidth: "500px",
                  minHeight: "350px", // To add a box shadow with dark green color
                }}
              />
            </Zoom>
          </div>
        </Box>
      </Fade>
      <hr
        style={{
          width: "90%",
          borderBottom: "3px solid #fff",
          marginTop: "3rem",
        }}
      />
      <Fade bottom duration={1500}>
        <Box
          display={"flex"}
          textAlign={"justify"}
          sx={{
            background: `hsla(0, 0%, 3%, 1), linear-gradient(45deg, hsla(0, 0%, 3%, 1) 0%, hsla(196, 100%, 41%, 1) 40%, hsla(196, 100%, 21%, 1) 92%)`,
          }}
          borderRadius={20}
          mt={"0%"}
          marginLeft={"20px"}
          marginRight={"20px"}
          mb={"4%"}
          pt={"1.5%"}
          pb={!isMobile ? "4%" : "8%"}
          pl={"4%"}
          pr={"4%"}
          gap={"10%"}
        >
          <div>
            <Zoom>
              <img
                src={image3}
                alt="this is a robotic hand"
                style={{
                  marginTop: "20px",
                  // To occupy half the space
                  borderRadius: "10px", // To give it a circular shape
                  maxWidth: "400px",
                  minHeight: "450px", // To add a box shadow with dark green color
                }}
              />
              <Typography
                fontSize={"36px"}
                fontWeight="bold"
                mt={1}
                textAlign={"center"}
                width={"100%"}
              >
                Sri Phani Krishna
              </Typography>
              <Typography
                fontSize={"16px"}
                mt={-1}
                textAlign={"center"}
                width={"100%"}
              >
                Mentor, AI & Robotics Club
              </Typography>
            </Zoom>
          </div>
          <div>
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
        </Box>
      </Fade>

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
            display={"flex"}
            textAlign={"justify"}
            sx={{
              background: `hsla(0, 0%, 3%, 1), linear-gradient(45deg, hsla(0, 0%, 3%, 1) 0%, hsla(120, 24%, 38%, 1) 40%, hsla(120, 24%, 19%, 1) 92%)`,
            }}
            mt={"2%"}
            mb={"4%"}
            marginLeft={"20px"}
            marginRight={"20px"}
            pt={"1.5%"}
            pb={!isMobile ? "4%" : "8%"}
            pl={"4%"}
            pr={"4%"}
          >
            <div>
              <Typography fontSize={"36px"} fontWeight="bold" mt={4}>
                Various New Technologies Used:
              </Typography>
              <Typography color={"#C4985A"} fontSize={"20px"} mt={2}>
                - Raspberry Pi: A small, affordable single-board computer that
                can be used for a variety of projects, from home automation to
                robotics.
              </Typography>
              <Typography color={"#C4985A"} fontSize={"20px"} mt={2}>
                - Arduino: An open-source electronics platform based on
                easy-to-use hardware and software, often used for prototyping
                and robotics projects.
              </Typography>
              <Typography color={"#C4985A"} fontSize={"20px"} mt={2}>
                - Machine Learning: A subset of AI that enables machines to
                learn from data and make predictions or decisions based on that
                learning.
              </Typography>
              <Typography color={"#C4985A"} fontSize={"20px"} mt={2}>
                - Computer Vision: The field of AI and computer science that
                focuses on enabling computers to interpret and understand visual
                information from the world.
              </Typography>
              <Typography color={"#C4985A"} fontSize={"20px"} mt={2}>
                - Natural Language Processing (NLP): An AI technology that
                enables computers to understand, interpret, and generate human
                language.
              </Typography>
              <Typography color={"#C4985A"} fontSize={"20px"} mt={2}>
                - Robotics: The design, construction, operation, and use of
                robots to automate tasks, perform complex actions, or interact
                with the environment.
              </Typography>
              <Typography color={"#C4985A"} fontSize={"20px"} mt={2}>
                - Internet of Things (IoT): A network of interconnected devices
                and objects that can collect and exchange data through the
                internet.
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
                    marginRight: "110px",
                    // To give it a circular shape

                    maxWidth: "400px",
                    minHeight: "450px", // To add a box shadow with dark green color
                  }}
                />
              </Zoom>
            </div>
          </Box>
        </Fade>
      </div>
    </Box>
  );
};

export default Home;

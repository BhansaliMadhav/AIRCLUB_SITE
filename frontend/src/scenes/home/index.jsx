import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, useMediaQuery, useTheme } from "@mui/material";
import { Typography, TextField } from "@mui/material";
import { useGetAnnouncementsQuery } from "state/api";
import Announcement from "../announcement";
import HeaderMobile from "components-mobile/HeaderMobile";
import HeaderNonMobile from "components/HeaderNonMobile";
import { useGetShortAnnouncementQuery } from "state/api";
import { tokens } from "theme";
import { Avatar } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { DoubleArrowOutlined } from "@mui/icons-material";
import droneImage from "images/drone.jpeg";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom"; // Import the Fade animation component
import backgroundimage from "images/1.jpg";
import colloqiumImage from "images/coll-5.jpeg";
import slideshow1 from "images/WhatsApp Image 2023-08-08 at 13.49.32 (1).jpeg";
import slideshow2 from "images/WhatsApp Image 2023-08-08 at 13.49.32.jpeg";
import { TweenMax, Power3 } from "gsap";

const Home = ({ _id, title, link }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data, isLoading } = useGetAnnouncementsQuery();

  const slides = [slideshow1, slideshow2];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAnnouncements, setShowAnnouncements] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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
  let logoIcon = useRef("hello World");

  async function handleFormSubmit(event) {
    event.preventDefault();

    const response = await fetch(
      process.env.REACT_APP_BASE_URL + "/member/becomeMember",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${process.env.REACT_APP_UserApiKey}`,
        },

        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
        }),
      }
    );
    const data = await response.json();
    if (data.requestRecived === true) {
      alert("Request Submitted");
    } else {
      alert("Request Already recived with one of the same contact details");
    }
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center" // Center both horizontally and vertically
      m={isMobile ? "2vh 5vw" : "-5.5rem 0 0 0"}
    >
      <div style={{ padding: "0", margin: "0", width: "100%" }}>
        <img
          src={backgroundimage}
          style={{ height: "100vh", width: "100%", opacity: "0" }}
        />
        <div
          style={{
            position: "absolute",
            top: "100px",
            left: "40px",
            padding: "0",
            margin: "0",
          }}
        >
          <Typography
            sx={{
              fontFamily: "sans-serif",
              fontWeight: "bold",
              fontSize: "78px",
              textAlign: "left",
            }}
          >
            Unleashing Innovation
          </Typography>
          <Typography
            sx={{
              fontFamily: "Gabarito",
              fontSize: "78px",
              marginTop: "-40px",
              textAlign: "left",
            }}
          >
            One byte at a time
          </Typography>
          <div
            style={{
              textAlign: "left",
              width: "100%",
              marginTop: "-1.5rem",
              marginLeft: "-0.4rem",
            }}
          >
            <DoubleArrowOutlined
              style={{
                fontSize: "72px",
                stroke: "#000000",
                strokeWidth: "1.5",
                rotate: "90deg",
              }}
            />
          </div>
        </div>
      </div>
      <div style={{ display: "flex", width: "100%", margin: "1.5rem 0" }}>
        <div style={{ marginRight: "5rem", marginLeft: "5rem" }}>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: "40px",
              fontWeight: "600",
              marginTop: "30px",
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
      <hr style={{ width: "90%", border: "#fff 2px solid " }} />
      <Box
        display={"flex"}
        textAlign={"justify"}
        sx={{
          background: `hsla(0, 0%, 3%, 1), linear-gradient(45deg, hsla(0, 0%, 3%, 1) 0%, hsla(196, 100%, 41%, 1) 40%, hsla(196, 100%, 21%, 1) 92%)`,
        }}
        mt={"3%"}
        marginLeft={"20px"}
        marginRight={"20px"}
        pt={"1.5%"}
        pb={!isMobile ? "2%" : "8%"}
        pl={"4%"}
        pr={"4%"}
        columnGap={"7%"}
        alignContent={"center"}
        width={"100%"}
        alignItems={"center"}
        justifyContent="center"
      >
        <div
          style={{ width: "77%", alignItems: "center", alignContent: "center" }}
        >
          <Typography
            fontSize={"36px"}
            textAlign={"left"}
            fontWeight="bold"
            mt={4}
          >
            Hi there !
          </Typography>
          <Typography color={"#fff"} fontSize={"22px"} mt={2}>
            We're a dynamic and passionate group of undergraduate students who
            are deeply immersed in the world of artificial intelligence and
            robotics. Our club is a hub of innovation and a platform for
            enthusiastic young minds to come together and explore the exciting
            realms of AI and robotics.
          </Typography>
          <Typography color={"#fff"} fontSize={"22px"} mt={2}>
            Here at our club, you'll find an array of thrilling projects that
            span the technological spectrum. We've ventured into the skies with
            automated drones, conquered precision and control with our robotic
            arm, and delved into the immersive world of Augmented Reality (AR).
            Our Micromouse project has challenged our members to design and
            build autonomous, maze-solving robots, showcasing our dedication to
            problem-solving.
          </Typography>
          <div
            style={{
              display: "flex",
              columnGap: "7%",
              width: "100%",
              justifyContent: "center",
              marginTop: "3%",
            }}
          >
            <Button
              variant="outlined"
              sx={{
                color: "#fff",
                border: "2px solid #fff",
                borderRadius: "4rem",
                fontSize: "24px",
                marginTop: "1rem",
                marginBottom: "1rem",
                width: "13rem",
              }}
            >
              Join Us !
            </Button>
          </div>
        </div>
      </Box>
      <hr style={{ width: "90%", border: "#fff 2px solid " }} />
      <Fade bottom duration={1500}>
        <Box
          display={"flex"}
          textAlign={"justify"}
          sx={{
            background: `hsla(0, 0%, 3%, 1), linear-gradient(45deg, hsla(0, 0%, 3%, 1) 0%, hsla(196, 100%, 41%, 1) 40%, hsla(196, 100%, 21%, 1) 92%)`,
          }}
          mt={"3%"}
          marginLeft={"20px"}
          marginRight={"20px"}
          pt={"1.5%"}
          pb={!isMobile ? "4%" : "8%"}
          pl={"4%"}
          pr={"4%"}
          columnGap={"7%"}
          alignContent={"center"}
        >
          <div style={{ marginTop: "1.5%" }}>
            <Zoom>
              <img
                src={droneImage}
                alt="this is a robotic hand"
                style={{
                  // To occupy half the space
                  borderRadius: "10px",

                  // To give it a circular shape
                  maxWidth: "350px",
                  minHeight: "350px", // To add a box shadow with dark green color
                }}
              />
            </Zoom>
          </div>
          <div>
            <Typography fontSize={"36px"} fontWeight="bold" mt={4}>
              Our Projects
            </Typography>
            <Typography color={"#fff"} fontSize={"22px"} mt={2}>
              Our journey through innovation and technology has led us to a
              diverse range of remarkable projects. We've ventured into the
              creation of a versatile quadcopter drone and a hexacopter - a
              six-rotor aerial system, designed a simple yet effective robotic
              arm, and organized the immersive event "Vision X," showcasing the
              boundless possibilities of Augmented Reality.
            </Typography>
            <Typography color={"#fff"} fontSize={"22px"} mt={2}>
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
          mt={"3%"}
          marginLeft={"20px"}
          marginRight={"20px"}
          pt={"1.5%"}
          pb={!isMobile ? "4%" : "8%"}
          pl={"4%"}
          pr={"4%"}
          columnGap={"7%"}
        >
          <div>
            <Typography fontSize={"36px"} fontWeight="bold" mt={4}>
              Our Events
            </Typography>
            <Typography color={"#fff"} fontSize={"22px"} mt={2}>
              Numerous thrilling events have taken place, among which we have
              Colloquium '23, a poster presentation extravaganza. Additionally,
              a robotic workshop was conducted, featuring the esteemed CEO of
              Nugenix Robotics. Furthermore, we offered a comprehensive
              exploration of the fundamentals of deep learning, led by the DLI
              ambassador, Dr. Sri Phani Krishna Sir.
            </Typography>
          </div>
          <div style={{}}>
            <Zoom>
              <img
                src={colloqiumImage}
                alt="this is a robotic hand"
                style={{
                  // To occupy half the space
                  borderRadius: "10px",

                  // To give it a circular shape
                  maxWidth: "550px",
                  minHeight: "400px", // To add a box shadow with dark green color
                }}
              />
            </Zoom>
          </div>
        </Box>
      </Fade>
      <hr style={{ width: "90%", border: "#fff 2px solid " }} />
      <div
        style={{
          display: "flex",
          width: "100%",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ marginLeft: "5rem", marginTop: "-4rem" }}
          variant={"h2"}
          color={"#fff"}
          textAlign={"left"}
          width={"13rem"}
          fontSize={"48px"}
          fontWeight={"600"}
        >
          {" "}
          Contact Us !
        </Typography>
        <Box
          mt={"3rem"}
          justifyContent={"center"}
          display={"flex"}
          width={"100%"}
        >
          <form onSubmit={handleFormSubmit} style={{ width: "75%" }}>
            <Box
              display="grid"
              rowGap={"30px"}
              columnGap={"5rem"}
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
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
                label="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                name="firstName"
                required
                autoComplete="off"
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                name="lastName"
                required
                sx={{ gridColumn: "span 2" }}
                autoComplete="off"
              />
              <TextField
                fullWidth
                variant="filled"
                type="email"
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                name="email"
                required
                sx={{ gridColumn: "span 2" }}
                autoComplete="off"
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                name="phone"
                required
                sx={{ gridColumn: "span 2" }}
                autoComplete="off"
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                style={{
                  background: "black", // Set the background color to black
                  color: "white", // Set the text color to white
                  border: "2px solid darkgreen", // Add a 2px solid green border
                }}
                sx={{ marginBottom: "2rem" }}
              >
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </div>
    </Box>
  );
};

export default Home;

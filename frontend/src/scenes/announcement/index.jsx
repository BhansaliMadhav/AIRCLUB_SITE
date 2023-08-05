import React, { useState, useEffect } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Typography } from "@mui/material";
import HeaderMobile from "components-mobile/HeaderMobile";
import HeaderNonMobile from "components/HeaderNonMobile";
import { Link } from "react-router-dom";
import { useGetAnnouncementsQuery } from "state/api";
import { tokens } from "theme";
import Fade from "react-reveal/Fade"; // Import the Fade animation component

const Announcement = ({ _id, title, link }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isMobile = useMediaQuery("(max-width:1000px)");
  const secondisMobile = useMediaQuery("(max-width:1000px)");
  const { data, isLoading } = useGetAnnouncementsQuery();

  const [showAnnouncements, setShowAnnouncements] = useState(false);

  useEffect(() => {
    if (data && !isLoading) {
      setShowAnnouncements(true);
    }
  }, [data, isLoading]);

  const items1 = data
    ? data.map(({ title, link, _id }) => ({ text: title, link, _id }))
    : [];

  return (
    <Box
      m={isMobile ? "2vh 5vw" : "1.5rem 2.5rem"}
      sx={{
        color: theme.palette.background.main,
        background: theme.palette.background.main,
      }}
    >
      {isMobile ? (
        <HeaderMobile
          title={"Announcements"}
          subTitle={"Recent Announcements"}
        />
      ) : (
        <HeaderNonMobile
          title={"Announcements"}
          subTitle={"Recent Announcements"}
        />
      )}
      <Box
        mt={"20px"}
        display={"grid"}
        gridTemplateColumns={
          secondisMobile ? "1fr" : "repeat(auto-fit, minmax(350px, 1fr))" // Updated gridTemplateColumns
        }
        justifyContent={"center"}
        rowGap={"20px"}
        columnGap={"1.33%"}
        width={"100%"}
        sx={{
          "& > div": {
            gridColumn: "span 1", // Each box occupies a single column
            [theme.breakpoints.up("md")]: {
              gridColumn: "span 2", // On medium screens and above, each box occupies two columns
            },
          },
        }}
      >
        {showAnnouncements &&
          items1.map(({ text, link, _id }, index) => (
            <Fade key={_id} duration={3000} bottom>
              {" "}
              {/* Apply the Fade-in animation with a duration of 3 seconds */}
              <Box
                sx={{
                  m: secondisMobile
                    ? "1rem 0.5rem 0rem 0.5rem"
                    : "2rem 2rem 2rem 2rem",
                  fontSize: "4rem", // Doubled the font size
                  color: "black",
                  backgroundColor: theme.palette.background.alt2,
                  borderRadius: "8px",
                  padding: "1rem",
                  textAlign: "justify",
                  border: `2px solid ${"#398285"}`,
                  boxShadow: `0px 0px 20px ${colors.greenAccent[500]}`,
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
                      color: theme.palette.secondary.alt,
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
            </Fade>
          ))}
      </Box>
    </Box>
  );
};

export default Announcement;

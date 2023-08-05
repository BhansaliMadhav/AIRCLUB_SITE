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
        color: "#00FF00",
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
          secondisMobile ? undefined : "repeat(2, 1fr)" // Corrected gridTemplateColumns for non-mobile (large screens)
        }
        justifyContent={"center"}
        rowGap={"20px"}
        columnGap={"1.33%"}
        width={"100%"}
        sx={{
          "& > div": {
            gridColumns: "span 2",
          },
        }}
      >
        <Fade key={_id} duration={3000} bottom>
          {showAnnouncements &&
            items1.map(({ text, link, _id }, index) => (
              <Box
                sx={{
                  m: secondisMobile
                    ? "1rem 0.5rem 0rem 0.5rem"
                    : "2rem 2rem 2rem 2rem",
                  fontSize: "4rem", // Doubled the font size
                  color: "black",
                  backgroundColor: "#32C61E",
                  borderRadius: "8px",
                  padding: "1rem",
                  textAlign: "justify",
                  boxShadow: `0px 0px 20px #000000`,
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
        </Fade>
      </Box>
    </Box>
  );
};

export default Announcement;

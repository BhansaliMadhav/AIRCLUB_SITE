import React, { useState, useEffect } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Typography } from "@mui/material";
import HeaderMobile from "components-mobile/HeaderMobile";
import HeaderNonMobile from "components/HeaderNonMobile";
import { Link } from "react-router-dom";
import { useGetAnnouncementsQuery } from "state/api";
import { tokens } from "theme";

const Announcement = ({ _id, title, link }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isMobile = useMediaQuery("(max-width:686px)");
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
          secondisMobile ? "1fr" : "repeat(4, minmax(300px, 1fr))"
        }
        justifyContent={"space-between"}
        rowGap={"20px"}
        columnGap={"1.33%"}
        width={"100%"}
        sx={{
          "& > div": {
            gridColumn: !secondisMobile ? undefined : "span 2",
          },
        }}
      >
        {showAnnouncements &&
          items1.map(({ text, link, _id }, index) => (
            <Box
              key={_id}
              sx={{
                m: secondisMobile
                  ? "2rem 0.5rem 2rem 0.5rem"
                  : "2rem 5rem 2rem 5rem",
                fontSize: "2rem",
                color: "black",
                backgroundColor: theme.palette.background.alt2,
                gridColumn: "span 2",
                borderRadius: "8px",
                padding: "1rem",
                textAlign: "justify",
                opacity: 0,
                animation: `fadeIn 0.5s ease forwards ${index * 0.2}s`, // Apply fade-in animation
              }}
            >
              <Link
                to={`${link}`}
                variant="h3"
                sx={{
                  m: "2.25rem 0 1rem 2.25rem",
                  color: theme.palette.text.alt3,
                  whiteSpace: "pre-wrap", // Allow text to wrap
                  wordBreak: "break-word", // Break words if they exceed the container width
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
          ))}
      </Box>
    </Box>
  );
};

export default Announcement;

import React from "react";
import { Box, Typography, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      p={3}
      textAlign="center"
      borderTop={`1px solid ${theme.palette.divider}`}
      backgroundColor={theme.palette.background.paper}
      position="sticky"
      left={0}
      bottom={0}
      width="100%"
      zIndex={1}
    >
      <Typography variant="body2" color={theme.palette.text.secondary}>
        This awesome website was made by{" "}
        <Box sx={{ display: "inline-flex", alignItems: "center" }}>
          <Link
            href="https://www.linkedin.com/in/adyant-d-a57895225"
            target="_blank"
            rel="noopener noreferrer"
            color={theme.palette.secondary.main}
          >
            <Typography sx={{ fontWeight: "bold", textTransform: "none" }}>
              Adyanta Dubey (Reg-No: 9222359)
            </Typography>
          </Link>
          <LinkedInIcon sx={{ mt: "1px", fontSize: "1rem" }} />
        </Box>{" "}
        and{" "}
        <Box sx={{ display: "inline-flex", alignItems: "center" }}>
          <Link
            href="https://www.linkedin.com/in/madhav-bhansali-649261252/"
            target="_blank"
            rel="noopener noreferrer"
            color={theme.palette.secondary.main}
          >
            <Typography sx={{ fontWeight: "bold", textTransform: "none" }}>
              Madhav Bhansali (Reg-No: 9211214)
            </Typography>
          </Link>
          <LinkedInIcon sx={{ mt: "1px", fontSize: "1rem" }} />
        </Box>
      </Typography>
    </Box>
  );
};

export default Footer;

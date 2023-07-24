import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  useMediaQuery,
  Typography,
  useTheme,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import HeaderMobile from "components-mobile/HeaderMobile";
import HeaderNonMobile from "components/HeaderNonMobile";
import { useGetBecomeMemberDataQuery } from "state/api";
import { tokens } from "theme";
import jwt from "jsonwebtoken";
import Footer from "components/Footer";

const MemberRequests = () => {
  const isMobile = useMediaQuery("(max-width:686px)");
  const navigate = useNavigate();

  async function populateQuote() {
    const req = await fetch(process.env.REACT_APP_BASE_URL + "/api/quote", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const data = await req.json();

    if (data.status === "ok") {
    } else {
      alert(data.error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/admin");
      } else {
        populateQuote();
      }
    } else {
      navigate("/admin");
    }
  });

  const { data, isLoading } = useGetBecomeMemberDataQuery();

  async function Approve(event, _id) {
    const response = await fetch(
      process.env.REACT_APP_BASE_URL + "/member/approve",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${process.env.REACT_APP_AdminApiKey}`,
        },
        body: JSON.stringify({
          _id: _id,
        }),
      }
    );
    const data = await response.json();
    if (data.member) {
      alert("Approved Successfully");
    } else {
      alert("There was an error. Please contact the creator");
    }
    window.location.reload();
  }

  async function Deny(event, _id) {
    event.preventDefault();
    const response = await fetch(
      process.env.REACT_APP_BASE_URL + "/member/deny",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${process.env.REACT_APP_AdminApiKey}`,
        },
        body: JSON.stringify({
          _id: _id,
        }),
      }
    );
    const data = await response.json();
    if (data.member) {
      alert("Denied Successfully");
    } else {
      alert("There was an error. Please contact the creator");
    }
    window.location.reload();
  }

  const Request = ({
    _id,
    firstName,
    lastName,
    email,
    phone,
    resumeLink,
    domain,
    department,
  }) => {
    const theme = useTheme();
    const [requestId, setRequestId] = useState(_id);
    const colors = tokens(theme.palette.mode);

    return (
      <Card
        sx={{
          backgroundImage: "none",
          backgroundColor: theme.palette.background.alt,
          borderRadius: "0.55rem",
        }}
      >
        <CardContent>
          <Typography
            sx={{
              fontSize: "14",
              color: theme.palette.text.default,
              gutterBottom: true,
            }}
          >
            Domain: {domain}
          </Typography>
          <Typography variant="h4" component={"div"}>
            {firstName + " " + lastName}
          </Typography>

          <Typography variant="h5" fontWeight={"700"} color={colors.grey[200]}>
            {department}
          </Typography>
          <Typography color={colors.grey[200]} variant="h6">
            {email}
          </Typography>
          <Typography color={colors.blueAccent[100]} variant="h5">
            {Number(phone)}
          </Typography>
          <Link
            to={`${resumeLink}`}
            style={{
              cursor: "pointer",
              textDecoration: "none",
              color: theme.palette.secondary.alt,
              fontFamily: "Ariel",
              fontWeight: 600,
            }}
          >
            <Typography variant="h5">
              {" "}
              Resume Link: {" " + resumeLink}
            </Typography>
          </Link>
        </CardContent>
        <CardActions>
          <Box display={"flex"} width={"100%"}>
            <Button
              variant="contained"
              size="small"
              sx={{ width: "50%" }}
              color="success"
              onClick={(event) => Approve(event, requestId)}
            >
              Accept
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{ width: "50%" }}
              color="error"
              onClick={(event) => Deny(event, requestId)}
            >
              Deny
            </Button>
          </Box>
        </CardActions>
      </Card>
    );
  };

  const LoadingAnimation = () => (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height={200}
      fontSize={20}
      color="#888"
    >
      <div className="loading-spinner"></div>
      Loading...
    </Box>
  );

  return (
    <Box m={isMobile ? "2vh 5vw" : "1.5rem 2.5rem"}>
      {isMobile ? (
        <HeaderMobile
          title={"Member Requests"}
          subTitle={"Manage Member Requests"}
        />
      ) : (
        <HeaderNonMobile
          title={"Member Requests"}
          subTitle={"Manage Member Requests"}
        />
      )}
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <Box
          mt={"20px"}
          display={"grid"}
          gridTemplateColumns={"repeat(4,minmax(0,1fr))"}
          justifyContent={"space-between"}
          rowGap={"20px"}
          columnGap={"1.33%"}
          sx={{
            "& > div": {
              gridColumn: !isMobile ? undefined : "span 4",
            },
          }}
        >
          {data.map(
            ({
              _id,
              firstName,
              lastName,
              email,
              phone,
              resumeLink,
              domain,
              department,
            }) => (
              <Request
                key={_id}
                _id={_id}
                firstName={firstName}
                lastName={lastName}
                email={email}
                phone={phone}
                resumeLink={resumeLink}
                domain={domain}
                department={department}
              />
            )
          )}
        </Box>
      )}
    </Box>
  );
};

export default MemberRequests;

import React, { useState } from "react";
import {
  Box,
  useMediaQuery,
  Typography,
  useTheme,
  Card,
  CardContent,
  CardActions,
  CardMedia,
} from "@mui/material";
import { tokens } from "theme";
import {
  useGetNewCoSecQuery,
  useGetNewExecutiveMemberQuery,
  useGetNewJrSecQuery,
  useGetNewMemberQuery,
  useGetNewSecQuery,
} from "state/api";

import HeaderMobile from "components-mobile/HeaderMobile";
import HeaderNonMobile from "components/HeaderNonMobile";

const Request = ({
  _id,
  firstName,
  lastName,
  position,
  domain,
  department,
  year,
  photo,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const Department = department.toUpperCase() + " " + year;
  // const Photo = useState(photo);
  const extractIdFromLink = (link) => {
    const pattern = /id=([\w-]+)/;
    const match = link.match(pattern);
    if (match) {
      return match[1];
    } else {
      return null;
    }
  };
  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <Box display={"flex"}>
        <CardContent sx={{ width: "30%" }}>
          <CardMedia
            sx={{ height: "25vh", width: "100%" }}
            component={"img"}
            image={
              extractIdFromLink(photo)
                ? "https://drive.google.com/uc?export=view&id=" +
                  extractIdFromLink(photo)
                : undefined
            }
          />
        </CardContent>
        <CardContent>
          <Typography
            sx={{
              fontSize: "20px",
              color: theme.palette.text.default,
              gutterBottom: true,
            }}
          >
            Position: {position}
          </Typography>
          <Typography variant="h2" component={"div"}>
            {firstName.toUpperCase()} {lastName.toUpperCase()}
          </Typography>

          <Typography
            variant="h4"
            fontWeight={"700"}
            color={colors.grey[200]}
            mt={"0.5rem"}
          >
            {Department}
          </Typography>

          <Typography color={colors.blueAccent[100]} variant="h5"></Typography>
          <Typography
            color={colors.grey[200]}
            variant="h6"
            fontWeight={"700"}
          ></Typography>
          <Typography variant="h4" mt={"1rem"}>
            {" "}
            Field of Intrest:
          </Typography>
          <Typography
            sx={{
              fontSize: "20px",
              color: theme.palette.text.default,
              gutterBottom: true,
            }}
          >
            {domain}
          </Typography>
        </CardContent>
      </Box>
      <CardActions>
        <Box display={"flex"} width={"100%"}></Box>
      </CardActions>
    </Card>
  );
};

const CurrentMembers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery("(max-width:686px)");
  const dataCoSec = useGetNewCoSecQuery().data;
  const dataSec = useGetNewSecQuery().data;
  const JrSec = useGetNewJrSecQuery().data;
  const dataExec = useGetNewExecutiveMemberQuery().data;
  const dataMemb = useGetNewMemberQuery().data;

  return (
    <Box m={isMobile ? "2vh 5vw" : "1.5rem 2.5rem"}>
      {isMobile ? (
        <HeaderMobile title={"CurrentMembers"} subTitle={"CurrentMembers"} />
      ) : (
        <HeaderNonMobile
          title={"CurrentMembers"}
          subTitle={" CurrentMembers"}
        />
      )}

      {dataMemb ? (
        <Box
          mt={"20px"}
          display={"grid"}
          gridTemplateColumns={
            isMobile ? "1fr" : "repeat(2, minmax(300px, 1fr))"
          }
          justifyContent={"space-between"}
          rowGap={"20px"}
          columnGap={"1.33%"}
          sx={{
            "& > div": {
              gridColumn: !isMobile ? undefined : "span 1",
            },
          }}
        >
          {dataMemb.map(
            ({
              _id,
              firstName,
              lastName,
              position,
              domain,
              department,
              year,
              photo,
            }) => (
              <Request
                key={_id} // Use the unique _id as the key
                _id={_id}
                firstName={firstName}
                lastName={lastName}
                domain={domain}
                department={department}
                position={position}
                year={year}
                photo={photo}
              />
            )
          )}

          {/* {dataCoSec.map(
            ({
              _id,
              firstName,
              lastName,
              position,
              domain,
              department,
              year,
             
            }) => (
              <Request
                key={_id}
                _id={_id}
                firstName={firstName}
                lastName={lastName}
                domain={domain}
                department={department}
                position={position}
                year={year}
                
              />
            )
          )} */}
        </Box>
      ) : (
        <>Loading ....</>
      )}

      {JrSec ? (
        <Box
          mt={"20px"}
          display={"grid"}
          gridTemplateColumns={
            isMobile ? "1fr" : "repeat(3, minmax(300px, 1fr))"
          }
          justifyContent={"space-between"}
          rowGap={"20px"}
          columnGap={"1.33%"}
          sx={{
            "& > div": {
              gridColumn: !isMobile ? undefined : "span 1",
            },
          }}
        >
          {/* {JrSec.map(
            ({
              _id,
              firstName,
              lastName,
              position,
              domain,
              department,
              year,
              
            }) => (
              <Request
                key={_id}
                _id={_id}
                firstName={firstName}
                lastName={lastName}
                domain={domain}
                department={department}
                position={position}
                year={year}
                
              />
            )
          )} */}
        </Box>
      ) : (
        <>Loading ....</>
      )}
    </Box>
  );
};

export default CurrentMembers;

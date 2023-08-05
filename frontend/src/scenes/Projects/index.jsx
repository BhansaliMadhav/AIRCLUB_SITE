import React from "react";

import {
  Box,
  useMediaQuery,
  Typography,
  useTheme,
  Card,
  CardContent,
} from "@mui/material";
import HeaderMobile from "components-mobile/HeaderMobile";
import HeaderNonMobile from "components/HeaderNonMobile";
import {
  useGetOngoingProjectDataQuery,
  useGetCompletedProjectDataQuery,
} from "state/api";
import { tokens } from "theme";
import { ImportantDevices } from "@mui/icons-material";
import Flash from "react-reveal/Flash";
const backgroundStyles = `
  background: hsla(120, 6%, 90%, 1);
  background: linear-gradient(
    135deg,
    hsla(120, 6%, 90%, 1) 0%,
    hsla(228, 78%, 34%, 1) 50%,
    hsla(220, 9%, 74%, 1) 100%
  );
  background: -moz-linear-gradient(
    135deg,
    hsla(120, 6%, 90%, 1) 0%,
    hsla(228, 78%, 34%, 1) 50%,
    hsla(220, 9%, 74%, 1) 100%
  );
  background: -webkit-linear-gradient(
    135deg,
    hsla(120, 6%, 90%, 1) 0%,
    hsla(228, 78%, 34%, 1) 50%,
    hsla(220, 9%, 74%, 1) 100%
  );
  filter: progid: DXImageTransform.Microsoft.gradient(
    startColorstr="#E4E7E4",
    endColorstr="#132E9A",
    GradientType=1
  );
`;

// You can use this backgroundStyles in your components

const OngoingProjects = () => {
  const isMobile = useMediaQuery("(max-width:686px)");

  const { data: ongoingProjects, isLoading: ongoingProjectsLoading } =
    useGetOngoingProjectDataQuery();
  const { data: completedProjects, isLoading: completedProjectsLoading } =
    useGetCompletedProjectDataQuery();

  const Request = ({
    _id,
    Project_title,
    Current_fundings,
    Project_description,
    Project_contact_person,
    Current_status,
  }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
      <Flash duration={"2000"}>
        <Card
          className="gradient-background"
          sx={{
            borderRadius: "0.55rem",
            backgroundColor: backgroundStyles,
          }}
        >
          <CardContent>
            <Typography
              sx={{
                fontSize: "30px",
                color: "#C12D2D",
                gutterBottom: true,
                fontWeight: "800",
              }}
            >
              Project-Title:
            </Typography>
            <Typography
              sx={{
                fontSize: "30px",
                color: theme.palette.text.default,
                gutterBottom: true,
                fontWeight: "800",
              }}
            >
              {Project_title}
            </Typography>
            <Typography variant="h3" component={"div"}>
              {Project_description}
            </Typography>

            <Typography
              variant="h3"
              fontWeight={"700"}
              color={colors.grey[200]}
            >
              {Current_fundings}
            </Typography>
            <Typography color={colors.grey[200]} variant="h3">
              Contact Person: {Project_contact_person}
            </Typography>
            <Typography
              variant="h3"
              fontWeight={"700"}
              color={colors.grey[200]}
            >
              {Current_status}
            </Typography>
          </CardContent>
        </Card>
      </Flash>
    );
  };

  return (
    <Box m={isMobile ? "2vh 5vw" : "1.5rem 2.5rem"}>
      {isMobile ? (
        <HeaderMobile
          title={"Projects"}
          subTitle={" Projects Portfolio Of AIR Club"}
        />
      ) : (
        <HeaderNonMobile
          title={"Projects"}
          subTitle={" Projects Portfolio Of AIR Club"}
        />
      )}
      <Box m={isMobile ? "2vh 5vw" : "1.5rem 2.5rem"}>
        {isMobile ? (
          <HeaderMobile title={""} subTitle={" Ongoing Projects"} />
        ) : (
          <HeaderNonMobile title={""} subTitle={" Ongoing Projects"} />
        )}
      </Box>
      {ongoingProjects || !ongoingProjectsLoading ? (
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
          {ongoingProjects.map(
            ({
              _id,
              Project_title,
              Current_fundings,
              Project_description,
              Project_contact_person,
              Current_status,
            }) => (
              <Request
                key={`completed-${_id}`}
                _id={_id}
                Project_title={Project_title}
                Current_fundings={Current_fundings}
                Project_description={Project_description}
                Project_contact_person={Project_contact_person}
                Current_status={Current_status}
              />
            )
          )}
        </Box>
      ) : (
        <div className="loading-animation">Loading...</div>
      )}
      <Box m={isMobile ? "2vh 5vw" : "1.5rem 2.5rem"}>
        {isMobile ? (
          <HeaderMobile title={""} subTitle={" Completed Projects"} />
        ) : (
          <HeaderNonMobile title={""} subTitle={" Completed Projects"} />
        )}
      </Box>
      {completedProjects || !completedProjectsLoading ? (
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
          {completedProjects.map(
            ({
              _id,
              Project_title,
              Current_fundings,
              Project_description,
              Project_contact_person,
              Current_status,
            }) => (
              <Request
                key={_id}
                _id={_id}
                Project_title={Project_title}
                Current_fundings={Current_fundings}
                Project_description={Project_description}
                Project_contact_person={Project_contact_person}
                Current_status={Current_status}
              />
            )
          )}
        </Box>
      ) : (
        <div className="loading-animation">Loading...</div>
      )}
    </Box>
  );
};

export default OngoingProjects;

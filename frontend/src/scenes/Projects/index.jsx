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
            Project-Title: {Project_title}
          </Typography>
          <Typography variant="h4" component={"div"}>
            {Project_description}
          </Typography>

          <Typography variant="h5" fontWeight={"700"} color={colors.grey[200]}>
            {Current_fundings}
          </Typography>
          <Typography color={colors.grey[200]} variant="h6">
            {Project_contact_person}
          </Typography>
          <Typography variant="h5" fontWeight={"700"} color={colors.grey[200]}>
            {Current_status}
          </Typography>
        </CardContent>
      </Card>
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

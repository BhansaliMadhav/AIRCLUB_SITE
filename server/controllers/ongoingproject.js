import ProjectData from "../models/projectmodel.js";
import verifyUser from "./uservalidation.js";
export const getOngoingProjectData = async (req, res) => {
  const apiKey = req.headers.authorization;
  const verified = verifyUser(apiKey);
  if (verified) {
    try {
      const ongoingprojectdata = await ProjectData.find({
        Current_status: "ongoing",
      });
      // console.log("prject data", ongoingprojectdata);
      res.status(200).json(ongoingprojectdata);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  } else {
    res.status(401).json({ message: "UnAuthorised Access" });
  }
};

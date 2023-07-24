import ProjectData from "../models/projectmodel.js";
import verifyUser from "./uservalidation.js";
export const getCompletedProjectData = async (req, res) => {
  const apiKey = req.headers.authorization;
  const verified = verifyUser(apiKey);
  if (verified) {
    try {
      const completedprojectdata = await ProjectData.find({
        Current_status: "completed",
      });
      res.status(200).json(completedprojectdata);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  } else {
    res.status(401).json({ message: "UnAuthorised Access" });
  }
};

import ProjectData from "../models/projectmodel.js";
import verifyUser from "./uservalidation.js";

export const getProjectData = async (req, res) => {
  const apiKey = req.headers.authorization;
  const verified = verifyUser(apiKey);
  if (verified) {
    try {
      const projectdata = await ProjectData.find();
      // console.log("prject data", projectdata);
      res.status(200).json(projectdata);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  } else {
    res.status(401).json({ message: "UnAuthorise Access" });
  }
};

import ProjectData from "../models/projectmodel.js";

export const getProjectData = async (req, res) => {
  try {
    const projectdata = await ProjectData.find();
    // console.log("prject data", projectdata);
    res.status(200).json(projectdata);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

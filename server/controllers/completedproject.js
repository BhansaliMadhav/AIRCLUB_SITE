import ProjectData from "../models/projectmodel.js";

export const getCompletedProjectData = async (req, res) => {
  try {
    const completedprojectdata = await ProjectData.find({
      Current_status: "completed",
    });
    res.status(200).json(completedprojectdata);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

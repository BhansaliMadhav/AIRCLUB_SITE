import ProjectData from "../models/projectmodel.js";

export const getOngoingProjectData = async (req, res) => {
  try {
    const ongoingprojectdata = await ProjectData.find({
      Current_status: "ongoing",
    });
    // console.log("prject data", ongoingprojectdata);
    res.status(200).json(ongoingprojectdata);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

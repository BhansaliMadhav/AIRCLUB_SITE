import express from "express";
import { getProjectData } from "../controllers/project.js";
import ProjectData from "../models/projectmodel.js";
import mongoose from "mongoose";
import { getOngoingProjectData } from "../controllers/ongoingproject.js";
import { getCompletedProjectData } from "../controllers/completedproject.js";
const Router = express.Router();

Router.get("/getProjectData", getProjectData);
Router.post("/add", async (req, res) => {
  try {
    var id = new mongoose.Types.ObjectId();
    const projectdata = await ProjectData.create({
      _id: id,
      Project_title: req.body.Project_title,
      Current_fundings: req.body.Current_fundings,
      Project_description: req.body.Project_description,
      Project_contact_person: req.body.Project_contact_person,
      Current_status: req.body.Current_status,
    });
    res.status(200).json({
      status: "200",
      message: "Project Added",
      projectdata: projectdata,
    });
  } catch (err) {
    res.status(400).json({ status: "400", error: err });
  }
});

Router.post("/remove", async (req, res) => {
  //itna compleceted url ki jarurat nahi hai aur ye function project routes mai likh sakte yahan uss time routes nahi thai issliye likha tha
  try {
    await ProjectData.deleteOne({ _id: req.body._id });
    res.status(200).json({ status: "200", message: "Project removed" });
  } catch (err) {
    res.status(400).json({ status: "400", error: "error" });
  }
});
Router.post("/update", async (req, res) => {
  let update = {};
  try {
    const filters = { _id: req.body._id };
    if (req.body.Current_fundings !== "") {
      update = {
        Current_fundings: req.body.Current_fundings,
        Current_status: req.body.Current_status,
      };
    } else {
      update = {
        Current_status: req.body.Current_status,
      };
    }
    let projectdata = await ProjectData.findByIdAndUpdate(filters, update);
    projectdata = await ProjectData.findOne(filters);
    res.status(200).json({ status: "200" });
  } catch (error) {
    res.status(404).json({ status: "400", message: error.message });
  }
});

Router.get("/getOngoingProjectData", getOngoingProjectData);
Router.get("/getCompletedProjectData", getCompletedProjectData);
export default Router;

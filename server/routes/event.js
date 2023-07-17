import express from "express";
import { getEventData } from "../controllers/event.js";
import EventData from "../models/eventmodel.js";
import mongoose from "mongoose";

const Router = express.Router();

Router.get("/getEventData", getEventData);
Router.post("/add", async (req, res) => {
  try {
    var id = new mongoose.Types.ObjectId();
    const eventdata = await EventData.create({
      _id: id,
      Event_title: req.body.Event_title,
      Event_description: req.body.Event_description,
      Event_photos: req.body.Event_photos,
      Event_date: req.body.Event_date,
    });
    res.status(200).json({
      status: "200",
      message: "Event Added",
      eventdata: eventdata,
    });
  } catch (err) {
    res.status(400).json({ status: "400", error: err });
  }
});

Router.post("/remove", async (req, res) => {
  try {
    await EventData.deleteOne({ _id: req.body._id });
    res.status(200).json({ status: "200", message: "Event Removed" });
  } catch (err) {
    res.status(400).json({ status: "400", error: err });
  }
});

export default Router;

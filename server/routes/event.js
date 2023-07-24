import express from "express";
import { getEventData } from "../controllers/event.js";
import EventData from "../models/eventmodel.js";
import mongoose from "mongoose";
import verifyAdmin from "../controllers/adminValidation.js";
const Router = express.Router();

Router.get("/getEventData", getEventData);
Router.post("/add", async (req, res) => {
  const apiKey = req.headers.authorization;
  const verified = verifyAdmin(apiKey);
  if (verified) {
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
  } else {
    res.status(401).json({ message: "UnAuthorised Access" });
  }
});

Router.post("/remove", async (req, res) => {
  const apiKey = req.headers.authorization;
  const verified = verifyAdmin(apiKey);
  if (verified) {
    try {
      await EventData.deleteOne({ _id: req.body._id });
      res.status(200).json({ status: "200", message: "Event Removed" });
    } catch (err) {
      res.status(400).json({ status: "400", error: err });
    }
  } else {
    res.status(401).json({ message: "UnAuthorised Accedd" });
  }
});

export default Router;

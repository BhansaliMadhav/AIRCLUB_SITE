import express from "express";
import { getAnnouncement } from "../controllers/announcement.js";
import { getShortAnnouncement } from "../controllers/announcement.js";
const Router = express.Router();

Router.get("/getAnnouncement", getAnnouncement);
Router.get("/getShortAnnouncement", getShortAnnouncement);
export default Router;

import express from "express";
import { getAnnouncement } from "../controllers/announcement.js";

const Router = express.Router();

Router.get("/getAnnouncement", getAnnouncement);
export default Router;

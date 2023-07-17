import express from "express";

import { getUsermodel } from "../controllers/user.js";

const Router = express.Router();

Router.get("/getUsermodel", getUsermodel);
export default Router;

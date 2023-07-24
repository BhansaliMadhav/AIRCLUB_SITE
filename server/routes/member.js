import express from "express";
import {
  getMember,
  getbecomeMemberData,
  getnewMember,
  getnewExecutiveMember,
  getnewJrSec,
  getnewCoSec,
  getnewSec,
  getnewData,
} from "../controllers/member.js";
import bodyParser from "body-parser";
import MemberRequestModel from "../models/member_request.js";
import mongoose from "mongoose";
import Member from "../models/add_member.js";
import verifyUser from "../controllers/uservalidation.js";
import verifyAdmin from "../controllers/adminValidation.js";
const Router = express.Router();
Router.use(bodyParser.json());
Router.use(bodyParser.urlencoded({ extended: false }));

Router.get("/getbecomeMemberData", getbecomeMemberData);
Router.get("/getMember", getMember);
Router.get("/getnewMember", getnewMember);
Router.get("/getnewExecutiveMember", getnewExecutiveMember);
Router.get("/getnewJrSec", getnewJrSec);
Router.get("/getnewCosec", getnewCoSec);
Router.get("/getnewSec", getnewSec);
Router.get("/getnewData", getnewData);

Router.post(
  "/becomeMember",
  bodyParser.urlencoded({ extended: false }),

  async function (req, res) {
    var id = new mongoose.Types.ObjectId();
    const apiKey = req.headers.authorization;
    const verified = verifyUser(apiKey);
    if (verified) {
      try {
        const member = await MemberRequestModel.create({
          _id: id,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          phone: req.body.phone,
          department: req.body.department,
          domain: req.body.domain,
          resumeLink: req.body.link,
          requestRecived: true,
          requestApproved: false,
          requestDenied: false,
        });
        res.status(200).json(member);
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
    } else {
      res.status(401).json({ message: "UnAuthorised Access" });
    }
  }
);

Router.post(
  "/approve",
  bodyParser.urlencoded({ extended: false }),
  async function (req, res) {
    var id = new mongoose.Types.ObjectId(req.body._id);
    const apiKey = req.headers.authorization;
    const verified = verifyAdmin(apiKey);
    if (verified) {
      try {
        const member = await MemberRequestModel.findOneAndUpdate(
          {
            _id: id,
          },
          { requestDenied: false, requestApproved: true }
        );
        res.status(200).json({ member: member });
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
    } else {
      res.status(401).json({ message: "UnAuthorised Access" });
    }
  }
);

Router.post(
  "/deny",
  bodyParser.urlencoded({ extended: false }),
  async function (req, res) {
    var id = new mongoose.Types.ObjectId(req.body._id);
    const apiKey = req.headers.authorization;
    const verified = verifyAdmin(apiKey);
    if (verified) {
      try {
        const member = await MemberRequestModel.findByIdAndUpdate(
          {
            _id: id,
          },
          { requestDenied: true, requestApproved: false }
        );
        res.status(200).json({ member: member });
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
    } else {
      res.status(401).json({ message: "UnAuthorised Access" });
    }
  }
);
Router.post(
  "/add",
  bodyParser.urlencoded({ extended: false }),
  async function (req, res) {
    var id = new mongoose.Types.ObjectId();
    const apiKey = req.headers.authorization;
    const verified = verifyAdmin(apiKey);
    if (verified) {
      try {
        const member = await Member.create({
          _id: id,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          phone: req.body.phone,
          department: req.body.department,
          rollNumber: req.body.rollNumber,
          photo: req.body.photo,
          domain: req.body.domain,
          position: req.body.position,
          year: req.body.year,
        });
        res.status(200).json({ status: "200", message: "Successfull" });
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
    } else {
      res.status(401).json({ message: "UnAuthorised Access" });
    }
  }
);

Router.post("/remove", async (req, res) => {
  const apiKey = req.headers.authorization;
  const verified = verifyAdmin(apiKey);
  if (verified) {
    try {
      await Member.deleteOne({ _id: req.body._id });
      res.status(200).json({ status: "200", message: "Member removed" });
    } catch (err) {
      res.status(400).json({ status: "400", error: err });
    }
  } else {
    res.status(401).json({ message: "UnAuthorised Access" });
  }
});

export default Router;

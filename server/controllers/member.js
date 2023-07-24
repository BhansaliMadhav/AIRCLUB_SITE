import MemberRequestModel from "../models/member_request.js";
import Member from "../models/add_member.js";
import bodyParser from "body-parser";
import verifyUser from "./uservalidation.js";
export const getMember = async (req, res) => {
  const apiKey = req.headers.authorization;
  const verified = verifyUser(apiKey);
  if (verified) {
    try {
      const member = await MemberRequestModel.find({});
      res.status(200).json(member);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  } else {
    res.status(401).json({ message: "Un Authorised Access" });
  }
};
export const getbecomeMemberData = async (req, res) => {
  const apiKey = req.headers.authorization;
  const verified = verifyUser(apiKey);
  if (verified) {
    try {
      const memberrequestdata = await MemberRequestModel.find({
        requestDenied: false,
        requestApproved: false,
      });
      res.status(200).json(memberrequestdata);
    } catch (error) {
      res.status(400).json({ message: "error", error: error });
    }
  } else {
    res.status(401).json({ message: "Un Authorised Access" });
  }
};

export const getnewMember = async (req, res) => {
  const apiKey = req.headers.authorization;
  const verified = verifyUser(apiKey);
  if (verified) {
    try {
      const newmember = await Member.find({
        position: "Member",
      }).select("-phone -rollNumber -email -createdAt -updatedAt -__v");
      res.status(200).json(newmember);
    } catch (error) {
      res.status(400).json({ message: "error", error: error });
    }
  } else {
    res.status(401).json({ message: "Un Authorised Access" });
  }
};
export const getnewExecutiveMember = async (req, res) => {
  const apiKey = req.headers.authorization;
  const verified = verifyUser(apiKey);
  if (verified) {
    try {
      const newexecutivemember = await Member.find({
        position: "Executive",
      }).select("-phone -rollNumber -email -createdAt -updatedAt -__v");
      res.status(200).json(newexecutivemember);
    } catch (error) {
      res.status(400).json({ message: "error", error: error });
    }
  } else {
    res.status(401).json({ message: "Un Authorised Access" });
  }
};
export const getnewJrSec = async (req, res) => {
  const apiKey = req.headers.authorization;
  const verified = verifyUser(apiKey);
  if (verified) {
    try {
      const newjrsec = await Member.find({
        position: "Jr-Secretary",
      }).select("-phone -rollNumber -email -createdAt -updatedAt -__v");
      res.status(200).json(newjrsec);
    } catch (error) {
      res.status(400).json({ message: "error", error: error });
    }
  } else {
    res.status(401).json({ message: "Un Authorised Access" });
  }
};
export const getnewCoSec = async (req, res) => {
  const apiKey = req.headers.authorization;
  const verified = verifyUser(apiKey);
  if (verified) {
    try {
      const newcosec = await Member.find({
        position: "Co-Secretary",
      }).select("-phone -rollNumber -email -createdAt -updatedAt -__v");
      res.status(200).json(newcosec);
    } catch (error) {
      res.status(400).json({ message: "error", error: error });
    }
  } else {
    res.status(401).json({ message: "Un Authorised Access" });
  }
};
export const getnewSec = async (req, res) => {
  const apiKey = req.headers.authorization;
  const verified = verifyUser(apiKey);
  if (verified) {
    try {
      const newsec = await Member.find({
        position: "Secretary",
      }).select("-phone -rollNumber -email -createdAt -updatedAt -__v");
      res.status(200).json(newsec);
    } catch (error) {
      res.status(400).json({ message: "error", error: error });
    }
  } else {
    res.status(401).json({ message: "Un Authorised Access" });
  }
};
export const getnewData = async (req, res) => {
  const apiKey = req.headers.authorization;
  const verified = verifyUser(apiKey);
  if (verified) {
    try {
      const newdata = await Member.find({}).select(
        "-phone -rollNumber -email -createdAt -updatedAt -__v"
      );
      res.status(200).json(newdata);
    } catch (error) {
      res.status(400).json({ message: "error", error: error });
    }
  } else {
    res.status(401).json({ message: "Un Authorised Access" });
  }
};

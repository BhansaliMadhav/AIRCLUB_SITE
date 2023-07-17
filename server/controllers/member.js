import MemberRequestModel from "../models/member_request.js";
import Member from "../models/add_member.js";
import bodyParser from "body-parser";
export const getMember = async (req, res) => {
  try {
    const member = await MemberRequestModel.find({});
    res.status(200).json(member);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getbecomeMemberData = async (req, res) => {
  try {
    const memberrequestdata = await MemberRequestModel.find({
      requestDenied: false,
      requestApproved: false,
    });
    res.status(200).json(memberrequestdata);
  } catch (error) {
    res.status(400).json({ message: "error", error: error });
  }
};

export const getnewMember = async (req, res) => {
  try {
    const newmember = await Member.find({
      position: "Member",
    });
    res.status(200).json(newmember);
  } catch (error) {
    res.status(400).json({ message: "error", error: error });
  }
};
export const getnewExecutiveMember = async (req, res) => {
  try {
    const newexecutivemember = await Member.find({
      position: "Executive",
    });
    res.status(200).json(newexecutivemember);
  } catch (error) {
    res.status(400).json({ message: "error", error: error });
  }
};
export const getnewJrSec = async (req, res) => {
  try {
    const newjrsec = await Member.find({
      position: "Jr-Secretary",
    });
    res.status(200).json(newjrsec);
  } catch (error) {
    res.status(400).json({ message: "error", error: error });
  }
};
export const getnewCoSec = async (req, res) => {
  try {
    const newcosec = await Member.find({
      position: "Co-Secretary",
    });
    res.status(200).json(newcosec);
  } catch (error) {
    res.status(400).json({ message: "error", error: error });
  }
};
export const getnewSec = async (req, res) => {
  try {
    const newsec = await Member.find({
      position: "Secretary",
    });
    res.status(200).json(newsec);
  } catch (error) {
    res.status(400).json({ message: "error", error: error });
  }
};
export const getnewData = async (req, res) => {
  try {
    const newdata = await Member.find({});
    res.status(200).json(newdata);
  } catch (error) {
    res.status(400).json({ message: "error", error: error });
  }
};

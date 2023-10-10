import Announcement from "../models/announcenmentModel.js";
import verifyUser from "./uservalidation.js";

export const getAnnouncement = async (req, res) => {
  const apiKey = req.headers.authorization;
  const verified = verifyUser(apiKey);
  if (verified) {
    try {
      const announcements = await Announcement.find({ display: true })
        .sort({ createdAt: -1 })
        .exec();
      res.status(200).json(announcements);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  } else {
    return res.status(401).json({ message: "Invalid API key" });
  }
};


export const getShortAnnouncement = async (req, res) => {
  const apiKey = req.headers.authorization;
  const verified = verifyUser(apiKey);
  if (verified) {
    try {
      const announcements = await Announcement.find({ display: true })
        .sort({ createdAt: -1 })
        .limit(2)
        .exec();
      res.status(200).json(announcements);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  } else {
    return res.status(401).json({ message: "Invalid API key" });
  }
};
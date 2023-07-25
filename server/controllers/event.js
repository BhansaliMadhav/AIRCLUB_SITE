import EventData from "../models/eventmodel.js";
import verifyUser from "./uservalidation.js";
export const getEventData = async (req, res) => {
  const apiKey = req.headers.authorization;
  const verified = verifyUser(apiKey);
  if (verified) {
    try {
      const eventdata = await EventData.find({}).sort({ createdAt: -1 }).exec();
      res.status(200).json(eventdata);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  } else {
    res.status(401).json({ message: "UnAuthorised Access" });
  }
};

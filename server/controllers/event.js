import EventData from "../models/eventmodel.js";

export const getEventData = async (req, res) => {
  try {
    const eventdata = await EventData.find({});
    res.status(200).json(eventdata);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

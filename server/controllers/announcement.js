import Announcement from "../models/announcenmentModel.js";

export const getAnnouncement = async (req, res) => {
  try {
    const announcements = await Announcement.find({ display: true })
      .sort({ createdAt: -1 })
      .exec();
    res.status(200).json(announcements);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

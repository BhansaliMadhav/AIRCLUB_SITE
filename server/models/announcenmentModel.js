import mongoose from "mongoose";
const AnnouncementSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    display: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true, collection: "announcement-data" }
);

const Announcement = mongoose.model("Announcement Data", AnnouncementSchema);

export default Announcement;

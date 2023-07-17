import mongoose from "mongoose";
const EventSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    Event_title: {
      type: String,
      required: true,
    },
    Event_date: {
      type: String,
      required: true,
    },
    Event_description: {
      type: String,
      required: true,
    },
    Event_photos: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, collection: "Event-data" }
);
const EventData = mongoose.model("Event Data", EventSchema);

export default EventData;

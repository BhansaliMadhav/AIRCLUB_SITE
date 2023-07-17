import mongoose from "mongoose";
const ProjectSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    Project_title: {
      type: String,
      required: true,
    },
    Current_fundings: {
      type: Number,
      required: true,
    },
    Project_description: {
      type: String,
      required: true,
    },
    Project_contact_person: {
      type: String,
      required: true,
    },
    Current_status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, collection: "Project-data" }
);

const ProjectData = mongoose.model("Project Data", ProjectSchema);

export default ProjectData;

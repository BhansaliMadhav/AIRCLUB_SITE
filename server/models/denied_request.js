import mongoose from "mongoose";
const DeniedRequest = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    department: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      required: true,
    },
    resumeLink: {
      type: String,
      required: true,
    },
    requestApproved: {
      type: Boolean,
    },
    requestRecived: {
      type: Boolean,
    },
  },
  { timestamps: true, collection: "denied-request" }
);

const DeniedRequestModel = mongoose.model("Denied Request Data", DeniedRequest);

export default DeniedRequestModel;

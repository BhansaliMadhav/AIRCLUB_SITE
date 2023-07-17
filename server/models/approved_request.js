import mongoose from "mongoose";
const ApprovedRequest = new mongoose.Schema(
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
  { timestamps: true, collection: "approved-request" }
);

const ApprovedRequestModel = mongoose.model(
  "Approved Request Data",
  ApprovedRequest
);

export default ApprovedRequestModel;

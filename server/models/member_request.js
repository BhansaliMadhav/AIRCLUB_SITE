import mongoose from "mongoose";
const MemberRequest = new mongoose.Schema(
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
    requestApproved: {
      type: Boolean,
    },
    requestRecived: {
      type: Boolean,
    },
    requestDenied: {
      type: Boolean,
    },
  },
  { timestamps: true, collection: "member-request" }
);

const MemberRequestModel = mongoose.model("Member Request Data", MemberRequest);

export default MemberRequestModel;

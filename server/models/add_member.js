import mongoose from "mongoose";
const AddMemberSchema = new mongoose.Schema(
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
    year: {
      type: String,
      required: true,
    },
    rollNumber: {
      type: Number,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },

    domain: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, collection: "member-data" }
);

const Member = mongoose.model("Member Data", AddMemberSchema);

export default Member;

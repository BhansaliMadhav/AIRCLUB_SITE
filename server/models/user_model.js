import mongoose from "mongoose";
const User = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    quote: { type: String },
  },
  { timestamps: true, collection: "user-data" }
);

const model = mongoose.model("UserData", User);

export default model;

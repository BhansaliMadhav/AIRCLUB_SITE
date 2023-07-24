import model from "../models/user_model.js";
import verifyAdmin from "./adminValidation.js";
export const getUsermodel = async (req, res) => {
  const apiKey = req.headers.authorization;
  const verified = verifyAdmin(apiKey);
  if (verified) {
    try {
      const user = await model.find({ display: true }).select("-password");
      console.log("user model", user);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  } else {
    res.status(401).json({ message: "UnAuthorised Access" });
  }
};

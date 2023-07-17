import model from "../models/user_model.js";

export const getUsermodel = async (req, res) => {
  try {
    const user = await model.find({ display: true });
    console.log("user model", user);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

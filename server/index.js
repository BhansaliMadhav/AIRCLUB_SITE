import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import User from "./models/user_model.js";
import EventData from "./models/eventmodel.js";
import verifyUser from "./controllers/uservalidation.js";
import verifyAdmin from "./controllers/adminValidation.js";
import Announcement from "./models/announcenmentModel.js";
import ProjectData from "./models/projectmodel.js";
import MemberRequestModel from "./models/member_request.js";
import jwt from "jsonwebtoken";
const { sign } = jwt;
import bcryptjs from "bcryptjs";

import announcementRoutes from "./routes/announcement.js";
import memberRoutes from "./routes/member.js";
import userRoutes from "./routes/user.js";
import projectRoutes from "./routes/project.js";
import eventRoutes from "./routes/event.js";

// Configuration
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* Routes*/
app.use("/announcement", announcementRoutes);
app.use("/member", memberRoutes);
app.use("/user", userRoutes);
app.use("/project", projectRoutes);
app.use("/event", eventRoutes);

/* data imports*/

// Mongoose Setup
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started at port ${PORT}`);
    });
  })
  .catch((err) => {});

app.post("/api/register", async (req, res) => {
  const apiKey = req.headers.authorization;
  const verified = verifyAdmin(apiKey);
  if (verified) {
    try {
      const newPassword = await bcryptjs.hash(req.body.password, 10);

      const user = await User.create({
        userId: req.body.userId,
        password: newPassword,
      });
      res.status(200).json({ message: " User Registered" });
    } catch (err) {
      res.status(400).json({ error: err });
    }
  } else {
    res.status(401).json({ message: "UnAuthorised Access" });
  }
});
app.post("/api/login", async (req, res) => {
  const apiKey = req.headers.authorization;
  const verified = verifyAdmin(apiKey);
  if (verified) {
    const user = await User.findOne({
      userId: req.body.userId,
    });

    if (!user) {
      return res.json({ status: "error", error: "Invalid Login Credentials" });
    }
    const isPasswordValid = await bcryptjs.compare(
      req.body.password,
      user.password
    );

    if (isPasswordValid) {
      const token = sign(
        {
          userId: user.userId,
        },
        "secret123"
      );
      await User.findOneAndUpdate(
        { userId: user.userId },
        { $set: { fingerprint: req.body.fingerprint } }
      );
      res.status(200).json({ user: token });
    } else {
      res.status(404).json({ user: false });
    }
  } else {
    res.status(401).json({ message: "UnAuthorised Access" });
  }
});

app.get("/api/quote", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret123");
    const userId = decoded.userId;
    const user = await User.findOne({ userId: userId });
    return res.json({ status: "ok", quote: user.quote });
  } catch (error) {
    res.status(404).json({ message: "error", error: "invalid token" });
  }
});

app.post("/api/quote", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret123");
    const userId = decoded.userId;
    await User.updateOne(
      { userId: userId },
      { $set: { quote: req.body.quote } }
    );
    return res.json({ status: "0k" });
  } catch (error) {
    res.status(404).json({ message: "error", error: "invalid token" });
  }
});

// Announcement Section

app.post("/announcement/add", async (req, res) => {
  const apiKey = req.headers.authorization;
  const verified = verifyAdmin(apiKey);
  if (verified) {
    try {
      var id = new mongoose.Types.ObjectId();

      const announcement = await Announcement.create({
        _id: id,
        title: req.body.title,
        link: req.body.link,
        display: true,
      });
      res.status(200).json({ status: 200, message: "Announcement added" });
    } catch (err) {
      res.status(400).json({ status: 400, error: err });
    }
  } else {
    res.status(401).json({ message: "UnAuthorised Access" });
  }
});

app.post("/announcement/remove", async (req, res) => {
  const apiKey = req.headers.authorization;
  const verified = verifyAdmin(apiKey);
  if (verified) {
    try {
      await Announcement.deleteOne({ _id: req.body._id });
      res.status(200).json({ status: "200", message: "Announcement removed" });
    } catch (err) {
      res.status(400).json({ status: "400", error: err });
    }
  } else {
    res.status(401).json({ message: "UnAuthorised Message" });
  }
});

app.post("/api/user", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret123");
    const userId = decoded.userId;
    const user = await User.findOne({
      userId: userId,
    });
    if (user != {} || user != null) {
      return res.status(200);
    } else {
      res.status(401);
    }
  } catch (error) {
    res.status(401).json({ message: "error", error: "invalid token" });
    console.log(error);
  }
});

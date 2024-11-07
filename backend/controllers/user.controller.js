import User from "../models/user.model.js";
import * as bcrypt from "bcrypt";

export const signupUser = async (req, res) => {
  const user = req.body;

  if (!user.name || !user.password) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all required fields" });
  }

  const hashedPassword = await bcrypt.hash(user.password, 10);

  const newUser = new User({ ...user, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const signinUser = async (req, res) => {
  const user = req.body;

  if (!user.name || !user.password) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all required fields" });
  }

  try {
    const userFound = await User.findOne({ name: user.name });
    if (userFound) {
      console.log("user found: ", userFound);
    } else console.log("USER NOT FOUND");
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

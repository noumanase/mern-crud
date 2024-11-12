import User from "../models/user.model.js";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
      const passwordMatched = await bcrypt.compare(
        user.password,
        userFound.password
      );
      if (passwordMatched) {
        const token = jwt.sign(
          { id: userFound._id, name: userFound?.name },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1h" }
        );

        res.status(200).json({ success: true, data: { ...userFound, token } });
      } else {
        res
          .status(400)
          .json({ success: false, message: "Invalid credentials" });
      }
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getUserInfo = async (req, res) => {
  const user = req.body;

  try {
    const userFound = await User.findById(req.user.id);
    if (userFound) {
      res.status(200).json({ success: true, data: { ...userFound._doc } });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

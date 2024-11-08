import express from "express";
import verifyJwt from "../middleware/verifyJwt.js";
import {
  signupUser,
  signinUser,
  getUserInfo,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/signin", signinUser);
router.get("/profile/me", verifyJwt, getUserInfo);

export default router;

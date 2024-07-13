import express from "express";
import {
  userLogin,
  userLogout,
  userSignup,
} from "../Controllers/userController.js";
const router = express.Router();

router.post("/signup", userSignup);
router.post("/login", userLogin);
router.delete("/logout", userLogout);

export default router;

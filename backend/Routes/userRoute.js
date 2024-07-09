import express from "express";
import { userLogin, userSignup } from "../Controllers/userController.js";
const router = express.Router();

router.post("/signup", userSignup);
router.post("/login", userLogin);
router.post("/logout", userLogin);

export default router;

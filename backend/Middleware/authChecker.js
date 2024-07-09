import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";

const authChecker = async (req, res, next) => {
  try {
    const token = req.cookie.jwt;
    if (!token)
      return res
        .status(401)
        .json({ error: "Unauthorized - No token provided" });

    const decoded = jwt.verify(token, process.env.SECRET);
    if (!decoded) return res.status(401).json({ error: "Token expired" });

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) return res.status(404).json({ error: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    console.log("error in authChecker:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default authChecker;

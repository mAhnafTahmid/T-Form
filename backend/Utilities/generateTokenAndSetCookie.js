import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
  try {
    const token = jwt.sign({ userId }, process.env.SECRET, {
      expiresIn: "15m",
    });

    res.cookie("jwt", token, {
      maxAge: 15 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
  } catch (error) {
    console.error("Error generating token:", error);
    res.status(500).send("Error generating token");
  }
};

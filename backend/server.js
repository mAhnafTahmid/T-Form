import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRouter from "./Routes/userRoute.js";

const app = express();

dotenv.config();

const port = process.env.PORT || 3501;
const db_url = process.env.DB_URL;

app.use(express.json());
app.use(cors());

// Routes
app.use("/user", userRouter);

app.get("/*", async (req, res) => {
  res.status(200).send("T-Form Server is up and running!");
});

mongoose
  .connect(db_url)
  .then(() => {
    console.log("Connection to DB successful!");
    app.listen(port, () => {
      console.log(`T-Form started at port: ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

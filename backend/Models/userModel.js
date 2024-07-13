import mongoose from "mongoose";
import { type } from "os";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  codes: {
    type: Array,
    default: [],
  },
});

export default mongoose.model("User", userSchema);

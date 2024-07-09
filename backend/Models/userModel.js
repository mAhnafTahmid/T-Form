import mongoose from "mongoose";

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
  codes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Form",
      default: [],
    },
  ],
});

export default mongoose.model("User", userSchema);

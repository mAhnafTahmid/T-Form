import mongoose from "mongoose";

const formSchema = mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    required: true,
  },
  questions: {
    type: Array,
  },
});

export default mongoose.model("Form", formSchema);

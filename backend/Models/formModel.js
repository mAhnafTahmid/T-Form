import mongoose from "mongoose";

const formSchema = mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  questions: {
    type: Array,
  },
  answers: {
    type: Array,
    default: [],
  },
});

export default mongoose.model("Form", formSchema);

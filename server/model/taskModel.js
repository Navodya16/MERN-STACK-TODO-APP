import mongoose, { model } from "mongoose";

const taskScheme = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

export default mongoose.model("tasks", taskScheme);

import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  dimension: { type: String, required: true },
  photoURL: { type: String, required: true },
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);

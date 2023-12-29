import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    thumbnail: {
      type: String,
      required: false,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Blog ||
  mongoose.model("Blog", blogSchema, "blogs");

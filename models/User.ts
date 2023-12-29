
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true,
  },

  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  profilePicUrl: {
    type: String,
    default: "",
  },

  bio: {
    type: String,
    default: "",
  },

  blogs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
},
{timestamps: true});

export default mongoose.models.User ||
mongoose.model("User", userSchema, "users");

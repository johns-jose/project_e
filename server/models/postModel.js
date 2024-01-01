const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userid: {
      type: String,
      ref: "User",
    },
    description: {
      type: String,
    },
    images: {
      type: Array,
    },
    video: {
      type: String,
    },
    likes: {
      type: [],
    },
    comments: {
      type: [],
    },
    report: {
      type: [],
    },
    reportStatus: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;

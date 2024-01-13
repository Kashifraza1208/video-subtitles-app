const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  video: {
    public_id: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: false,
    },
  },
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;

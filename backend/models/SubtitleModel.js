const mongoose = require("mongoose");

const subtitleSchema = new mongoose.Schema({
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video", // Assuming you have a Video model
    required: true,
  },
  subtitles: [
    {
      timestamps: {
        start: {
          type: String, // You might want to use a more appropriate type depending on your timestamp format
          required: true,
        },
        end: {
          type: String,
          required: true,
        },
      },
      subtitleText: {
        type: String,
        required: true,
      },
    },
  ],
  file: {
    public_id: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: false,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Subtitle = mongoose.model("Subtitle", subtitleSchema);

module.exports = Subtitle;

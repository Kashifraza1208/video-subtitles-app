const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Video = require("../models/VideoModel");
const cloudinary = require("cloudinary");

exports.uploadVideo = catchAsyncErrors(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.video, {
    resource_type: "video",
    folder: "videos",
    width: 150,
    crop: "scale",
  });

  const video = await Video.create({
    video: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  res
    .status(200)
    .json({ success: true, message: "Video uploaded successfully", video });
});

const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/errorhandleer");
const fs = require("fs");

const Subtitle = require("../models/SubtitleModel");

const createSubtitlesFile = (subtitles, filename) => {
  let subtitlesContent = "";
  subtitles?.forEach((subtitle, index) => {
    const startTime = "00:00:00:000";
    const endTime = "00:00:00:000";
    const subtitleText = "dsfsadfasdf";

    subtitlesContent += `${
      index + 1
    }\n${startTime} --> ${endTime}\n${subtitleText}\n\n`;
  });

  fs.writeFile(filename, subtitlesContent, (err) => {
    if (err) throw err;
    console.log(`Subtitle file "${subtitlesContent}" created successfully.`);
  });

  return subtitlesContent;
};

exports.createSubtitles = catchAsyncErrors(async (req, res, next) => {
  const { subtitles, videoId } = req.body;
  const filename = "subtitles.srt";
  const subtitlesContent = createSubtitlesFile(subtitles, filename);

  // Upload subtitles file to Cloudinary
  const myCloud = await cloudinary.v2.uploader.upload(filename, {
    resource_type: "auto",
    folder: "files",
    width: 150,
    crop: "scale",
    format: "srt",
    overwrite: true,
  });

  const file = await Subtitle.create({
    videoId,
    subtitles,
    file: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    message: "Subtitle Added Successfully",
    file,
  });
});

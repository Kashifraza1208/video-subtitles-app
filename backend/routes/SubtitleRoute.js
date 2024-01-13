const express = require("express");
const {
  createSubtitles,
  getSubtitles,
} = require("../controllers/SubtitleController");
const router = express.Router();

router.route("/subtitles").post(createSubtitles);


module.exports = router;

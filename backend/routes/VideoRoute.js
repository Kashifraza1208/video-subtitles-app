const { uploadVideo } = require("../controllers/VideoController");
const express = require("express");
const router = express.Router();

router.route("/uploadVideo").post(uploadVideo);

module.exports = router;

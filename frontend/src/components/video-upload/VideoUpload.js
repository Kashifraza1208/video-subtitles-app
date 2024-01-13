import React, { Fragment, useEffect, useState } from "react";
import "./VideoUpload.css";
import { useDispatch } from "react-redux";
import { videoUpload } from "../../actions/videoAction";
import { useNavigate } from "react-router-dom";

const VideoUpload = ({ videos }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (videos.isSuccessful) {
      navigate("/add-subtitle");
    }
  }, [videos.isSuccessful, navigate]);

  const [video, setVideo] = useState("");
  const [videoPreview, setVideoPreview] = useState("");

  const uploadSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("video", video);
    dispatch(videoUpload(myForm));
  };

  const videoDataChange = (e) => {
    if (e.target.name === "video") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setVideoPreview(reader.result);
          setVideo(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <Fragment>
      <div className="video-upload">
        <h1 className="video-heading">Welcome to Video Subtitle App!</h1>
        <h4 className="video-heading">Instruction</h4>
        <ol className="instruction">
          <li>Upload your video and click on Upload.</li>
          <li>Add custome subtitle with spacific timestamps</li>
          <li>
            Enjoy a seamless viewing experience with perfectly timed subtitles.
          </li>
        </ol>

        <h1 className="video-heading1">Step-1</h1>

        <h2 className="video-heading1">Please Upload Video below</h2>
        {videoPreview && (
          <div className="video-heading">
            <video width="600" height="300" controls>
              <source src={videoPreview} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
        <form
          className="video-heading1"
          encType="multipart/form-data"
          onSubmit={uploadSubmit}
        >
          <div className="video-input">
            <p>The file size must be less than 1MB.</p>
            <input
              type="file"
              name="video"
              accept="video/*"
              autoComplete="off"
              onChange={videoDataChange}
            />
          </div>

          <div className="upload">
            <input
              type="submit"
              value={videos.loading ? "Uploading Please wait..." : "Upload"}
              className="uploadBtn"
              disabled={videos.loading}
            />
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default VideoUpload;

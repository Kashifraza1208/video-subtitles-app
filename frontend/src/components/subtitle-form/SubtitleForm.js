// SubtitleForm.js
import React, { Fragment, useEffect, useState } from "react";
import "./SubtitleForm.css";
import { useDispatch, useSelector } from "react-redux";
import { createSubtitle } from "../../actions/videoAction";
import { useNavigate } from "react-router-dom";

import ReactPlayer from "react-player";

const SubtitleForm = ({ subtitleData }) => {
  const [startTimestamp, setStartTimestamp] = useState("");
  const [endTimestamp, setEndTimestamp] = useState("");
  const [subtitleText, setSubtitleText] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.videos);

  useEffect(() => {
    if (subtitleData.isSuccessful) {
      navigate("/video-play");
    }
  }, [navigate, subtitleData.isSuccessful]);

  const subtitles = [
    {
      timestamps: {
        start: startTimestamp,
        end: endTimestamp,
      },
      subtitleText,
    },
  ];

  const handleAddSubtitle = () => {
    dispatch(createSubtitle(subtitles, videos?.videos?.video?._id));

    if (startTimestamp && endTimestamp && subtitleText) {
      setStartTimestamp("");
      setEndTimestamp("");
      setSubtitleText("");
    } else {
      alert("Please enter both timestamp and subtitle text");
    }
  };

  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ReactPlayer
          url={videos?.videos?.video?.video?.url}
          controls
          width="400px"
          height="200px"
        />
      </div>
      <div className="subtitle-form">
        <h2 className="title-heading">Add Subtitles Below</h2>
        <h2 className="title-heading">Step-2</h2>

        <textarea
          placeholder="Subtitle Text"
          value={subtitleText}
          onChange={(e) => setSubtitleText(e.target.value)}
          className="subtitle-text1"
        ></textarea>

        <div>
          <p>
            <strong>hh</strong>: Represents hours.
          </p>
          <p>
            <strong>mm</strong>: Represents minutes.
          </p>
          <p>
            <strong>ss</strong>: Represents seconds.
          </p>
          <p>
            <strong>sss</strong>: Represents milliseconds.
          </p>
        </div>

        <div className="inputField">
          <input
            type="text"
            placeholder="Timestamp (e.g., 00:01:30.000)"
            value={startTimestamp}
            onChange={(e) => setStartTimestamp(e.target.value)}
            className="subtitle-text"
          />
          <input
            type="text"
            placeholder="Timestamp (e.g., 00:01:30.000)"
            value={endTimestamp}
            onChange={(e) => setEndTimestamp(e.target.value)}
            className="subtitle-text"
          />
        </div>
        <button
          className="subtitle-button"
          onClick={handleAddSubtitle}
          disabled={subtitleData.loading}
        >
          {subtitleData.loading ? "Adding..." : " Add Subtitle"}
        </button>
      </div>
    </Fragment>
  );
};

export default SubtitleForm;

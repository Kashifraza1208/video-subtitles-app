// App.js
import React, { useEffect } from "react";
import VideoUpload from "./components/video-upload/VideoUpload";
import VideoPlayer from "./components/video-player/VideoPlayer";
import "./index.css";
import { useSelector } from "react-redux";
import SubtitleForm from "./components/subtitle-form/SubtitleForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const convertToSubtitlesData = (startTimestamp, endTimestamp, subtitleText) => {
  const formattedSubtitle = `WEBVTT\n\n${startTimestamp} --> ${endTimestamp}\n${subtitleText}\n\n`;
  return formattedSubtitle;
};

const App = () => {
  const videos = useSelector((state) => state.videos);

  useEffect(() => {
    if (videos.isSuccessful) {
      toast.success(videos.videos.message);
    }
  }, [videos.isSuccessful]);

  const subtitleData = useSelector((state) => state.subtitleData);
  useEffect(() => {
    if (subtitleData.isSuccessful) {
      toast.success(subtitleData.subtitleData.message);
    }
  }, [subtitleData.isSuccessful]);

  let subtitleText = "",
    startTime = "",
    endTime = "";

  if (subtitleData) {
    subtitleData?.subtitleData?.file?.subtitles?.map((item) => {
      subtitleText = item.subtitleText;
      startTime = item.timestamps.start;
      endTime = item.timestamps.end;
    });
  }

  const subtitles = [convertToSubtitlesData(startTime, endTime, subtitleText)];

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route path="/" element={<VideoUpload videos={videos} />} />
        <Route
          path="/add-subtitle"
          element={<SubtitleForm subtitleData={subtitleData} />}
        />
        <Route
          path="/video-play"
          element={
            <VideoPlayer
              videoUrl={videos?.videos?.video?.video?.url}
              subtitles={subtitles}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

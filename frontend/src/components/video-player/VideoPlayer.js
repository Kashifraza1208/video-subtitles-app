import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ videoUrl, subtitles }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <ReactPlayer
        url={videoUrl}
        controls
        width="800px"
        height="auto"
        config={{
          file: {
            tracks: subtitles.map((subtitle, index) => ({
              kind: "subtitles",
              src: `data:text/vtt;base64,${btoa(subtitle)}`,
              srcLang: "en",
              default: index === 0,
            })),
          },
        }}
      />
    </div>
  );
};

export default VideoPlayer;

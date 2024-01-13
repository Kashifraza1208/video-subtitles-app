import {
  CLEAR_ERRORS,
  UPLOAD_VIDEO_REQUEST,
  UPLOAD_VIDEO_SUCCESS,
  UPLOAD_VIDEO_FAIL,
  CREATE_SUBTITLE_REQUEST,
  CREATE_SUBTITLE_SUCCESS,
  CREATE_SUBTITLE_FAIL,
  FETCH_SUBTITLE_REQUEST,
  FETCH_SUBTITLE_SUCCESS,
  FETCH_SUBTITLE_FAIL,
} from "../constants/videoConstants";
import axios from "axios";

// Register
export const videoUpload = (videoData) => async (dispatch) => {
  try {
    dispatch({ type: UPLOAD_VIDEO_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(`/api/v1/uploadVideo`, videoData, config);

    console.log(data);

    dispatch({ type: UPLOAD_VIDEO_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPLOAD_VIDEO_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const createSubtitle = (subtitles, videoId) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_SUBTITLE_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/subtitles`,
      { subtitles, videoId },
      config
    );

    console.log(data);

    dispatch({ type: CREATE_SUBTITLE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_SUBTITLE_FAIL,
      payload: error.response.data.message,
    });
    console.log(error.message);
    console.log("Error response:", error.response);
  }
};

// export const getSubtitleData = () => async (dispatch) => {
//   try {
//     dispatch({ type: FETCH_SUBTITLE_REQUEST });

//     const config = { headers: { "Content-Type": "application/json" } };

//     const { data } = await axios.get(`/api/v1/subtitles`, config);

//     console.log(data);

//     dispatch({ type: FETCH_SUBTITLE_SUCCESS, payload: data.getSubtitles });
//   } catch (error) {
//     dispatch({
//       type: FETCH_SUBTITLE_FAIL,
//       payload: error.response.data.message,
//     });
//     console.log(error.message);
//     console.log("Error response:", error.response);
//   }
// };

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

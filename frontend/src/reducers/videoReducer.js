import {
  CLEAR_ERRORS,
  UPLOAD_VIDEO_REQUEST,
  UPLOAD_VIDEO_SUCCESS,
  UPLOAD_VIDEO_FAIL,
  CREATE_SUBTITLE_REQUEST,
  CREATE_SUBTITLE_SUCCESS,
  CREATE_SUBTITLE_FAIL,
} from "../constants/videoConstants";

export const videoReducer = (state = { videos: {} }, action) => {
  switch (action.type) {
    case UPLOAD_VIDEO_REQUEST:
      return {
        loading: true,
        isSuccessful: false,
      };

    case UPLOAD_VIDEO_SUCCESS:
      return {
        ...state,
        loading: false,
        videos: action.payload,
        isSuccessful: true,
      };

    case UPLOAD_VIDEO_FAIL:
      return {
        ...state,
        loading: false,
        videos: null,
        isSuccessful: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const subtitleReducer = (state = { subtitleData: [] }, action) => {
  switch (action.type) {
    case CREATE_SUBTITLE_REQUEST:
      return {
        loading: true,
        isSuccessful: false,
      };

    case CREATE_SUBTITLE_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccessful: true,
        subtitleData: action.payload,
      };

    case CREATE_SUBTITLE_FAIL:
      return {
        ...state,
        loading: false,
        subtitleData: null,
        error: action.payload,
        isSuccessful: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// export const getSubtitleReducer = (state = { getSubtitles: [] }, action) => {
//   switch (action.type) {
//     case FETCH_SUBTITLE_REQUEST:
//       return {
//         loading: true,
//       };

//     case FETCH_SUBTITLE_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         getSubtitles: action.payload,
//       };

//     case FETCH_SUBTITLE_FAIL:
//       return {
//         ...state,
//         loading: false,
//         getSubtitles: null,
//         error: action.payload,
//       };

//     case CLEAR_ERRORS:
//       return {
//         ...state,
//         error: null,
//       };

//     default:
//       return state;
//   }
// };

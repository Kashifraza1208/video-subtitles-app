import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { subtitleReducer, videoReducer } from "./reducers/videoReducer";

const reducer = combineReducers({
  videos: videoReducer,
  subtitleData: subtitleReducer,
  
});

let initialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

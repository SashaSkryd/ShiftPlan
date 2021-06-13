import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import reducers from "./reducers/reducers";

const rootReducer = combineReducers({
  tasks: reducers.tasks,
  workers: reducers.workers,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

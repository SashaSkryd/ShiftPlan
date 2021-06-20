import { createAction } from "@reduxjs/toolkit";

const addTask = createAction("tasks/addTask");
const removeTask = createAction("tasks/removeTask");

const getWorkers = createAction("workers/getWorkers");
const editShift = createAction("workers/editShift");
const removeShift = createAction("workers/removeShift");
const editShiftTime = createAction("workers/editShiftTime");

const addBufferTask = createAction("buffer/addBufferTask");
const removeBufferTask = createAction("buffer/removeBufferTask");

const addTableBufferTask = createAction("tableBuffer/addTableBufferTask");
const removeTableBufferTask = createAction("tableBuffer/removeTableBufferTask");

const actions = {
  addTask,
  removeTask,
  getWorkers,
  editShift,
  addBufferTask,
  removeBufferTask,
  removeShift,
  addTableBufferTask,
  removeTableBufferTask,
  editShiftTime,
};

export default actions;

import { createAction } from "@reduxjs/toolkit";

const addTask = createAction("tasks/addTask");
const removeTask = createAction("tasks/removeTask");

const getWorkers = createAction("workers/getWorkers");
const editShift = createAction("workers/editShift");

const addBufferTask = createAction('buffer/addBufferTask');

const actions = { addTask, removeTask, getWorkers, editShift, addBufferTask };

export default actions;

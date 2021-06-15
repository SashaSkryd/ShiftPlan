import { createAction } from "@reduxjs/toolkit";

const addTask = createAction("tasks/addTask");
const removeTask = createAction("tasks/removeTask");

const getWorkers = createAction("workers/getWorkers");
const editShift = createAction("workers/editShift");
const removeShift = createAction("workers/removeShift");
 
const addBufferTask = createAction('buffer/addBufferTask');

const addTableBufferTask = createAction('tableBuffer/addTableBufferTask');

const actions = { addTask, removeTask, getWorkers, editShift, addBufferTask, removeShift, addTableBufferTask };

export default actions;

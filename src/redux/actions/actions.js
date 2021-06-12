import { createAction } from '@reduxjs/toolkit';

const addTask = createAction('tasks/addTask');
const removeTask = createAction('tasks/removeTask')
const actions = {addTask, removeTask}

export default actions;
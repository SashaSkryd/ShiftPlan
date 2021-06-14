import { createReducer, combineReducers } from "@reduxjs/toolkit"
import actions from "../actions/actions"
import data from "../../workers"

let init = data.getTasks(10)

const tasks = createReducer(init, {
  [actions.addTask]: (state, action) => {
    return [...state, action.payload]
  },
  [actions.removeTask]: (state, action) => {
    return state.filter((el) => el.id !== action.payload)
  },
})

const initWorkers = data.getWorkers(25)

const workers = createReducer(initWorkers, {
  [actions.getWorkers]: (state, action) => {
    return data.getWorkers(action.payload)
  },
  [actions.editShift]: (state, { payload }) => {
    // console.log(state[payload.id - 1].tasks[payload.task.id - 1]);
    if(!state[payload.id - 1].tasks[payload.task.id - 1]){
    // if(!state.filter((el,i) => i === payload.id - 1 )[0].tasks.filter(el=>el.id === payload.task.id).length>0 ){
      let workers = state.filter((el,i)=>i !== payload.id - 1)
    let worker = state.filter((el,i) => i === payload.id - 1 )[0]
    let tasks = worker.tasks ? [...worker.tasks, payload.task] : [payload.task]
    
    return [...workers, {...worker, tasks: tasks}]
    }
  },
})

const initBuffer = {}

const buffer = createReducer(initBuffer, {
  [actions.addBufferTask]: (state, { payload }) => {
    return { ...payload }
  },
})

export default { tasks, workers, buffer }

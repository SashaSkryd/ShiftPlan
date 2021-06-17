import React, { Component } from "react"
import { connect } from "react-redux"
import styles from "./taskTable.module.scss"
import actions from "../../redux/actions/actions"
// import { Resizable } from 'react-resizable';
import "./taskTable.scss"

class TaskTable extends Component {
  mouseDown = (e, c, time) => {
    console.dir(e.target);
    // console.log(time);
    let startX = e.clientX
    const mouseUp = () => {
      document.getElementById(`${c}`).onmousemove = null
      document.getElementById(`${c}`).onmouseup = null
    }

    const mouseMove = (e) => {
      // console.log(document.getElementById(`${c}`));
      let width =0; 
      if(startX < e.clientX){
        width = e.clientX - startX
        document.getElementById(`${c}`).outerHTML = `<div id="0" style="width: ${width + parseInt(time, 10)}px; margin-left: 48px;"><div class="taskTable_leftSide__2J-5G"></div><div class="taskTable_rightSide__yq-s0"></div></div>`
      }else if (startX > e.clientX){
        width = startX - e.clientX
        document.getElementById(`${c}`).outerHTML = `<div id="0" style="width: ${width + parseInt(time, 10)}px; margin-left: 48px;"><div class="taskTable_leftSide__2J-5G"></div><div class="taskTable_rightSide__yq-s0"></div></div>`
      }

    }

    document.getElementById(`${c}`).onmousemove = mouseMove
    document.getElementById(`${c}`).onmouseup = mouseUp
  }

  render() {
    const numbers = new Array(48)
    for (let i = 0; i < numbers.length; i++) {
      numbers[i] = 1
    }
    let workers = [...this.props.workers]

    return (
      <table className={styles.taskTable}>
        <thead>
          <tr>
            <td className={styles.number}>№</td>
            <td className={styles.name}>Name</td>
            <td className={styles.shift}>Shift</td>
          </tr>
        </thead>
        <tbody>
          {workers.map((workerEl, c) => {
            let sum = parseInt(workerEl.shift.end, 10) - parseInt(workerEl.shift.start, 10)
            let time = "48px"
            time = `${parseInt(time, 10) * sum}px`

            // time = `${time + this.state.width}px`
            // `${parseInt(time, 10) * sum}px`
            // console.log(parseInt(time, 10) * sum)
            let startTime = `${parseInt(workerEl.shift.start, 10) * 48}px`

            return (
              <tr key={workerEl.number}>
                <td className={styles.number}>{workerEl.number}</td>
                <td className={styles.name}>{workerEl.name}</td>
                <td className={styles.shift}>{`${workerEl.shift.start} - ${workerEl.shift.end} (${sum}h.)`}</td>
                {numbers.map((el, z) => {
                  if (z === 0) {
                    return (
                      <td key={z} className="shiftCell firstCell">
                        <div
                          id={c}
                          style={{
                            width: time,
                            marginLeft: startTime,
                          }}
                          onDragOver={(e) => {
                            e.preventDefault()
                          }}
                          onDrop={(e, task) => {
                            e.preventDefault()
                            if (this.props.buffer) {
                              this.props.editShift({ task: this.props.buffer, id: c + 1 })
                              this.props.removeTask({ task: this.props.buffer, id: c + 1 })
                              this.props.removeBufferTask()
                            } else if (this.props.tableBufferTask) {
                              this.props.editShift({ task: this.props.tableBufferTask, id: c + 1 })
                              this.props.removeShift({
                                task: this.props.tableBufferTask,
                                id: this.props.tableBufferTask.workerId,
                              })
                              this.props.removeTableBufferTask()
                            }
                          }}
                        >
                          <div
                            className={styles.leftSide}
                            onMouseDown={(e) => {
                              this.mouseDown(e, c)
                            }}
                          ></div>
                          {workers[c].tasks.map((el, i) => (
                            <div
                              key={i}
                              className={styles.workerTask}
                              draggable={true}
                              onDragStart={(e) => {
                                this.props.addTableBufferTask({ ...el, workerId: c + 1 })
                              }}
                            >
                              {el.name}
                            </div>
                          ))}
                          <div
                            className={styles.rightSide}
                            onMouseDown={(e) => {
                              this.mouseDown(e, c, time)
                            }}
                          ></div>
                        </div>
                      </td>
                    )
                  } else {
                    return <td key={z} className={styles.shiftCell}></td>
                  }
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}
const mapDispatchToProps = {
  addBufferTask: actions.addBufferTask,
  editShift: actions.editShift,
  removeShift: actions.removeShift,
  removeTask: actions.removeTask,
  addTableBufferTask: actions.addTableBufferTask,
  removeTableBufferTask: actions.removeTableBufferTask,
  removeBufferTask: actions.removeBufferTask,
}

const mapStateToProps = (state) => ({ workers: state.workers, buffer: state.buffer, tableBufferTask: state.tableBuffer })

export default connect(mapStateToProps, mapDispatchToProps)(TaskTable)

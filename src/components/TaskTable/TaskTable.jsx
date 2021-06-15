import React, { Component } from "react"
import { connect } from "react-redux"
import styles from "./taskTable.module.scss"
import actions from "../../redux/actions/actions"
import "./taskTable.scss"

class TaskTable extends Component {
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
          {workers.map((workerEl, c) => (
            <tr key={workerEl.number}>
              <td className={styles.number}>{workerEl.number}</td>
              <td className={styles.name}>{workerEl.name}</td>
              <td className={styles.shift}>{`${workerEl.shift.start} - ${workerEl.shift.end}`}</td>
              {numbers.map((el, z) => {
                if (z === 0) {
                  return (
                    <td key={z} className="shiftCell firstCell">
                      <div
                      
                        onDragOver={(e) => {
                          e.preventDefault()
                          // this.props.editShift({ task: this.props.buffer, id: i + 1 })
                        }}
                        onDrop={(e, task) => {
                          e.preventDefault()
                          this.props.editShift({ task: this.props.buffer, id: c + 1 })
                          this.props.removeTask({ task: this.props.buffer, id: c + 1 })
                          if(this.props.tableBufferTask){
                            console.log('object');
                            this.props.removeShift({ task: this.props.tableBufferTask, id: this.props.tableBufferTask.workerId})
                          }

                        }}
                      >
                        {workers[c].tasks.map((el,i) => (
                          <div key = {i}
                            className={styles.workerTask}
                            draggable={true}
                            onDragStart={(e) => {
                              // console.log(el);
                              this.props.addTableBufferTask({...el, workerId: c + 1})
                              // this.props.removeShift({ task: el, id: c +1 })
                            }}
                            // onDragLeave={(e) => {
                            //   e.preventDefault()
                            //   this.props.removeShift({ task: this.props.buffer, id: c + 1 })
                            // }}
                          >
                            {el.name}
                          </div>
                        ))}
                      </div>
                    </td>
                  )
                } else {
                  return <td key={z} className={styles.shiftCell}></td>
                }
              })}
            </tr>
          ))}
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
}

const mapStateToProps = (state) => ({ workers: state.workers, buffer: state.buffer, tableBuffer: state.tableBuffer, })

export default connect(mapStateToProps, mapDispatchToProps)(TaskTable)

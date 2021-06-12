import React, { Component } from "react"
import styles from "./taskTable.module.scss"
import data from "../../workers"

class TaskTable extends Component {
  state = {
    workers: data.getWorkers(10),
  }

  // getLines() {
  //   let numbers = [, , ,]
  //   console.log(numbers)
  //   return numbers.map((el, i) => console.log(1))
  // }

  render() {
    const numbers = new Array(48)
    for(let i = 0; i<numbers.length;i++){
      numbers[i] = 1
    }
    // console.log(numbers)
    // console.log(this.state.workers)
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
          {this.state.workers.map((el) => (
            <tr key={el.number}>
              <td className={styles.number}>{el.number}</td>
              <td className={styles.name}>{el.name}</td>
              <td className={styles.shift}>{el.shift.getFormat()}</td>
              {/* <td className={styles.shiftRow}>shift</td> */}
              {/* {this.getLines()} */}
              {/* {this.getLines()} */}
              {numbers.map((el, i) => {
                // console.log(1)
               return <td key={i} className={styles.shiftCell}></td>
              })}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default TaskTable

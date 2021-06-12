import React, { Component } from "react";
import styles from "./taskTable.module.scss";
import data from "../../workers";

class TaskTable extends Component {
  state = {
    workers: data.getWorkers(10),
  };

  render() {
    console.log(this.state.workers);
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
              <td className={styles.shiftRow}>shift</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default TaskTable;

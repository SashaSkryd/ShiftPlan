import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./taskTable.module.scss";
import "./taskTable.scss";

class TaskTable extends Component {
  render() {
    const numbers = new Array(48);
    for (let i = 0; i < numbers.length; i++) {
      numbers[i] = 1;
    }
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
          {this.props.workers.map((el) => (
            <tr key={el.number}>
              <td className={styles.number}>{el.number}</td>
              <td className={styles.name}>{el.name}</td>
              <td className={styles.shift}>{el.shift.getFormat()}</td>
              {numbers.map((el, i) => {
                if (i === 0) {
                  return (
                    <td key={i} className="shiftCell firstCell">
                      <div></div>
                    </td>
                  );
                } else {
                  return <td key={i} className={styles.shiftCell}></td>;
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

const mapStateToProps = (state) => ({ workers: state.workers });

export default connect(mapStateToProps, null)(TaskTable);

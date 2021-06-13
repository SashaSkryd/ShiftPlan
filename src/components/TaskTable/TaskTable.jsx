import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./taskTable.module.scss";
import actions from "../../redux/actions/actions"
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
                      <div data={i}
                      // onDragStart={(e)=>{console.dir(e.target);}}
                      onDragLeave={(e)=>{console.dir(e.target);}}
                      // onDragEnd={(e)=>{console.dir(e.target);}}
                      onDragOver={(e)=>{this.props.editShift(this.props.buffer) }}
                      // onDrop={(e, task)=>{console.log(task);}}
                      ></div>
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
const mapDispatchToProps = {
  editShift: actions.editShift,
  
};

const mapStateToProps = (state) => ({ workers: state.workers, buffer: state.buffer });

export default connect(mapStateToProps, mapDispatchToProps)(TaskTable);

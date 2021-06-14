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
          {this.props.workers.map((el,i) => (
            <tr key={el.number} >
              <td className={styles.number}>{el.number}</td>
              <td className={styles.name}>{el.name}</td>
              <td className={styles.shift}>{el.shift.format}</td>
              {numbers.map((el, z) => {
                if (z === 0) {
                  return (
                    <td key={z} className="shiftCell firstCell">
                      <div
                      // onDragStart={(e)=>{console.dir(e.target);}}
                      // onDragLeave={(e)=>{this.props.editShift({task: this.props.buffer, id: i+1})}}
                      // onDragEnd={(e)=>{console.dir(e.target);}}
                      onDragOver={(e)=>{this.props.editShift({task: this.props.buffer, id: i+1})}}
                      // onDrop={(e, task)=>{console.log(task);}}
                      // this.props.editShift() {task: this.props.buffer, id: }
                      ></div>
                    </td>
                  );
                } 
                else {
                  return <td key={z} className={styles.shiftCell}></td>;
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

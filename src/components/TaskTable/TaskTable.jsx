import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../redux/actions/actions";
import styles from "./taskTable.module.scss";
import "./taskTable.scss";

class TaskTable extends Component {
  mouseDown = (e, c) => {
    let startX = e.clientX;
    const mouseUp = () => {
      window.onmousemove = null;
      window.onmouseup = null;
    };

    let elementSide = e.target.id;

    let prevWidth = parseInt(document.getElementById(`${c}`).style.width, 10);
    let prevMargin = parseInt(
      document.getElementById(`${c}`).style.marginLeft,
      10,
    );
    const mouseMove = (e) => {
      let width = 0;
      let marginLeft = 0;

      if (elementSide === `${c + 100}leftSide`) {
        // Левый ползунок
        if (startX < e.clientX) {
          // В правую сторону
          if (parseInt(document.getElementById(`${c}`).style.width, 10) > 48) {
            marginLeft = prevMargin + (e.clientX - startX); // Увеличиваем маржин на разницу координат
            document.getElementById(
              `${c}`,
            ).style.marginLeft = `${marginLeft}px`;

            width = prevWidth - (e.clientX - startX); // Уменьшаем ширину на разницу координат
            document.getElementById(`${c}`).style.width = `${width}px`;
          }
        } else {
          // В левую сторону
          if (
            parseInt(document.getElementById(`${c}`).style.marginLeft, 10) > 0
          ) {
            marginLeft = prevMargin - (startX - e.clientX);
            document.getElementById(
              `${c}`,
            ).style.marginLeft = `${marginLeft}px`;

            width = prevWidth + (startX - e.clientX);
            document.getElementById(`${c}`).style.width = `${width}px`;
          }
        }
        // const currentMargin = parseInt(
        //   document.getElementById(`${c}`).style.marginLeft,
        //   10,
        // );
        // const currentWidth = parseInt(
        //   document.getElementById(`${c}`).style.width,
        //   10,
        // );
        // console.log(`${Math.round((currentMargin/48) * 60)} минут`);
        // console.log(`${(currentMargin/48)} hours, ${} minutes`)
      } else if (elementSide === `${c + 100}rightSide`) {
        // Правый ползунок
        if (startX < e.clientX) {
          // В правую сторону
          width = prevWidth + (e.clientX - startX);
          document.getElementById(`${c}`).style.width = `${width}px`;
        } else {
          // В левую сторону
          width = prevWidth - (startX - e.clientX);
          document.getElementById(`${c}`).style.width = `${width}px`;
        }
      }
    };

    window.onmousemove = mouseMove;
    window.onmouseup = mouseUp;
  };

  render() {
    const numbers = new Array(48);
    for (let i = 0; i < numbers.length; i++) {
      numbers[i] = 1;
    }
    let workers = [...this.props.workers];

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
            let sum =
              parseInt(workerEl.shift.end, 10) -
              parseInt(workerEl.shift.start, 10);
            let time = "48px";
            time = `${parseInt(time, 10) * sum}px`;
            let startTime = `${parseInt(workerEl.shift.start, 10) * 48}px`;

            return (
              <tr key={workerEl.number}>
                <td className={styles.number}>{workerEl.number}</td>
                <td className={styles.name}>{workerEl.name}</td>
                <td
                  className={styles.shift}
                >{`${workerEl.shift.start} - ${workerEl.shift.end} (${sum}h.)`}</td>
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
                            e.preventDefault();
                          }}
                          onDrop={(e) => {
                            e.preventDefault();
                            if (this.props.buffer) {
                              this.props.editShift({
                                task: this.props.buffer,
                                id: c + 1,
                              });
                              this.props.removeTask({
                                task: this.props.buffer,
                                id: c + 1,
                              });
                              this.props.removeBufferTask();
                            } else if (this.props.tableBufferTask) {
                              this.props.editShift({
                                task: this.props.tableBufferTask,
                                id: c + 1,
                              });
                              this.props.removeShift({
                                task: this.props.tableBufferTask,
                                id: this.props.tableBufferTask.workerId,
                              });
                              this.props.removeTableBufferTask();
                            }
                          }}
                        >
                          <div
                            id={`${c + 100}leftSide`}
                            className={styles.leftSide}
                            onMouseDown={(e) => {
                              this.mouseDown(e, c);
                            }}
                          ></div>
                          {workers[c].tasks.map((el, i) => (
                            <div
                              key={i}
                              className={styles.workerTask}
                              draggable={true}
                              onDragStart={(e) => {
                                this.props.addTableBufferTask({
                                  ...el,
                                  workerId: c + 1,
                                });
                              }}
                            >
                              {el.name}
                            </div>
                          ))}
                          <div
                            id={`${c + 100}rightSide`}
                            className={styles.rightSide}
                            onMouseDown={(e) => {
                              this.mouseDown(e, c, time);
                            }}
                          ></div>
                        </div>
                      </td>
                    );
                  } else {
                    return <td key={z} className={styles.shiftCell}></td>;
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
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
};

const mapStateToProps = (state) => ({
  workers: state.workers,
  buffer: state.buffer,
  tableBufferTask: state.tableBuffer,
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskTable);

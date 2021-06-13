import React, { Component } from "react";
import "./taskBuffer.scss";
import actions from "../../redux/actions/actions";
import { connect } from "react-redux";

const taskPosition = {
  zIndex: -1,
  position: "absolute",
  left: "0px",
  top: 0,
};

class TaskBuffer extends Component {
  state = {
    status: false,
    bufferOpen: false,
  };

  taskLeft = 0;
  taskTop = 10;

  clickHandler = () => {
    this.setState({ status: !this.state.status });
    setTimeout(() => {
      this.setState({ bufferOpen: !this.state.bufferOpen });
    }, 250);
  };

  // downHandler = (e, taskLeft, taskTop) => {
  //   console.log(e.target.style.top, e.target.offsetTop);

  //   var pos1 = 0,
  //     pos2 = 0,
  //     pos3 = 0,
  //     pos4 = 0;

  //   if (document.getElementById(e.target.id)) {
  //     // если присутствует, заголовок - это место, откуда вы перемещаете DIV:
  //     document.getElementById(e.target.id).onmousedown = dragMouseDown;
  //   } else {
  //     // в противном случае переместите DIV из любого места внутри DIV:
  //     e.target.onmousedown = dragMouseDown;
  //   }

  //   function closeDragElement() {
  //     // остановка перемещения при отпускании кнопки мыши:
  //     window.onmouseup = null;
  //     window.onmousemove = null;
  //   }

  //   function elementDrag(e, taskLeft, taskTop) {
  //     // вызов функции при каждом перемещении курсора:
  //     // вычислить новую позицию курсора:
  //     pos1 = pos3 - e.clientX;
  //     pos2 = pos4 - e.clientY;
  //     pos3 = e.clientX;
  //     pos4 = e.clientY;
  //     // установите новое положение элемента:
  //     e.target.style.top = e.target.offsetTop - pos2 + "px";
  //     e.target.style.left = e.target.offsetLeft - pos1 + "px";
  //   }

  //   function dragMouseDown(e) {
  //     // получить положение курсора мыши при запуске:
  //     pos3 = e.clientX;
  //     pos4 = e.clientY;
  //     document.onmouseup = closeDragElement;
  //     // вызов функции при каждом перемещении курсора:
  //     document.onmousemove = elementDrag;
  //   }
  // };

  addTask = () => {
    this.props.addTask({
      id: 1,
      name: "Petro Pupkin",
    });
  };

  removeTask = () => {
    this.props.removeTask(1);
  };

  render() {
    return (
      <div
        className={this.state.status ? "task-position open" : "task-position"}
      >
        <div className={`clear-field ${this.state.status ? "open" : ""}`}>
          <span onClick={this.clickHandler}>Task buffer</span>
          <button type="button" className="task-button" onClick={this.addTask}>
            Add
          </button>
          <button
            type="button"
            className="task-button"
            onClick={this.removeTask}
          >
            Remove
          </button>
        </div>
        <div className={`task-box ${this.state.status ? "open" : ""}`}>
          <div className={`${this.state.bufferOpen ? "moved" : ""}`}></div>
          <ul>
            {this.props.tasks.map((el) => {
              this.taskLeft += 94;
              return (
                <li
                  id="movement"
                  draggable={true}
                  key={el.id}
                  style={
                    (taskPosition,
                    { left: `${this.taskLeft}px`, top: `${this.taskTop}px` })
                  }
                  // onMouseDown={(e, taskLeft, taskTop) => {
                  //   this.downHandler(e, taskLeft, taskTop);
                  // }}
                >
                  {el.name}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  addTask: actions.addTask,
  removeTask: actions.removeTask,
};

const mapStateToProps = (state) => ({ tasks: state.tasks });

export default connect(mapStateToProps, mapDispatchToProps)(TaskBuffer);

//"<li style=\"left: 26414px;\">Task name 1</li>"

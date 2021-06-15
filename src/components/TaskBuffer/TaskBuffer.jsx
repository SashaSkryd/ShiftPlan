import React, { Component } from "react";
import "./taskBuffer.scss";
import actions from "../../redux/actions/actions";
import { connect } from "react-redux";

// const taskPosition = {
//   zIndex: -1,
//   position: "absolute",
//   left: "0px",
//   top: 0,
// };

class TaskBuffer extends Component {
  state = {
    status: false,
    bufferOpen: false,
    height: 0,
  };

  a = () => {
    this.setState({ height: window.scrollY })
    if (this.state.height >= 48) {
      window.removeEventListener("scroll", this.a)
      this.clickHandler()
    }
  
  }
  componentDidMount() {
    window.addEventListener("scroll", this.a)
  }

  taskLeft = 0;
  taskTop = 10;

  clickHandler = () => {
    this.setState({ status: !this.state.status });
    setTimeout(() => {
      this.setState({ bufferOpen: !this.state.bufferOpen });
    }, 250);
  };



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
          <span >Task buffer</span>
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
              // this.taskLeft += 94;
              return (
                <li
                  id="movement"
                  onDragStart={(e)=>{ 
                    this.props.addBufferTask({...el})
                    // console.log();
                  }}
                  // onDragLeave={(e)=>{console.dir(e.target);}}
                  onDragEnd={(e)=>{console.dir(e.target);}}
                  // onDragOver={(e)=>{console.dir(e.target);}}
                  // onDrop={(e)=>{console.dir(e.target);}}
                  draggable={true}
                  key={el.id}
                  // style={
                  //   (taskPosition,
                  //   { left: `${this.taskLeft}px`, top: `${this.taskTop}px` })
                  // }
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
  addBufferTask: actions.addBufferTask,
};

const mapStateToProps = (state) => ({ tasks: state.tasks });

export default connect(mapStateToProps, mapDispatchToProps)(TaskBuffer);

//"<li style=\"left: 26414px;\">Task name 1</li>"

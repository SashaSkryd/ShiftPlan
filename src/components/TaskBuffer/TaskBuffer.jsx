import React, { Component } from "react";
import "./taskBuffer.scss";
import actions from '../../redux/actions/actions';
import {connect} from 'react-redux';

class TaskBuffer extends Component {
  state = {
    status: false,
    bufferOpen: false,
  };

  clickHandler = () => {
    this.setState({ status: !this.state.status });
    setTimeout(() => {
      this.setState({ bufferOpen: !this.state.bufferOpen})
    }, 250);
  };

  addTask = () =>{

    this.props.addTask({
      id: 1,
      name: "Petro Pupkin",
    })

  }

  removeTask = ()=>{


    this.props.removeTask(1)

  }

  render() {
    return (
      <div
        className={this.state.status ? "task-position open" : "task-position"}
      >
        <div className={`clear-field ${this.state.status ? "open" : ""}`}>
          <span onClick={this.clickHandler}>Task buffer</span>
          <button type='button' className="task-button" onClick={this.addTask}>Add</button>
          <button type='button' className="task-button" onClick={this.removeTask}>Remove</button>
        </div>
        <div className={`task-box ${this.state.status ? "open" : ""}`}>
          <div className={`${this.state.bufferOpen ? "moved" : ""}`}></div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  addTask: actions.addTask,
  removeTask: actions.removeTask,
}

const mapStateToProps = (state) => ({tasks: state.tasks});

export default connect(mapStateToProps, mapDispatchToProps)(TaskBuffer);

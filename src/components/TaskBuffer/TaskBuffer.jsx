import React, { Component } from "react";
import "./taskBuffer.scss";

class Graph extends Component {
  state = {
    status: false,
  };

  clickHandler = () => {
    this.setState({ status: !this.state.status });
  };

  render() {
    return (
      <div
        className={this.state.status ? "task-position open" : "task-position"}
      >
        <div className={`clear-field ${this.state.status ? "open" : ""}`}>
          <span onClick={this.clickHandler}>Task buffer</span>
        </div>
        <div className={`task-box ${this.state.status ? "open" : ""}`}>
          <div></div>
        </div>
      </div>
    );
  }
}

export default Graph;

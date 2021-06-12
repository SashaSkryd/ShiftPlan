import React, { Component } from "react";
import "./Graph.scss";

class Graph extends Component {
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

  render() {
    return (
      <div
        className={this.state.status ? "task-position open" : "task-position"}
      >
        <div className={`clear-field ${this.state.status ? "open" : ""}`}>
          <span onClick={this.clickHandler}>Graph</span>
        </div>
        <div className={`task-box ${this.state.status ? "open" : ""}`}>
          <div className={`${this.state.bufferOpen ? "moved" : ""}`}></div>
        </div>
      </div>
    );
  }
}

export default Graph;

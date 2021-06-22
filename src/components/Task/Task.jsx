import React, { Component } from "react"
import styles from "./Task.module.scss"

class Task extends Component {

    state = {
        taskShow: false,
    }

    mouseEnter=()=>{
        this.setState({
            taskShow: true,
        })
    }

    mouseLeave=()=>{
        this.setState({
            taskShow: false,
        })
    }

  render() {
    return (
      <div className={styles.taskWrapper}
      onMouseEnter={this.props.task.time === 1 ? this.mouseEnter : null }
      onMouseLeave={this.props.task.time === 1 ? this.mouseLeave : null }
      style={{
          backgroundColor: this.props.task.color
      }}
      >
          {this.state.taskShow ? <span >{this.props.task.name}</span> : <span style={{display: "inline-block", width: `${this.props.task.time * 48}px`}}>{this.props.task.time === 1 ? `${this.props.task.name.split(' ')[0]}...` : this.props.task.name}</span>}
      </div>
    )
  }
}

export default Task


// this.props.task.time === 1 ? `${this.props.task.name.split(' ')[0]}...` : this.props.task.name
// display: "inline-block", minWidth: `${this.props.task.time * 48}px` 
// style={{display: "inline-block", width: `${this.props.task.time * 48}px`}}
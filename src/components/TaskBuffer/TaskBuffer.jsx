import React, { Component } from "react"
import "./taskBuffer.scss"
import actions from "../../redux/actions/actions"
import { connect } from "react-redux"
import Task from "../Task/Task"

class TaskBuffer extends Component {
  state = {
    status: false,
    bufferOpen: false,
    height: 0,
    // taskShow: false,
  }

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

  taskLeft = 0
  taskTop = 10

  clickHandler = () => {
    this.setState({ status: !this.state.status })
    setTimeout(() => {
      this.setState({ bufferOpen: !this.state.bufferOpen })
    }, 250)
  }

  addTask = () => {
    this.props.addTask({
      id: 1,
      name: "Petro Pupkin",
    })
  }

  removeTask = () => {
    this.props.removeTask(1)
  }

  // mouseEnter=(i)=>{
  //   this.setState({
  //     taskShow: true
  //   })
  // }
  // mouseLeave=(i)=>{
  //   this.setState({
  //     taskShow: false
  //   })
  // }


  render() {
    return (
      <div className={this.state.status ? "task-position open" : "task-position"}>
        <div className={`clear-field ${this.state.status ? "open" : ""}`}>
          <span>Task buffer</span>
          {/* <button type="button" className="task-button" onClick={this.addTask}>
            Add
          </button>
          <button type="button" className="task-button" onClick={this.removeTask}>
            Remove
          </button> */}
        </div>
        <div className={`task-box ${this.state.status ? "open" : ""}`}>
          <div className={`${this.state.bufferOpen ? "moved" : ""}`}></div>
          <ul 
            onDragOver = {(e)=>{
              e.preventDefault()
            }}
            onDrop = {(e)=>{
              e.preventDefault()
             if ( this.props.tableBufferTask){
              this.props.addTask({...this.props.tableBufferTask, workerId: null})
              this.props.removeShift({ task: this.props.tableBufferTask, id: this.props.tableBufferTask.workerId})
              this.props.removeTableBufferTask()
             }
            }}
          >
            {this.props.tasks.map((el) => {
              return (
                <li
                  id="movement"
                  onDragStart={(e) => {
                    this.props.addBufferTask({ ...el })
                  }}
                  draggable={true}
                  key={el.id}
                 
                >
                  <Task task={el}/>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  addTask: actions.addTask,
  removeTask: actions.removeTask,
  addBufferTask: actions.addBufferTask,
  removeTableBufferTask: actions.removeTableBufferTask,
  removeShift: actions.removeShift,
}

const mapStateToProps = (state) => ({ tasks: state.tasks , tableBufferTask: state.tableBuffer})

export default connect(mapStateToProps, mapDispatchToProps)(TaskBuffer)

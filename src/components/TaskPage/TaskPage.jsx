import React from "react";
import Ruler from "../Ruler/Ruler.jsx";
import TaskTable from "../TaskTable/TaskTable";
import Graph from "../Graph/Graph";
import TaskBuffer from "../TaskBuffer/TaskBuffer";
import "./TaskPage.scss";

export default function TaskPage() {
  return (
    <>
      <div className="ruler-container">
        <Ruler />
      </div>
      <div className="table-container">
        <TaskTable />
      </div>
      <div className="task-buffer">
        <TaskBuffer />
      </div>
      <div className="graph-container">
        <Graph />
      </div>
    </>
  );
}

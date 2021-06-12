import React from "react";
import Ruler from "../Ruler/Ruler.jsx";
import TaskTable from "../TaskTable/TaskTable";
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
    </>
  );
}

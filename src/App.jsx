import "./App.scss";
import Graph from "./components/Graph/Graph.jsx";
import TaskPage from "./components/TaskPage/TaskPage.jsx";
import "./sass/main.scss";

function App() {
  return (
    <div className="App">
      <TaskPage />
      <Graph />
    </div>
  );
}

export default App;

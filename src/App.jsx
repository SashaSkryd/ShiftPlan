import './App.scss';
import Graph from'./components/Graph/Graph.jsx'
import TaskList from'./components/TaskList/TaskList.jsx'
import './sass/main.scss'

function App() {
  return (
    <div className="container">
      <TaskList/>
      <Graph/>
    </div>
  );
}

export default App;

import './App.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Overview from './pages/Overview.jsx';
import NewTasks from './pages/NewTasks.jsx';
import AllTasks from './pages/AllTasks.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/new-tasks" element={<NewTasks />} />
        <Route path="/all-tasks" element={<AllTasks />} />
      </Routes>
    </Router>
  )
}

export default App;

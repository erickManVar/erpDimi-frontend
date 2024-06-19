import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProjectsPage from './pages/ProjectsPage';
import SchedulePage from './pages/SchedulePage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<ProjectsPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

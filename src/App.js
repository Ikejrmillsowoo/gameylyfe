
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MedicationsWeb from './components/MedicationsWeb';
import ResourcesWeb from './components/ResourcesWeb';
import Header from './components/Header';
import { useState } from 'react';
import MoodCheck from './components/MoodCheck';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [points, setPoints] = useState(0);

  return (
    <Router>
      <div className="App">
        {/* <nav>
          <Link to="/">Medications</Link>
          <Link to="/resources">Resources</Link>
        </nav> */}
        <Header points={points} darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path="/" element={<MedicationsWeb  points={points}/>} />
          <Route path="/moodCheck" element={<MoodCheck  />} />
          <Route path="/resources" element={<ResourcesWeb  />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

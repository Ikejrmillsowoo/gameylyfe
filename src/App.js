import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MedicationsWeb from "./components/MedicationsWeb";
import ResourcesWeb from "./components/ResourcesWeb";
import Header from "./components/Header";
import { useState } from "react";
import Profile from './components/Profile';
import MoodCheck from "./components/MoodCheck";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [points, setPoints] = useState(0);
  const [petMood, setPetMood] = useState("happy");
  const [petLevel, setPetLevel] = useState(1);

  return (
    <Router>
      <div className={`App ${darkMode ? "dark-mode" : ""}`}>
        {/* <nav>
          <Link to="/">Medications</Link>
          <Link to="/resources">Resources</Link>
        </nav> */}
        <Header points={points} darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route
            path="/"
            element={
              <MedicationsWeb
                points={points}
                setPoints={setPoints}
                setPetLevel={setPetLevel}
                setPetMood={setPetMood}
                petLevel={petLevel}
                petMood={petMood}
              />
            }
          />
          <Route
            path="/moodCheck"
            element={<MoodCheck points={points} setPoints={setPoints} setPetLevel={setPetLevel}
                setPetMood={setPetMood}
                petLevel={petLevel}
                petMood={petMood} />}
          />
          <Route
            path="/resources"
            element={<ResourcesWeb darkMode={darkMode} />}
          />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MedicationsWeb from './components/MedicationsWeb';
import ResourcesWeb from './components/ResourcesWeb';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Medications</Link>
          <Link to="/resources">Resources</Link>
        </nav>
        
        <Routes>
          <Route path="/" element={<MedicationsWeb />} />
          <Route path="/resources" element={<ResourcesWeb />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

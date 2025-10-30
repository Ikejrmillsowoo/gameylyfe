import React from 'react'
import Navigator from './Navigator'


export default function Header({points, setDarkMode, darkMode}) {

  return (
    <>
        <header className="web-header">
          <div className="header-content">
            <div className='logo'>
            <div className="logo-icon">
              <span>🎮</span>
              <h1>Gaming Life</h1>
            </div>
            </div>
           
            {/* <nav className="nav-menu">
              <button className="nav-item active">Medications</button>
              <button className="nav-item">Mood Check</button>
              <button className="nav-item">Resources</button>
              <button className="nav-item">Achievements</button>
            </nav> */}
            <Navigator />
            <div className="user-menu">
              <span className="points-badge">🏆 {points} pts</span>
              <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)} title={darkMode ? "Light Mode" : "Dark Mode"}>
                {darkMode ? '☀️' : '🌙'}
              </button>
              <button className="profile-btn">👤</button>
            </div>
          </div>
        </header>
    </>
  )
}

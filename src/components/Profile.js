import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {

  const [darkMode, setDarkMode] = useState(false);
  const [loggedIn, signInOut] = useState(false);
  const user = {
    name: 'John Doe',
    imageUrl: '',
    imageSize: 90,
  };
  const [streak, setStreak] = useState(7);

    return (
      <div className={`Profile ${darkMode ? 'dark-mode' : ''}`}>
        {/* <header className="page-header">
          <div className="header-content">
            <div className="logo">
              <span className="logo-icon">🎮</span>
              <h1>Gaming Life</h1>
            </div>
            <div>
              <button className="dark-mode-toggle"
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? "light-mode" : "dark-mode"}
              >
                {darkMode ? '☀️' : '🌙'}
                </button>
              <button className="login-out"
              onClick={() => signInOut(!loggedIn)}
              title={loggedIn ? "log out" : "log in"}>
                {loggedIn ? "Sign out" : "Sign in"}
              </button>
            </div>
          </div>
        </header> */}
        <hr className="buffer"></hr>
          <div className="page-content">
            <div className={`sidebar-box ${darkMode ? 'dark-mode' : ''}`}>
            <div className="sidebar">
              <p>⚙️ Settings</p>
              <button className="nav-item active">Notifications</button>
              <button className="nav-item active">Reminders</button>
              <button className="nav-item active">Pet Customization</button>
              <button className="nav-item active">Privacy & Data</button>
              <button className="nav-item active">Help & Support</button>
            </div>
            </div>
            <div className="profile-content">
              <h2 className="content-header">Profile</h2>
              <h3>{user.name}</h3>
              <img className="user-picture"
                src={user.imageUrl}
                alt={'Photo of ' + user.name}
                style={{width: user.imageSize, height: user.imageSize}}>
              </img>
              {/* <div className="stats-grid"> */}
                <div className={`stats-card ${darkMode ? 'dark-mode' : ''}`}>
                  <h3>Current Streak</h3>
                  <div className="streak-display">
                    <span className="streak-icon">🔥</span>
                    <span className="streak-text">{streak} day streak!</span>
                  </div>
                </div>
              {/* </div> */}
            </div>
            <div> <button className="login-out"
              onClick={() => signInOut(!loggedIn)}
              title={loggedIn ? "log out" : "log in"}>
                {loggedIn ? "Sign out" : "Sign in"}
              </button>
              </div>
          </div>
      </div>
    );
  }
export default Profile;
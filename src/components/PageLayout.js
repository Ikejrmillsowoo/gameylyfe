import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import './PageLayout.css';

const PageLayout = ({ 
  children, 
  darkMode, 
  setDarkMode,
  points,
  petLevel,
  petMood,
  takenCount,
  remainingCount,
  streak,
  tips
}) => {
  return (
    <div className={`page-layout ${darkMode ? 'dark-mode' : ''}`}>
      {/* <Header 
        points={points} 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
      /> */}
      <div className="page-content">
        <Sidebar 
          petLevel={petLevel}
          petMood={petMood}
          points={points}
          takenCount={takenCount}
          remainingCount={remainingCount}
          streak={streak}
          tips={tips}
        />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PageLayout;
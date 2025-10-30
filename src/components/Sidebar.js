import React from 'react';
import './Sidebar.css';

const Sidebar = ({ 
  petLevel, 
  petMood, 
  points, 
  takenCount, 
  remainingCount, 
  streak,
  tips 
}) => {
  const getPetEmoji = () => {
    const pets = {
      sad: '😢🐶',
      neutral: '😐🐶',
      happy: '😊🐶',
      excited: '🤩🐶'
    };
    return pets[petMood] || '🐶';
  };

  return (
    <aside className="sidebar">
      {/* Pet Card */}
      <div className="pet-card">
        <h3>Your Pet</h3>
        <div className="pet-display">{getPetEmoji()}</div>
        <div className="pet-stats">
          <div className="stat">
            <span className="stat-label">Level</span>
            <span className="stat-value">{petLevel}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Mood</span>
            <span className="stat-value">{petMood}</span>
          </div>
        </div>
        <div className="pet-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(points % 50) * 2}%` }}
            />
          </div>
          <span className="progress-text">{points % 50}/50 to next level</span>
        </div>
      </div>

      {/* Stats Card */}
      <div className="stats-card">
        <h3>Today's Stats</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">{takenCount}</span>
            <span className="stat-label">Taken</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{remainingCount}</span>
            <span className="stat-label">Remaining</span>
          </div>
        </div>
        <div className="streak-display">
          <span className="streak-icon">🔥</span>
          <span className="streak-text">{streak} day streak!</span>
        </div>
      </div>

      {/* Tips Card */}
      <div className="quick-tips">
        <h3>💡 Tips</h3>
        {tips.map((tip, index) => (
          <p key={index}>{tip}</p>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
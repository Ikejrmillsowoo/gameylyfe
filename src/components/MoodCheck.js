import React, { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import './MoodCheck.css';
import PageLayout from './PageLayout.js';

const MoodCheck = ({ 
  darkMode, 
  setDarkMode, 
  points,
  setPoints,
  petLevel,
  setPetLevel,
  petMood,
  setPetMood,
  streak
}) => {
  const [selectedMood, setSelectedMood] = useState(null);

  const moods = [
    { emoji: '😊', label: 'HAPPY', value: 'happy', color: 'happy' },
    { emoji: '😐', label: 'OKAY', value: 'okay', color: 'okay' },
    { emoji: '😔', label: 'SAD', value: 'sad', color: 'sad' },
    { emoji: '😄', label: 'GREAT', value: 'great', color: 'great' },
    { emoji: '😰', label: 'ANXIOUS', value: 'anxious', color: 'anxious' },
    { emoji: '😴', label: 'TIRED', value: 'tired', color: 'tired' }
  ];

  const activities = {
    happy: [
      { icon: '🎨', title: 'Creative Project', desc: 'Express yourself through art', time: '20 min', points: 15 },
      { icon: '🎵', title: 'Listen to Music', desc: 'Enjoy your favorite playlist', time: '15 min', points: 10 },
      { icon: '🚶', title: 'Take a Walk', desc: 'Get some fresh air', time: '30 min', points: 20 }
    ],
    okay: [
      { icon: '📚', title: 'Read a Book', desc: 'Dive into a good story', time: '25 min', points: 15 },
      { icon: '🏃', title: 'Light Exercise', desc: 'Get your body moving', time: '20 min', points: 15 },
      { icon: '🧹', title: 'Organize Space', desc: 'Tidy up your area', time: '15 min', points: 10 }
    ],
    sad: [
      { icon: '💭', title: 'Guided Meditation', desc: 'Find your inner peace', time: '10 min', points: 15 },
      { icon: '📞', title: 'Call a Friend', desc: 'Connect with someone', time: '15 min', points: 20 },
      { icon: '🎬', title: 'Watch Comfort Show', desc: 'Relax with familiar content', time: '20 min', points: 10 }
    ],
    great: [
      { icon: '💪', title: 'Exercise', desc: 'Channel that energy', time: '30 min', points: 25 },
      { icon: '🎯', title: 'New Activity', desc: 'Try something different', time: '20 min', points: 20 },
      { icon: '🧠', title: 'Learn Something', desc: 'Expand your knowledge', time: '25 min', points: 20 }
    ],
    anxious: [
      { icon: '🧘', title: 'Breathing Exercise', desc: 'Calm your mind', time: '5 min', points: 10 },
      { icon: '📝', title: 'Journal Thoughts', desc: 'Write it out', time: '10 min', points: 15 },
      { icon: '☕', title: 'Mindful Tea Break', desc: 'Take a moment for yourself', time: '10 min', points: 10 }
    ],
    tired: [
      { icon: '😴', title: 'Short Nap', desc: 'Rest and recharge', time: '20 min', points: 15 },
      { icon: '🧘', title: 'Gentle Stretch', desc: 'Release tension', time: '10 min', points: 10 },
      { icon: '💧', title: 'Hydrate', desc: 'Drink some water', time: '5 min', points: 5 }
    ]
  };

  const tips = [
    "💡 Regular mood checks help identify patterns",
    "🌟 Be honest about how you're feeling",
    "📊 Track your moods to understand triggers"
  ];

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
  };

  const handleActivityComplete = (activityPoints) => {
    setPoints(prev => {
      const newPoints = prev + activityPoints;
      // Level up pet every 50 points
      if (newPoints % 50 === 0) {
        setPetLevel(prevLevel => prevLevel + 1);
      }
      return newPoints;
    });
    setPetMood('happy');
    setSelectedMood(null);
  };

  const handleSkip = () => {
    setPoints(prev => prev + 5);
    setSelectedMood(null);
  };

  // Calculate stats for sidebar
  const takenCount = selectedMood ? 1 : 0;
  const remainingCount = selectedMood ? 2 : 3;

  const renderMoodSelection = () => (
    <>
      <div className="mood-check-header">
        <h2>Mood Check</h2>
        <button className="insights-button">
          <BarChart3 size={24} />
        </button>
      </div>

      <div className="mood-intro">
        <h3>How are you feeling?</h3>
        <p>Select your mood to get personalized activity suggestions</p>
      </div>

      <div className="mood-label">Select Your Mood</div>

      <div className="mood-grid">
        {moods.map((mood) => (
          <div
            key={mood.value}
            className={`mood-card mood-${mood.color} ${darkMode ? 'dark' : 'light'}`}
            onClick={() => handleMoodSelect(mood.value)}
          >
            <div className="mood-emoji">{mood.emoji}</div>
            <div className="mood-name">{mood.label}</div>
          </div>
        ))}
      </div>

      <div className={`crisis-box ${darkMode ? 'dark' : 'light'}`}>
        Crisis Hotline: 988
      </div>
    </>
  );

  const renderActivitySuggestions = () => {
    const currentMood = moods.find(m => m.value === selectedMood);
    const currentActivities = activities[selectedMood];

    return (
      <>
        <button 
          className="back-button"
          onClick={() => setSelectedMood(null)}
        >
          ← Back
        </button>

        <div className={`selected-mood-header mood-${currentMood.color}`}>
          <div className="selected-emoji">{currentMood.emoji}</div>
          <div className="selected-text">
            You're feeling {currentMood.label.charAt(0) + currentMood.label.slice(1).toLowerCase()}!
          </div>
        </div>

        <div className="activities-label">
          {selectedMood === 'anxious' ? 'CALMING ACTIVITIES' : 
           selectedMood === 'sad' ? 'SUPPORTIVE ACTIVITIES' : 
           'SUGGESTED ACTIVITIES'}
        </div>

        <div className="activities-list">
          {currentActivities.map((activity, idx) => (
            <div
              key={idx}
              className={`activity-card ${darkMode ? 'dark' : 'light'}`}
              onClick={() => handleActivityComplete(activity.points)}
            >
              <div className="activity-icon">{activity.icon}</div>
              <div className="activity-content">
                <div className="activity-title">{activity.title}</div>
                <div className="activity-desc">{activity.desc}</div>
                <div className="activity-footer">
                  <div className="activity-time">⏱ {activity.time}</div>
                  <div className="activity-points">+{activity.points} PTS</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {(selectedMood === 'anxious' || selectedMood === 'sad') && (
          <div className={`crisis-alert ${darkMode ? 'dark' : 'light'}`}>
            {selectedMood === 'sad' 
              ? "You're not alone. Crisis support: 988"
              : "Need immediate support? Call 988"}
          </div>
        )}

        <button 
          className={`skip-button ${darkMode ? 'dark' : 'light'}`}
          onClick={handleSkip}
        >
          SKIP FOR NOW
        </button>
      </>
    );
  };

  return (
    <PageLayout
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      points={points}
      petLevel={petLevel}
      petMood={petMood}
      takenCount={takenCount}
      remainingCount={remainingCount}
      streak={streak}
      tips={tips}
    >
      <div className={`mood-check-content ${darkMode ? 'dark' : 'light'}`}>
        {!selectedMood ? renderMoodSelection() : renderActivitySuggestions()}
      </div>
    </PageLayout>
  );
};

export default MoodCheck;
import React, { useState, useEffect, useRef } from 'react';
import './MedicationsWeb.css';
import Navigator from './Navigator';
import Header from './Header';

const MedicationsWeb = ({points, setPoints, darkMode, petLevel, setPetLevel, setPetMood, petMood}) => {
  const [medications, setMedications] = useState([
    {
      id: 1,
      name: 'Sertraline',
      dosage: '50mg',
      frequency: 'Daily',
      time: '9:00 AM',
      taken: false,
      notes: 'Take with food'
    },
    {
      id: 2,
      name: 'Vitamin D',
      dosage: '2000 IU',
      frequency: 'Daily',
      time: '12:00 PM',
      taken: false,
      notes: 'With lunch'
    },
    {
      id: 3,
      name: 'Melatonin',
      dosage: '5mg',
      frequency: 'Daily',
      time: '10:00 PM',
      taken: false,
      notes: 'For sleep'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMed, setEditingMed] = useState(null);
  const [newMed, setNewMed] = useState({ 
    name: '', 
    dosage: '', 
    frequency: 'Daily',
    time: '',
    notes: '' 
  });
  // const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(13);
  const [selectedMed, setSelectedMed] = useState(null);
  // Track the last date (YYYY-MM-DD) when the user completed all meds — prevents double increments
  const [lastCompletedDate, setLastCompletedDate] = useState(null);
  // ref mirror so we can synchronously check/update the lastCompletedDate inside event handlers
  const lastCompletedDateRef = useRef(null);

  useEffect(() => {
    lastCompletedDateRef.current = lastCompletedDate;
  }, [lastCompletedDate]);
  // Track the current day string so we can detect day changes (for midnight reset behavior)
  const [currentDay, setCurrentDay] = useState(new Date().toDateString());
  const [searchTerm, setSearchTerm] = useState('');
  // const [darkMode, setDarkMode] = useState(false);
  // const [petMood, setPetMood] = useState('happy');
  // const [petLevel, setPetLevel] = useState(1);

  // Calculate points needed for each level
  const getPointsForLevel = (level) => {
    const levelThresholds = [
      0,      // Level 1 starts at 0
      50,     // Level 2 at 50
      175,    // Level 3 at 175 (50 + 125)
      488,    // Level 4 at 488 (175 + 313)
      1270    // Level 5 at 1270 (488 + 782)
    ];
    
    // Cap at level 5
    if (level > 5) {
      return levelThresholds[4];
    }
    
    return levelThresholds[level - 1];
  };

  // Get points needed for next level
  const getPointsToNextLevel = () => {
    return getPointsForLevel(petLevel + 1) - getPointsForLevel(petLevel);
  };

  // Get current progress toward next level
  const getCurrentLevelProgress = () => {
    const currentLevelStart = getPointsForLevel(petLevel);
    return points - currentLevelStart;
  };

  // Calculate multiplier based on streak
  const getMultiplier = () => {
    if (streak >= 14) return Math.min(5, 3 + Math.floor((streak - 14) / 7)); // After 14 days, +1 every 7 days, capped at 5x
    if (streak >= 7) return 2;
    if (streak >= 3) return 1.5;
    return 1;
  };

  const multiplier = getMultiplier();

  // Check for level up whenever points change
  useEffect(() => {
    const nextLevelThreshold = getPointsForLevel(petLevel + 1);
    if (points >= nextLevelThreshold) {
      setPetLevel(prevLevel => prevLevel + 1);
    }
  }, [points, petLevel, getPointsForLevel]);

  useEffect(() => {
    const takenCount = medications.filter(m => m.taken).length;
    const totalCount = medications.length;
    const compliance = totalCount > 0 ? (takenCount / totalCount) * 100 : 0;
    
    if (compliance >= 80) setPetMood('excited');
    else if (compliance >= 50) setPetMood('happy');
    else if (compliance > 0) setPetMood('neutral');
    else setPetMood('sad');
  }, [medications]);

  const handleMedicationToggle = (id) => {
    setMedications(prevMeds => {
      // whether all meds were taken before the toggle
      const prevAllTaken = prevMeds.length > 0 && prevMeds.every(m => m.taken);

      const updatedMeds = prevMeds.map(med => {
        if (med.id === id) {
          const willBeTaken = !med.taken;
          const updatedMed = { ...med, taken: willBeTaken };

          const basePoints = 10;

          if (willBeTaken) {
            // compute multiplier at the moment of taking
            const currentMultiplier = getMultiplier();
            const earnedPoints = Math.floor(basePoints * currentMultiplier);
            // store earned points on the med so we can subtract the exact same amount on uncheck
            updatedMed.pointsEarned = earnedPoints;
            updatedMed.takenAt = new Date().toISOString();
            setPoints(prev => prev + earnedPoints);
          } else {
            // med is being unchecked — subtract the exact points that were awarded when it was taken
            const lostPoints = med.pointsEarned != null ? med.pointsEarned : Math.floor(basePoints * getMultiplier());
            // clear the recorded earned points
            updatedMed.pointsEarned = undefined;
            updatedMed.takenAt = undefined;
            setPoints(prev => Math.max(0, prev - lostPoints));
          }

          return updatedMed;
        }
        return med;
      });

      // whether all meds are taken after the toggle
      const newAllTaken = updatedMeds.length > 0 && updatedMeds.every(m => m.taken);

      // If the user just completed all meds for today, increment the streak — but only once per day.
      if (!prevAllTaken && newAllTaken) {
        const todayKey = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
        if (lastCompletedDateRef.current !== todayKey) {
          setStreak(prev => prev + 1);
          setLastCompletedDate(todayKey);
          lastCompletedDateRef.current = todayKey;
        }
      }

      // NOTE: We intentionally DO NOT reset the streak immediately when a med is unchecked.
      // The streak should only reset at day boundary if the user did not take any meds that day.

      return updatedMeds;
    });
  };

  // Detect day changes (when the app is open across midnight). On day change, if no meds were taken
  // on the previous day (i.e., none of the meds have taken=true), reset the streak to 0.
  useEffect(() => {
    const checkDayChange = () => {
      const todayStr = new Date().toDateString();
      if (todayStr !== currentDay) {
        // day changed
        // Determine if any meds were taken yesterday — we consider 'taken' flags present at day boundary
        const anyTakenYesterday = medications.some(m => m.taken);
        if (!anyTakenYesterday) {
          setStreak(0);
          setLastCompletedDate(null);
          lastCompletedDateRef.current = null;
        }
        setCurrentDay(todayStr);
      }
    };

    // Check every 30 seconds — fine for demo. If you need a precise midnight reset, schedule a timeout
    // until next midnight instead.
    const interval = setInterval(checkDayChange, 30 * 1000);
    return () => clearInterval(interval);
  }, [currentDay, medications]);

  const handleAddMedication = () => {
    if (newMed.name && newMed.dosage && newMed.time) {
      setMedications([...medications, { id: Date.now(), ...newMed, taken: false }]);
      setNewMed({ name: '', dosage: '', frequency: 'Daily', time: '', notes: '' });
      setShowAddForm(false);
    }
  };

  const handleEditMedication = (med) => {
    setEditingMed(med);
    setNewMed({ 
      name: med.name, 
      dosage: med.dosage, 
      frequency: med.frequency,
      time: med.time,
      notes: med.notes 
    });
    setShowAddForm(true);
  };

  const handleSaveMedication = () => {
    if (newMed.name && newMed.dosage && newMed.time) {
      if (editingMed) {
        // Update existing medication
        setMedications(medications.map(med => 
          med.id === editingMed.id 
            ? { ...med, ...newMed }
            : med
        ));
        setEditingMed(null);
      } else {
        // Add new medication
        setMedications([...medications, { id: Date.now(), ...newMed, taken: false }]);
      }
      setNewMed({ name: '', dosage: '', frequency: 'Daily', time: '', notes: '' });
      setShowAddForm(false);
    }
  };

  const handleCloseModal = () => {
    setShowAddForm(false);
    setEditingMed(null);
    setNewMed({ name: '', dosage: '', frequency: 'Daily', time: '', notes: '' });
  };

  const handleDeleteMedication = (id) => {
    setMedications(medications.filter(med => med.id !== id));
    setSelectedMed(null);
  };

  const filteredMedications = medications.filter(med =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.notes.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPetEmoji = () => {
    const pets = { sad: '😢🐶', neutral: '😐🐶', happy: '😊🐶', excited: '🤩🐶' };
    return pets[petMood] || '🐶';
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', { 
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    });
  };


  return (
    <>
      <div className={`medications-web-container ${darkMode? 'dark-mode' : ''}`}>
        {/* <Header points={points} setDarkMode={setDarkMode} darkMode={darkMode} /> */}

        <div className="web-content">
          <aside className="sidebar">
            <div className="pet-card">
              {/* <h3 className="card-title">Your Pet</h3> */}
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
              <div className="progress-bar">
                {(() => {
                  const currentLevelStart = getPointsForLevel(petLevel);
                  const nextLevelStart = getPointsForLevel(petLevel + 1);
                  const progress = Math.max(0, points - currentLevelStart);
                  const total = Math.max(1, nextLevelStart - currentLevelStart);
                  const percent = Math.min(100, Math.round((progress / total) * 100));
                  return <div className="progress-fill" style={{ width: `${percent}%` }} />;
                })()}
              </div>
              {(() => {
                const currentLevelStart = getPointsForLevel(petLevel);
                const nextLevelStart = getPointsForLevel(petLevel + 1);
                const progress = Math.max(0, points - currentLevelStart);
                const total = nextLevelStart - currentLevelStart;
                if (total <= 0) return <span className="progress-text">Max level reached</span>;
                return <span className="progress-text">{progress}/{total} to next level</span>;
              })()}
            </div>

            <div className="stats-card">
              <h3 >Today's Stats</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-number">{medications.filter(m => m.taken).length}</span>
                  <span className="stat-label">Taken</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{medications.length - medications.filter(m => m.taken).length}</span>
                  <span className="stat-label">Remaining</span>
                </div>
              </div>
              <div className="streak-display">
                <span className="streak-icon">🔥</span>
                <span className="streak-text">{streak} day streak!</span>
              </div>
              {/* addition */}
              <div className="streak-display" style={{ backgroundColor: darkMode ? '#1565c0' : '#e3f2fd', color: darkMode ? '#64b5f6' : '#1565c0', marginTop: '0.5rem' }}>
                <span>⚡</span>
                <span>{multiplier}x Multiplier</span>
              </div>
            </div>

            <div className="quick-tips">
              <h3 >💡 Tips</h3>
              <p >
                Set alarms for each medication time to build consistency.
              </p>
              <p >
                Keep medications visible as a reminder.
              </p>
            </div>
          </aside>

          <main className="main-content">
            <div className="content-header">
              <div>
                <h2 style={{ margin: '0 0 0.5rem 0' }}>Medications</h2>
                <p className="date-display">{getCurrentDate()}</p>
              </div>
              <div className="header-actions">
                <input
                  type="text"
                  className="search-input"
                  placeholder="🔍 Search medications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="add-btn-primary" onClick={() => setShowAddForm(true)}>
                  + Add Medication
                </button>
              </div>
            </div>

            <div className="medications-grid">
              {filteredMedications.map(med => (
                <div
                  key={med.id}
                  className={`medication-card${med.taken ? ' completed' : ''}`}
                  onClick={() => setSelectedMed(selectedMed?.id === med.id ? null : med)}
                >
                  <div className="med-card-header">
                    <h3 style={{ margin: 0 }}>{med.name}</h3>
                    <button
                      className={`check-btn${med.taken ? ' checked' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMedicationToggle(med.id);
                      }}
                    >
                      {med.taken ? '✓' : ''}
                    </button>
                  </div>
                  <div className='med-card-body'>
                    <div className="med-detail">
                      <span className="detail-icon">💊</span>
                      <span>{med.dosage}</span>
                    </div>
                    <div className="med-detail">
                      <span className="detail-icon">⏰</span>
                      <span>{med.time}</span>
                    </div>
                    <div className="med-detail">
                      <span className="detail-icon">🔄</span>
                      <span>{med.frequency}</span>
                    </div>
                    {med.notes && (
                      <div className="med-notes">
                        <span className="detail-icon">📝</span>
                        <span>{med.notes}</span>
                      </div>
                    )}
                  </div>
                  {selectedMed?.id === med.id && (
                    <div className="med-card-actions">
                      <button
                        className="delete-btn"
                        style={{ backgroundColor: '#1976d2', marginRight: '0.5rem' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditMedication(med);
                        }}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteMedication(med.id);
                        }}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {showAddForm && (
              <div className="modal-overlay" onClick={handleCloseModal}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-header">
                    <h2 style={{ margin: 0 }}>{editingMed ? 'Edit Medication' : 'Add New Medication'}</h2>
                    <button className="close-btn" onClick={handleCloseModal}>×</button>
                  </div>
                  <div className="modal-body">
                    <div className="form-group">
                      <label className="label">Medication Name *</label>
                      <input
                        type="text"
                        className="input"
                        value={newMed.name}
                        onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                        placeholder="e.g., Sertraline"
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="label">Dosage *</label>
                        <input
                          type="text"
                          className="input"
                          value={newMed.dosage}
                          onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
                          placeholder="e.g., 50mg"
                        />
                      </div>
                      <div className="form-group">
                        <label className="label">Time *</label>
                        <input
                          type="text"
                          className="input"
                          value={newMed.time}
                          onChange={(e) => setNewMed({ ...newMed, time: e.target.value })}
                          placeholder="e.g., 9:00 AM"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="label">Frequency</label>
                      <select
                        className="input"
                        value={newMed.frequency}
                        onChange={(e) => setNewMed({ ...newMed, frequency: e.target.value })}
                      >
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="As Needed">As Needed</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="label">Notes (Optional)</label>
                      <textarea
                        className="input"
                        style={{ resize: 'vertical', fontFamily: 'inherit' }}
                        value={newMed.notes}
                        onChange={(e) => setNewMed({ ...newMed, notes: e.target.value })}
                        placeholder="e.g., Take with food"
                        rows="3"
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button className="cancel-btn" onClick={handleCloseModal}>
                      Cancel
                    </button>
                    <button className="save-btn" onClick={handleSaveMedication}>
                      {editingMed ? 'Update Medication' : 'Save Medication'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>

          <aside className="sidebar">
            <div className="card">
              <h3 >Daily Points</h3>
              <div className="points-display">
                <span style={{ fontSize: '3rem' }}>🏆</span>
                <span className="points-value">{points}</span>
              </div>
              <p className="points-label">Total Points</p>
              <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: darkMode ? '#1565c0' : '#e3f2fd', borderRadius: '8px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: darkMode ? '#64b5f6' : '#1565c0' }}>
                  ⚡ {multiplier}x
                </div>
                <div style={{ fontSize: '0.85rem', color: darkMode ? '#90caf9' : '#1565c0', marginTop: '0.25rem' }}>
                  Current Multiplier
                </div>
              </div>
            </div>

            <div className="card">
              <h3>Quick Actions</h3>
              <div className="quick-actions-grid">
                <button className="quick-action-btn">
                  <span className="action-icon">💊</span>
                  <span className="action-label">Meds</span>
                </button>
                <button className="quick-action-btn">
                  <span className="action-icon">😊</span>
                  <span className="action-label">Mood</span>
                </button>
                <button className="quick-action-btn">
                  <span className="action-icon">📚</span>
                  <span className="action-label">Resources</span>
                </button>
                <button className="quick-action-btn">
                  <span className="action-icon">🎯</span>
                  <span className="action-label">Challenges</span>
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default MedicationsWeb;

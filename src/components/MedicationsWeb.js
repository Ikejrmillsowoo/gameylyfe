import React, { useState, useEffect } from 'react';
import './MedicationsWeb.css';

const MedicationsWeb = () => {
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
  const [newMed, setNewMed] = useState({ 
    name: '', 
    dosage: '', 
    frequency: 'Daily',
    time: '',
    notes: '' 
  });
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(7);
  const [selectedMed, setSelectedMed] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Pet states
  const [petMood, setPetMood] = useState('happy');
  const [petLevel, setPetLevel] = useState(1);

  useEffect(() => {
    // Update pet mood based on medication compliance
    const takenCount = medications.filter(m => m.taken).length;
    const totalCount = medications.length;
    const compliance = totalCount > 0 ? (takenCount / totalCount) * 100 : 0;
    
    if (compliance >= 80) {
      setPetMood('excited');
    } else if (compliance >= 50) {
      setPetMood('happy');
    } else if (compliance > 0) {
      setPetMood('neutral');
    } else {
      setPetMood('sad');
    }
  }, [medications]);

  const handleMedicationToggle = (id) => {
    setMedications(meds =>
      meds.map(med => {
        if (med.id === id) {
          const updatedMed = { ...med, taken: !med.taken };
          if (updatedMed.taken && !med.taken) {
            setPoints(points + 10);
            // Level up pet every 50 points
            if ((points + 10) % 50 === 0) {
              setPetLevel(petLevel + 1);
            }
          } else if (!updatedMed.taken && med.taken) {
            setPoints(Math.max(0, points - 10));
          }
          return updatedMed;
        }
        return med;
      })
    );
  };

  const handleAddMedication = () => {
    if (newMed.name && newMed.dosage && newMed.time) {
      setMedications([...medications, {
        id: Date.now(),
        ...newMed,
        taken: false
      }]);
      setNewMed({ 
        name: '', 
        dosage: '', 
        frequency: 'Daily',
        time: '',
        notes: '' 
      });
      setShowAddForm(false);
    }
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
    const pets = {
      sad: '😢🐶',
      neutral: '😐🐶',
      happy: '😊🐶',
      excited: '🤩🐶'
    };
    return pets[petMood] || '🐶';
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="medications-web-container">
      {/* Header */}
      <header className="web-header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">🎮</span>
            <h1>Gaming Life</h1>
          </div>
          <nav className="nav-menu">
            <button className="nav-item active">Medications</button>
            <button className="nav-item">Mood Check</button>
            <button className="nav-item">Resources</button>
            <button className="nav-item">Achievements</button>
          </nav>
          <div className="user-menu">
            <span className="points-badge">🏆 {points} pts</span>
            <button className="profile-btn">👤</button>
          </div>
        </div>
      </header>

      <div className="web-content">
        {/* Sidebar */}
        <aside className="sidebar">
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

          <div className="stats-card">
            <h3>Today's Stats</h3>
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
          </div>

          <div className="quick-tips">
            <h3>💡 Tips</h3>
            <p>Set alarms for each medication time to build consistency.</p>
            <p>Keep medications visible as a reminder.</p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <div className="content-header">
            <div>
              <h2>Medications</h2>
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
              <button 
                className="add-btn-primary"
                onClick={() => setShowAddForm(true)}
              >
                + Add Medication
              </button>
            </div>
          </div>

          {/* Medications Grid */}
          <div className="medications-grid">
            {filteredMedications.map(med => (
              <div 
                key={med.id} 
                className={`medication-card ${med.taken ? 'completed' : ''}`}
                onClick={() => setSelectedMed(selectedMed?.id === med.id ? null : med)}
              >
                <div className="med-card-header">
                  <h3>{med.name}</h3>
                  <button 
                    className={`check-btn ${med.taken ? 'checked' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMedicationToggle(med.id);
                    }}
                  >
                    {med.taken ? '✓' : ''}
                  </button>
                </div>
                <div className="med-card-body">
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

          {/* Add Medication Modal */}
          {showAddForm && (
            <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h2>Add New Medication</h2>
                  <button 
                    className="close-btn"
                    onClick={() => setShowAddForm(false)}
                  >
                    ×
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Medication Name *</label>
                    <input
                      type="text"
                      value={newMed.name}
                      onChange={(e) => setNewMed({...newMed, name: e.target.value})}
                      placeholder="e.g., Sertraline"
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Dosage *</label>
                      <input
                        type="text"
                        value={newMed.dosage}
                        onChange={(e) => setNewMed({...newMed, dosage: e.target.value})}
                        placeholder="e.g., 50mg"
                      />
                    </div>
                    <div className="form-group">
                      <label>Time *</label>
                      <input
                        type="text"
                        value={newMed.time}
                        onChange={(e) => setNewMed({...newMed, time: e.target.value})}
                        placeholder="e.g., 9:00 AM"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Frequency</label>
                    <select 
                      value={newMed.frequency}
                      onChange={(e) => setNewMed({...newMed, frequency: e.target.value})}
                    >
                      <option value="Daily">Daily</option>
                      <option value="Weekly">Weekly</option>
                      <option value="As Needed">As Needed</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Notes (Optional)</label>
                    <textarea
                      value={newMed.notes}
                      onChange={(e) => setNewMed({...newMed, notes: e.target.value})}
                      placeholder="e.g., Take with food"
                      rows="3"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    className="cancel-btn"
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="save-btn"
                    onClick={handleAddMedication}
                  >
                    Save Medication
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MedicationsWeb;
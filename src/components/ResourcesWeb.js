import React, { useState } from 'react';
import './ResourcesWeb.css';
import Navigator from './Navigator';

const ResourcesWeb = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [bookmarkedResources, setBookmarkedResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);

  const resources = [
    {
      id: 1,
      title: '211.org',
      category: 'health',
      type: 'Webpage',
      description: 'free health clinics, community health centers, and screening programs',
      contact: 'Text: 741741',
      website: 'https://211.org',
      icon: '🏥',
      availability: '24/7'
    },
    {
      id: 2,
      title: 'Free Clinics Directory',
      category: 'health',
      type: 'Webpage',
      description: 'database of free and charitable clinics across the US',
      contact: 'Call: 888',
      website: 'https://freeclinics.com)',
      icon: '🏥',
      availability: '24/7'
    },
    {
      id: 3,
      title: 'HRSA Health Center Locator',
      category: 'health',
      type: 'Webpage',
      description: 'Free or low-cost care based on income',
      contact: 'Helpline: 1-800-950-HRSA',
      website: 'findahealthcenter.hrsa.gov',
      icon: '🏥',
      availability: 'Mon-Fri 10am-10pm ET'
    },
    {
      id: 4,
      title: 'Feeding America Food Bank Locator',
      category: 'food',
      type: 'Link',
      description: 'The nation\'s largest hunger-relief organization',
      contact: 'Mobile App',
      website: 'feedingamerica.org/find-your-local-foodbank',
      icon: '🍉',
      availability: 'On-demand'
    },
    {
      id: 5,
      title: 'USDA SNAP Retailer Locator',
      category: 'food',
      type: 'Link',
      description: 'Helps people find stores that accept SNAP/EBT benefits',
      contact: 'Mobile App',
      website: 'fns.usda.gov/snap/retailer-locator',
      icon: '🍉',
      availability: 'On-demand'
    },
    {
      id: 6,
      title: 'Headspace',
      category: 'therapy',
      type: 'meditation',
      description: 'Guided meditation and mindfulness app',
      contact: 'Mobile App',
      website: 'https://www.headspace.com',
      icon: '🧘',
      availability: 'On-demand'
    },
    {
      id: 7,
      title: 'BetterHelp',
      category: 'therapy',
      type: 'online',
      description: 'Online counseling and therapy services',
      contact: 'Online Platform',
      website: 'https://www.betterhelp.com',
      icon: '💬',
      availability: 'Flexible scheduling'
    },
    {
      id: 8,
      title: 'Calm',
      category: 'therapy',
      type: 'meditation',
      description: 'Sleep stories, meditation, and relaxation techniques',
      contact: 'Mobile App',
      website: 'https://www.calm.com',
      icon: '🌙',
      availability: 'On-demand'
    },
    {
      id: 9,
      title: 'Psychology Today Therapist Finder',
      category: 'therapy',
      type: 'directory',
      description: 'Find local therapists and support groups',
      contact: 'Online Directory',
      website: 'https://www.psychologytoday.com',
      icon: '🔍',
      availability: 'Browse anytime'
    },
    {
      id: 10,
      title: 'Mental Health America Screening',
      category: 'health',
      type: 'assessment',
      description: 'Free, anonymous mental health screenings',
      contact: 'Online Tool',
      website: 'https://screening.mhanational.org',
      icon: '📋',
      availability: 'Available anytime'
    },
    {
      id: 11,
      title: 'Substance Abuse and Mental Health Services',
      category: 'support',
      type: 'government',
      description: 'SAMHSA National Helpline for treatment referral',
      contact: 'Call: 1-800-662-4357',
      website: 'https://www.samhsa.gov',
      icon: '🏛️',
      availability: '24/7'
    },
    {
      id: 12,
      title: 'Talkspace',
      category: 'therapy',
      type: 'online',
      description: 'Text, audio, and video therapy sessions',
      contact: 'Mobile App',
      website: 'https://www.talkspace.com',
      icon: '💭',
      availability: 'Message anytime'
    },
    {
      id: 13,
      title: 'Youper',
      category: 'support',
      type: 'ai-therapy',
      description: 'AI-powered emotional health assistant',
      contact: 'Mobile App',
      website: 'https://www.youper.ai',
      icon: '🤖',
      availability: 'On-demand'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Resources', icon: '📚' },
    { id: 'health', label: 'Health Screening', icon: '🏥' },
    { id: 'food', label: 'Food Support', icon: '🍗' },
    { id: 'therapy', label: 'Therapy', icon: '💬' },
    { id: 'support', label: 'Support Groups', icon: '🤝' }
  ];

  const [darkMode, setDarkMode] = useState(false);

  const handleBookmark = (resourceId) => {
    setBookmarkedResources(prev => {
      if (prev.includes(resourceId)) {
        return prev.filter(id => id !== resourceId);
      }
      return [...prev, resourceId];
    });
  };

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="resources-web-container">
      {/* Header */}
      <header className="web-header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">🎮</span>
            <h1>Gaming Life</h1>
          </div>
          <Navigator />
          <div className="user-menu">
            <span className="points-badge">🏆 250 pts</span>
            <button 
              className="dark-mode-toggle"
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? "Light Mode" : "Dark Mode"}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button className="profile-btn">👤</button>
          </div>
        </div>
      </header>

      <div className="web-content">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="categories-card">
            <h3>Categories</h3>
            <div className="category-list">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <span className="category-icon">{cat.icon}</span>
                  <span className="category-label">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bookmarks-card">
            <h3>Bookmarked</h3>
            {bookmarkedResources.length === 0 ? (
              <p className="empty-state">No bookmarks yet. Click the ⭐ to save resources!</p>
            ) : (
              <div className="bookmark-list">
                {bookmarkedResources.map(id => {
                  const resource = resources.find(r => r.id === id);
                  return (
                    <div key={id} className="bookmark-item">
                      <span>{resource.icon}</span>
                      <span>{resource.title}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="quick-help">
            <h3>🆘 Quick Help</h3>
            <div className="emergency-box">
              <p className="emergency-title">In Crisis?</p>
              <p className="emergency-text">Call 988</p>
              <p className="emergency-subtext">or text HOME to 741741</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <div className="content-header">
            <div>
              <h2>Resources</h2>
              <p className="date-display">{getCurrentDate()}</p>
            </div>
            <div className="header-actions">
              <input
                type="text"
                className="search-input"
                placeholder="🔍 Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Resource Cards */}
          <div className="resources-grid">
            {filteredResources.map(resource => (
              <div 
                key={resource.id} 
                className="resource-card"
                onClick={() => setSelectedResource(selectedResource?.id === resource.id ? null : resource)}
              >
                <div className="resource-card-header">
                  <div className="resource-icon-title">
                    <span className="resource-icon">{resource.icon}</span>
                    <h3>{resource.title}</h3>
                  </div>
                  <button
                    className={`bookmark-btn ${bookmarkedResources.includes(resource.id) ? 'bookmarked' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookmark(resource.id);
                    }}
                  >
                    {bookmarkedResources.includes(resource.id) ? '⭐' : '☆'}
                  </button>
                </div>

                <div className="resource-card-body">
                  <p className="resource-description">{resource.description}</p>
                  
                  <div className="resource-details">
                    <div className="resource-detail">
                      <span className="detail-icon">📞</span>
                      <span>{resource.contact}</span>
                    </div>
                    <div className="resource-detail">
                      <span className="detail-icon">⏰</span>
                      <span>{resource.availability}</span>
                    </div>
                  </div>

                  {selectedResource?.id === resource.id && (
                    <div className="resource-expanded">
                      <a 
                        href={resource.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="visit-btn"
                        onClick={(e) => e.stopPropagation()}
                      >
                        🌐 Visit Website
                      </a>
                    </div>
                  )}
                </div>

                <div className="resource-card-footer">
                  <span className="resource-type-badge">{resource.type}</span>
                  <span className="resource-category-badge">{resource.category}</span>
                </div>
              </div>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="empty-results">
              <span className="empty-icon">🔍</span>
              <h3>No resources found</h3>
              <p>Try adjusting your search or category filter</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ResourcesWeb;
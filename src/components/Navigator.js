import React from 'react'
import { Link } from 'react-router-dom'

function Navigator() {
  return (
    <div>
        <nav className="nav-menu">
             {/* <Link to="/" className='nav-item'>Medications</Link> */}
            <button className="nav-item active"><Link to="/" className='nav-item'>Medications</Link></button>
            <button className="nav-item"><Link to="/moodCheck" className='nav-item'>Mood Check</Link></button>
            {/* <Link to="/resources" className='nav-item'>Resources</Link> */}
            <button className="nav-item"><Link to="/resources" className='nav-item'>Resources</Link></button>
            <button className="nav-item">Achievements</button>
          </nav>
    </div>
  )
}

export default Navigator
import React from 'react'
// Import Link, NavLink, AND useLocation
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Newspaper } from 'react-bootstrap-icons'

function Header() {
  // Get the current location object
  const location = useLocation();

  return (
    <header className="py-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="h4 mb-0 text-white text-decoration-none d-flex align-items-center">
          <Newspaper className="me-2" style={{ color: 'var(--color-primary)' }} />
          Khabri
        </Link>
        <nav className="d-flex align-items-center">
          {/* These links will still appear on all pages */}

          {/* THIS IS THE CHANGE:
            Only render the "Get Started" button if the current path is '/'
          */}
          {location.pathname === '/' && (
            <Link to="/results" className="btn btn-primary ms-3">Get Started</Link>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
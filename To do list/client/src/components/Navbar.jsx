import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import DarkModeToggle from './DarkModeToggle'

export default function Navbar(){
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const handleLogout = async () => {
    await logout();
    navigate('/login')
  }
  return (
    <header className="nav-glass flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link to="/dashboard" className="brand">ToDoist</Link>
        <span className="text-muted">— Do more, stress less</span>
      </div>
      <div className="flex items-center gap-3">
        <DarkModeToggle />
        {user && <Link to="/profile" className="text-sm text-gray-700 dark:text-gray-200 flex items-center gap-2"><div className="icon-btn" style={{padding:'6px'}}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M20 21v-2a4 4 0 00-3-3.87" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 21v-2a4 4 0 013-3.87" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="7" r="4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>{user.name}</Link>}
        {user ? (
          <button onClick={handleLogout} className="icon-btn" title="Logout"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 17l5-5-5-5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12H9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
        ) : (
          <Link to="/login" className="text-sm text-blue-600">Login</Link>
        )}
      </div>
    </header>
  )
}

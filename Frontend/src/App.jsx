import { useState } from 'react'
import Home from './Home.jsx'
import Login from './Login.jsx'
import Register from './Register.jsx'
import Dashboard from './Dashboard.jsx'

import './App.css'
import {Routes, Route, Link, useLocation, HashRouter } from 'react-router-dom';

function AppContent() {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';
  return (
    <>
      {!isDashboard && <div className='top-lined-spacer'></div>}
      {/* Navigation*/}
      {!isDashboard && (
        <nav className="navigational-bar navbar navbar-expand-md" data-bs-theme="dark"  id="headerNavigation">
          <div className="container-fluid">
              <ul className="nav-list links nav">
                <li className="nav-item text-light"><Link to="/" className='nav-link'>Home</Link></li>
                <li className="nav-item text-light"><Link to="/login" className='nav-link'>Login</Link></li>
                <li className="nav-item text-light"><Link to="/registration" className='nav-link'>Register</Link></li>
              </ul>
          </div>
        </nav>
      )}

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  )
}

export default App
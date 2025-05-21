import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/style.css';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

function Header() {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">AnAsian</Link>
      </div>
      <nav className="nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/menu">Menu</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/team">Team</Link></li>
          {user ? (
            <>
              <li className="user-welcome">Welcome, {user.email}</li>
              <li><Link to="/profile">Profile</Link></li>
              <li><button className="logout-btn" onClick={handleLogout}>Log Out</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
      <div className="bar" onClick={toggleMenu}>
        <i className="fas fa-bars"></i>
      </div>
      <div className={`headerbar ${isMenuOpen ? 'active' : ''}`}>
        <i className="fas fa-xmark" onClick={toggleMenu}></i>
        <nav className="nav">
          <ul>
            <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
            <li><Link to="/menu" onClick={toggleMenu}>Menu</Link></li>
            <li><Link to="/about" onClick={toggleMenu}>About</Link></li>
            <li><Link to="/team" onClick={toggleMenu}>Team</Link></li>
            {user ? (
              <>
                <li className="user-welcome">Welcome, {user.email}</li>
                <li><Link to="/profile" onClick={toggleMenu}>Profile</Link></li>
                <li><button className="logout-btn" onClick={() => { handleLogout(); toggleMenu(); }}>Log Out</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login" onClick={toggleMenu}>Login</Link></li>
                <li><Link to="/register" onClick={toggleMenu}>Register</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
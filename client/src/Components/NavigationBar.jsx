import React from 'react';
import { Link } from 'react-router-dom';
// import './Navbar.css'; 
import img from '../assets/image/PARQLOGO.png'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/map">
          <img src={img} alt="ParQ Logo" />
        </Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/main" className="active">Main</Link></li>
        <li><Link to="/operator">Operator</Link></li>
        <li><Link to="/analytics">Analytics</Link></li>
        <li><Link to="/monitor">Monitor</Link></li>
        <li><Link to="/tables">Tables</Link></li>
        <li><Link to="/settings">Settings</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
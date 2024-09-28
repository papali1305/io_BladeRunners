import React from 'react';
// import './Navbar.css'; 
import img from '../assets/image/PARQLOGO.png'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={img} alt="ParQ Logo" />
      </div>
      <ul className="nav-links">
        <li><a href="#" className="active">Main</a></li>
        <li><a href="#">Operator</a></li>
        <li><a href="#">Analytics</a></li>
        <li><a href="#">Monitor</a></li>
        <li><a href="#">Tables</a></li>
        <li><a href="#">Settings</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;

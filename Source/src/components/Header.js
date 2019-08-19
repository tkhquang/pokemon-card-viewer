import React from 'react';
import logo from '../images/logo.png';
import './Header.css';

const Header = () => (
  <header className="Header">
    <img src={logo} className="logo" alt="Pokemon Logo" />
    <h1>Pokémon Card Viewer</h1>
  </header>
);

export default Header;

import React from 'react';
import './Footer.css';
import githubicon from '../images/github.png';

const Footer = () => (
  <footer className="Footer">
    <a href="https://github.com/tkhquang" target="_blank" rel="noopener noreferrer">
      © Copyright 2019 - Aleks Trịnh Quang
      <img src={githubicon} alt="Github" />
    </a>
  </footer>
);

export default Footer;

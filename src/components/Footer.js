import React from 'react';
import '../styles/style.css';

function Footer() {
  return (
    <div className="footer">
      <div className="footer-section logo-area">
        <h2>AnAsian</h2>
        <p>Authentic Asian Flavors</p>
      </div>
      <div className="footer-section links">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/menu">Menu</a></li>
          <li><a href="/about">About Us</a></li>
          <li><a href="/team">Team</a></li>
        </ul>
      </div>
      <div className="footer-section hours">
        <h4>Opening Hours</h4>
        <p>Mon - Fri: 10:00 - 22:00</p>
        <p>Sat - Sun: 12:00 - 00:00</p>
      </div>
      <div className="footer-section contact">
        <h4>Contact Us</h4>
        <p>Email: <a href="mailto:info@anasian.com">info@anasian.com</a></p>
        <p>Phone: +38 (068) 861 9190</p>
        <p>Instagram: @aatxia</p>
        <p>Lviv, Ukraine</p>
      </div>
      <div className="footer-bottom">
        <p>© 2025 AnAsian. All Rights Reserved.</p>
      </div>
    </div>
  );
}

export default React.memo(Footer);
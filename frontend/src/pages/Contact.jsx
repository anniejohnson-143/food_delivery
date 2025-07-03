// frontend/src/pages/Contact.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';
export default function Contact() {
  return (
    <>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">Login </Link>
        <Link to="/register">Register</Link>
      </nav>
      <div className="contact-container">
        <h2>Contact Us</h2>
        <p>
          Have questions, feedback, or need support? We'd love to hear from you!
        </p>
        <ul>
          <li>Email: <a href="mailto:support@savora.com">support@savora.com</a></li>
          <li>Phone: +1 (555) 123-4567</li>
          <li>Address: 123 Flavor Street, Food City, Country</li>
        </ul>
        <p>
          Or fill out the form below:
        </p>
        <form>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required />
          <button type="submit" disabled>Send (Demo Only)</button>
        </form>
      </div>
    </>
  );
}
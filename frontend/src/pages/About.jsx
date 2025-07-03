// frontend/src/pages/About.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';
export default function About() {
  return (
    <>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">Login </Link>
        <Link to="/register">Register</Link>
      </nav>
      <div className="about-container">
        <h2>About SAVORA</h2>
        <p>
          SAVORA is your one-stop platform for discovering great restaurants and delicious food.
          Whether you are a food lover or a restaurant owner, our platform connects you with the best flavors in town.
        </p>
        <p>
          <strong>For Users:</strong> Browse restaurants, explore menus, and place orders with ease.
        </p>
        <p>
          <strong>For Restaurant Owners:</strong> Manage your menu, receive orders, and grow your business online.
        </p>
        <p>
          Where hunger ends, flavor begins!
        </p>
      </div>
    </>
  );
}
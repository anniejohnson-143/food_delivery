import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './UserDashboard.css';
export default function UserDashboard() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate('/');
  };
  return (
    <>
      <nav className="navbar">
        <Link to="/user/dashboard">Dashboard</Link>
        <Link to="/user/orders">My Orders</Link>
        <Link to="/user/restaurants">Restaurants</Link>
        <button onClick={logout}>Logout</button>
      </nav>
      <div className="user-dashboard">
        <h2>Welcome, {localStorage.getItem('name')}</h2>
        <p>Browse restaurants and place your order!</p>
      </div>
    </>
  );
} 
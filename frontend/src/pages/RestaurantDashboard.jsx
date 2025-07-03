import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './RestaurantDashboard.css';
export default function RestaurantDashboard() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate('/');
  };
  return (
    <>
      <nav className="navbar">
        <Link to="/restaurant/dashboard">Dashboard</Link>
        <Link to="/restaurant/add-food">Add Food Items</Link>
        <Link to="/restaurant/orders">View Orders</Link>
        <button onClick={logout}>Logout</button>
      </nav>
      <div className="restaurant-dashboard">
        <h2>Welcome, {localStorage.getItem('name')}</h2>
        <p>Manage your restaurant and orders here.</p>
      </div>
    </>
  );
}
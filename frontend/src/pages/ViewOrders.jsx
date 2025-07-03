import React, { useEffect, useState } from 'react';
import './ViewOrders.css';
export default function ViewOrders() {
  const [orders, setOrders] = useState([]);
  const [restaurantId, setRestaurantId] = useState('');
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/api/restaurant', {
      headers: { 'Authorization': token }
    })
      .then(res => res.json())
      .then(setRestaurants);
  }, []);

  useEffect(() => {
    if (!restaurantId) return;
    const token = localStorage.getItem('token');
    fetch(`http://localhost:5000/api/restaurant/${restaurantId}/orders`, {
      headers: { 'Authorization': token }
    })
      .then(res => res.json())
      .then(setOrders);
  }, [restaurantId]);

  return (
    <div className="vieworders-list">
      <h2>View Orders</h2>
      <select value={restaurantId} onChange={e => setRestaurantId(e.target.value)}>
        <option value="">Select Restaurant</option>
        {restaurants.map(r => (
          <option key={r._id} value={r._id}>{r.name}</option>
        ))}
      </select>
      <ul className="list">
        {orders.map(order => (
          <li key={order._id}>
            <h3>User: {order.user.name}</h3>
            <p>Items: {order.items.map(i => i.name).join(', ')}</p>
            <p>Order Time: {new Date(order.orderTime).toLocaleString()}</p>
            <p>Status: {order.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
} 
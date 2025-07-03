import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './RestaurantList.css';
export default function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/restaurant')
      .then(res => res.json())
      .then(setRestaurants);
  }, []);

  return (
    <div className="restaurant-list">
      <h2>Restaurants</h2>
      <ul className="list">
        {restaurants.map(r => (
          <li key={r._id}>
            <h3>{r.name}</h3>
            <p>{r.location}</p>
            <Link to={`/user/restaurant/${r._id}`}>
              <button>View Menu</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
} 
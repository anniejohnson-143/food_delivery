import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './RestaurantList.css';
export default function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/restaurant')
      .then(async res => {
        setLoading(false);
        if (!res.ok) {
          if (res.status === 401) {
            setError('You must be logged in as a restaurant owner to view this page.');
            return [];
          } else {
            setError('Failed to fetch restaurants.');
            return [];
          }
        }
        const data = await res.json();
        return Array.isArray(data) ? data : [];
      })
      .then(setRestaurants)
      .catch(() => {
        setLoading(false);
        setError('Network error.');
        setRestaurants([]);
      });
  }, []);

  if (loading) return <div className="restaurant-list"><p>Loading...</p></div>;

  return (
    <div className="restaurant-list">
      <h2>Restaurants</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul className="list">
        {restaurants.length === 0 && !error && <li>No restaurants found.</li>}
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
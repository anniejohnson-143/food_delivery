import React, { useState, useEffect } from 'react';
import './AddFoodItem.css';
export default function AddFoodItem() {
  const [form, setForm] = useState({ name: '', price: '', category: '', description: '', image: null, restaurantId: '' });
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const [showCreateRestaurant, setShowCreateRestaurant] = useState(false);
  const [restaurantForm, setRestaurantForm] = useState({ name: '', location: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/api/restaurant', {
      headers: { 'Authorization': token }
    })
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          setForm(f => ({ ...f, restaurantId: data[0]._id }));
        }
        setLoading(false);
      });
  }, []);

  const handleChange = e => {
    const { name, value, files } = e.target;
    setForm(f => ({
      ...f,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    const res = await fetch(`http://localhost:5000/api/restaurant/${form.restaurantId}/food`, {
      method: 'POST',
      headers: { 'Authorization': token },
      body: data
    });
    const result = await res.json();
    setMsg(result.msg);
  };

  // Handle restaurant creation
  const handleRestaurantChange = e => {
    setRestaurantForm(f => ({
      ...f,
      [e.target.name]: e.target.value
    }));
  };

  const handleCreateRestaurant = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5000/api/restaurant/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(restaurantForm)
    });
    const data = await res.json();
    if (res.ok) {
      // After creating, reload to fetch the new restaurant
      window.location.reload();
    } else {
      setMsg(data.msg);
    }
  };

  if (loading) return <div className="container"><p>Loading...</p></div>;
  if (!form.restaurantId) {
    return (
      <div className="addfooditem-container">
        <p>No restaurant found for your account.</p>
        <button onClick={() => setShowCreateRestaurant(true)}>Create Restaurant</button>
        {showCreateRestaurant && (
          <form onSubmit={handleCreateRestaurant}>
            <input name="name" placeholder="Restaurant Name" value={restaurantForm.name} onChange={handleRestaurantChange} required />
            <input name="location" placeholder="Location" value={restaurantForm.location} onChange={handleRestaurantChange} />
            <button type="submit">Create</button>
          </form>
        )}
        {msg && <p>{msg}</p>}
      </div>
    );
  }

  return (
    <div className="addfooditem-container">
      <h2>Add Food Item</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Item Name" value={form.name} onChange={handleChange} required />
        <input name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input name="image" type="file" onChange={handleChange} />
        <button type="submit">Add Item</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}

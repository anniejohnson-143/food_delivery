import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './RestaurantDashboard.css';

export default function RestaurantDashboard() {
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', price: '', description: '' });
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/api/restaurant', {
      headers: { 'Authorization': token }
    })
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          setRestaurant(data[0]);
          fetchMenu(data[0]._id);
        }
        setLoading(false);
      });
  }, []);

  const fetchMenu = (restaurantId) => {
    fetch(`http://localhost:5000/api/restaurant/${restaurantId}/menu`)
      .then(res => res.json())
      .then(items => setFoodItems(items));
  };

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleEditClick = (item) => {
    setEditId(item._id);
    setEditForm({ name: item.name, price: item.price, description: item.description });
    setMsg('');
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(f => ({ ...f, [name]: value }));
  };

  const handleEditSave = async (id) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5000/api/food/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(editForm)
    });
    const data = await res.json();
    if (res.ok) {
      setMsg('Food item updated!');
      setEditId(null);
      fetchMenu(restaurant._id);
    } else {
      setMsg(data.msg || 'Update failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this food item?')) return;
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5000/api/food/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': token }
    });
    const data = await res.json();
    if (res.ok) {
      setMsg('Food item deleted!');
      fetchMenu(restaurant._id);
    } else {
      setMsg(data.msg || 'Delete failed');
    }
  };

  if (loading) return <div className="container"><p>Loading...</p></div>;
  if (!restaurant) {
    return (
      <div className="restaurant-dashboard">
        <nav className="navbar">
          <Link to="/restaurant/dashboard">Dashboard</Link>
          <Link to="/restaurant/add-food">Add Food Items</Link>
          <Link to="/restaurant/orders">View Orders</Link>
          <button onClick={logout}>Logout</button>
        </nav>
        <h2>Welcome, {localStorage.getItem('name')}</h2>
        <p>No restaurant found for your account.</p>
      </div>
    );
  }

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
        <h3>Your Food Items</h3>
        {msg && <p style={{ color: 'green' }}>{msg}</p>}
        {foodItems.length === 0 ? (
          <p>No food items found. Add some from the 'Add Food Items' page.</p>
        ) : (
          <table className="food-items-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Description</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {foodItems.map(item => (
                <tr key={item._id}>
                  {editId === item._id ? (
                    <>
                      <td><input name="name" value={editForm.name} onChange={handleEditChange} /></td>
                      <td><input name="price" value={editForm.price} onChange={handleEditChange} /></td>
                      <td>{item.category}</td>
                      <td><input name="description" value={editForm.description} onChange={handleEditChange} /></td>
                      <td>{item.image && <img src={`http://localhost:5000/${item.image}`} alt={item.name} style={{ width: '60px', height: '40px', objectFit: 'cover' }} />}</td>
                      <td>
                        <button onClick={() => handleEditSave(item._id)}>Save</button>
                        <button onClick={() => setEditId(null)}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.category}</td>
                      <td>{item.description}</td>
                      <td>{item.image && <img src={`http://localhost:5000/${item.image}`} alt={item.name} style={{ width: '60px', height: '40px', objectFit: 'cover' }} />}</td>
                      <td>
                        <button onClick={() => handleEditClick(item)}>Edit</button>
                        <button onClick={() => handleDelete(item._id)} style={{ color: 'red' }}>Delete</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
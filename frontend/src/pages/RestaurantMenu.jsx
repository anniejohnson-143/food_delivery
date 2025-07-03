import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './RestaurantMenu.css';
export default function RestaurantMenu() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [menu, setMenu] = useState([]);
  const [selected, setSelected] = useState({}); // {itemId: quantity}
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/api/restaurant/${id}/menu`)
      .then(res => res.json())
      .then(setMenu);
  }, [id]);

  const handleQuantityChange = (itemId, value) => {
    setSelected(prev => ({
      ...prev,
      [itemId]: Math.max(0, Number(value))
    }));
  };

  const placeOrder = async () => {
    const token = localStorage.getItem('token');
    // Only include items with quantity > 0
    const items = Object.entries(selected)
      .filter(([_, qty]) => qty > 0)
      .flatMap(([itemId, qty]) => Array(qty).fill(itemId));
    if (items.length === 0) return;
    const res = await fetch('http://localhost:5000/api/order/place', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': token },
      body: JSON.stringify({ restaurantId: id, items })
    });
    const data = await res.json();
    if (res.ok) {
      navigate('/cart');
    } else {
      setMsg(data.msg || 'Order failed');
    }
    setSelected({});
  };

  // Calculate total price
  const totalPrice = menu.reduce((sum, item) => {
    const qty = selected[item._id] || 0;
    return sum + qty * (item.price || 0);
  }, 0);

  return (
    <div className="restaurant-menu">
      <h2>Menu</h2>
      <ul className="list">
        {menu.map(item => (
          <li key={item._id}>
            <h3>{item.name} - ${item.price}</h3>
            <p>{item.category} | {item.description}</p>
            {item.image && <img src={`http://localhost:5000/${item.image}`} alt={item.name} width="100" />}
            <div>
              <label>Quantity: </label>
              <input
                type="number"
                min="0"
                value={selected[item._id] || 0}
                onChange={e => handleQuantityChange(item._id, e.target.value)}
                style={{ width: '60px' }}
              />
            </div>
            <div>
              <strong>Item Total: ${((selected[item._id] || 0) * (item.price || 0)).toFixed(2)}</strong>
            </div>
          </li>
        ))}
      </ul>
      <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
      <button onClick={placeOrder} disabled={totalPrice === 0}>Place Order</button>
      {msg && <p>{msg}</p>}
    </div>
  );
}
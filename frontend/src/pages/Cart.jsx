import React from 'react';
import './Cart.css';

export default function Cart() {
  return (
    <div className="cart-success-container">
      <div className="cart-success-card">
        <h2>Order Placed Successfully!</h2>
        <p>Your order is placed successfully and it will be delivered within <strong>30 minutes</strong>.</p>
        <div className="cart-success-icon">🎉</div>
      </div>
    </div>
  );
} 
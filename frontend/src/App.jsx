import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Register from './pages/Register';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import RestaurantList from './pages/RestaurantList';
import RestaurantMenu from './pages/RestaurantMenu';
import MyOrders from './pages/MyOrders';
import RestaurantDashboard from './pages/RestaurantDashboard';
import AddFoodItem from './pages/AddFoodItem';
import ViewOrders from './pages/ViewOrders';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/restaurants" element={<RestaurantList />} />
        <Route path="/user/restaurant/:id" element={<RestaurantMenu />} />
        <Route path="/user/orders" element={<MyOrders />} />
        <Route path="/restaurant/dashboard" element={<RestaurantDashboard />} />
        <Route path="/restaurant/add-food" element={<AddFoodItem />} />
        <Route path="/restaurant/orders" element={<ViewOrders />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App; 
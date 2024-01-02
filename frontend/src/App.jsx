import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "../components/Login";
import Dashboard from "../components/Dashboard";
import ProductDetail from "../components/ProductDetail";
import Order from "../components/Order";
import Transaction from "../components/Transaction";
import Confirmation from "../components/Confirmation";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product/:productId" element={<ProductDetail />} /> 
        <Route path="/order" element={<Order />} /> 
        <Route path="/transaction" element={<Transaction />} /> 
        <Route path="/confirmation" element={<Confirmation />} /> 
      </Routes>
    </Router>
  );
}

const Home = () => {
  return <div>Home Page</div>;
};

export default App;

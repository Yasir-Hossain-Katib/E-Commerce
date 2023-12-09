import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "../components/Login";
import Dashboard from "../components/Dashboard";
import ProductDetail from "../components/ProductDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product/:productId" element={<ProductDetail />} /> 
      </Routes>
    </Router>
  );
}

const Home = () => {
  return <div>Home Page</div>;
};

export default App;

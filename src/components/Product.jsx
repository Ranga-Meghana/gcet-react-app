import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";
import axios from "axios"; 
import '../App.css';
import './Product.css'

export default function Product() {
  const { user, cart, setCart } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const API = import.meta.env.VITE_API_URL;

  const fetchProducts = async () => {
    try {
      console.log(API)
      // const res = await axios.get(`https://gcet-node-app-nine.vercel.app/products`);
      const res = await axios.get(`${API}/products`);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const addToCart = (product) => {
  setCart((prevCart) => {
    const existingIndex = prevCart.findIndex(p => p._id === product._id);
    if (existingIndex !== -1) {
      return prevCart.map((p, i) =>
        i === existingIndex ? { ...p, quantity: (p.quantity || 1) + 1 } : p
      );
    } else {
      return [...prevCart, { ...product, quantity: 1 }];
    }
  });
};

  useEffect(() => {
  if (!user.email) {
    navigate("/login");
    return;
  }
  // ...
}, [user, navigate]);


  return (
    <div className="form-container">
      {user && <h2 className="form-title">Welcome, {user.name}!</h2>}
      <p style={{ color: "#d86c7a" }}>Product List</p><br />

      <div className="product-grid">
  {products.map(product => (
    <div key={product._id} className="product-card">
      <h4>{product.name}</h4>
      <p>${product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  ))}
</div>
    </div>
  );
}
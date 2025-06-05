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
    //   const res = await axios.get(`${API}/products`);
          const res = await axios.get(`https://gcet-node-app-chi.vercel.app/products`)

      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="product-list">
  {products.map(product => (
    <div className="product-card" key={product._id}>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  ))}
</div>

  );
}
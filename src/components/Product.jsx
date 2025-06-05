import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";
import axios from "axios"; 
import '../App.css';


export default function Product() {
  const { user } = useContext(AppContext);

  const [products, setProducts] = useState([]);
   const fetchProducts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/products/all`);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
   
    fetchProducts();
  }, []);

  return (
    <div className="form-container">
      {user && <h2 className="form-title">Welcome, {user.name}!</h2>}
      <p style={{ color: "#d86c7a" }}>Product List</p><br />

      <ul style={{ listStyle: "none", padding: 0 }}>
        {products.map(product => (
          <li key={product.id} style={{ margin: "10px 0" }}>
            <strong>{product.name}</strong>: ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
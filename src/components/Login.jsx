import React, { useState, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const { setUser } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState();
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const handleSubmit = async () => {
    const url = `${API}/login`;
    try {
      const response = await axios.post(url, { email, pass });
      if (response.data.token) {
        setUser(response.data);
        navigate("/");
      } else {
        setMsg("Invalid User or Password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMsg("Something went wrong!");
    }
  };

  return (
    <div style={{ margin: "30px" }}>
      <h3>Login</h3>
      {msg && <p style={{ color: "red" }}>{msg}</p>}
      <p>
        <input
          type="text"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </p>
      <p>
        <input
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
        />
      </p>
      <button onClick={handleSubmit}>Submit</button>
      <p>
        <button onClick={() => navigate("/register")}>Create Account</button>
      </p>
    </div>
  );
}

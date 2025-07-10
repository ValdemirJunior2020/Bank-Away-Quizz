import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/results");
    } catch (error) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Admin Login</h2>
      <form onSubmit={handleLogin} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label>Email</label>
          <input className="form-control" type="email" value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input className="form-control" type="password" value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="btn btn-primary w-100" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

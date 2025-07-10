import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      alert("Logged out");
      navigate("/login");
    });
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#003366" }}>
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="/">QA Training</Link>
        <button
          className="navbar-toggler bg-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">Start</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/leaderboard">Leaderboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/training">Training Guide</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/login">Admin</Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-light btn-sm ms-2" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

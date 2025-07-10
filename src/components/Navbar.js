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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">QA Training</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Start</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/training">Training Guide</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Admin</Link>
          </li>
          <li className="nav-item">
            <button className="btn btn-outline-light btn-sm ms-3" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

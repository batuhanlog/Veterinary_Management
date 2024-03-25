import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Veteriner Yönetim Sistemi
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/doctors">
                Doktorlar
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/customers">
                Müşteriler
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/appointments">
                Randevular
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/animals">
                Hayvanlar
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/vaccines">
                Aşılar
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/available-dates">
                Müsait Günler
              </Link>
            </li>
         
            <li className="nav-item">
              <Link className="nav-link" to="/reports">
                Raporlar
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

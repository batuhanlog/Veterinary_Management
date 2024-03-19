import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-danger">
      <div className="container">
        <Link className="navbar-brand text-body-emphasis" to="/">
          Veteriner Management
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
        <div className="collapse navbar-collapse " id="navbarSupportedContent" >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item ">
              <Link className="nav-link text-light" to="/doctors">
                Doktorlar
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/customers">
                Müşteriler
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/appointments">
                Randevular
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/animals">
                Hayvanlar
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/vaccines">
                Aşılar
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light " to="/available-dates">
                Müsait Günler
              </Link>
            </li>
            {/* Yeni eklenen Raporlar linki */}
            <li className="nav-item">
              <Link className="nav-link text-light" to="/reports">
                Raporlar
              </Link>
            </li>
            {/* Diğer ekstra linkler */}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

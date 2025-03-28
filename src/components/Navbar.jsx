// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SideMenu from "./SideMenu";
import "./Navbar.css";

function Navbar() {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  const toggleSideMenu = () => {
    setSideMenuOpen(!sideMenuOpen);
  };

  useEffect(() => {
    document.body.classList.toggle("no-scroll", sideMenuOpen);
  }, [sideMenuOpen]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light navbar-custom shadow-sm">
        <div className="container d-flex justify-content-between align-items-center">
          {/* Botón hamburguesa */}
          <button className="icon-button" onClick={toggleSideMenu}>
            <i className="fas fa-bars"></i>
            <span className="icon-label">Menú</span>
          </button>

          {/* Logo centrado */}
          <div className="logo-wrapper mx-auto">
            <Link className="navbar-brand nav-logo" to="/">
              <img
                src="/images/cupcakeLogo.png"
                alt="Cupcake Logo"
                className="logo-img"
              />
            </Link>
          </div>

          {/* Carrito */}
          <Link to="/cart" className="icon-button">
            <i className="fas fa-shopping-cart"></i>
            <span className="icon-label">Order Now</span>
          </Link>
        </div>
      </nav>

      <SideMenu isOpen={sideMenuOpen} toggleSideMenu={toggleSideMenu} />
    </>
  );
}

export default Navbar;

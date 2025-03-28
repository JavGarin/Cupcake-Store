// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SideMenu from "./SideMenu";
import "./Navbar.css";

function Navbar() {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  const toggleSideMenu = () => {
    setSideMenuOpen(!sideMenuOpen);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light navbar-custom">
        <div className="container">
          {/* Botón de menú hamburguesa */}
          <button className="nav-button" onClick={toggleSideMenu}>
            <i className="fas fa-bars">Menú</i>
          </button>

          {/* Logo en el centro */}
          <div className="mx-auto">
            <Link className="navbar-brand nav-logo" to="/">
              <img
                src="/images/cupcakeLogo.png"
                alt="Cupcake Logo"
                className="logo-img"
              />
            </Link>
          </div>

          {/* Botón del carrito a la derecha */}
          <div>
            <Link to="/cart" className="nav-button">
              <i className="fas fa-shopping-cart">Order Now</i>
            </Link>
          </div>
        </div>
      </nav>

      {/* Menú lateral */}
      {sideMenuOpen && <SideMenu toggleSideMenu={toggleSideMenu} />}
    </>
  );
}

export default Navbar;

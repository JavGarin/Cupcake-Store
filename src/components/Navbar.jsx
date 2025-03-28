// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SideMenu from './SideMenu';
import './Navbar.css'; // Puedes crear un archivo de estilos específico para el Navbar

function Navbar() {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  const toggleSideMenu = () => {
    setSideMenuOpen(!sideMenuOpen);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          {/* Botón de menú hamburguesa */}
          <button className="btn btn-outline-secondary" onClick={toggleSideMenu}>
            <i className="fas fa-bars"></i>
          </button>
          
          {/* Logo en el centro */}
          <div className="mx-auto">
            <Link className="navbar-brand" to="/">Cupcake Store</Link>
          </div>
          
          {/* Botón del carrito a la derecha */}
          <div>
            <Link to="/cart" className="btn btn-outline-secondary">
              <i className="fas fa-shopping-cart"></i>
            </Link>
          </div>
        </div>
      </nav>
      
      {/* Renderiza el menú lateral si está activo */}
      {sideMenuOpen && <SideMenu toggleSideMenu={toggleSideMenu} />}
    </>
  );
}

export default Navbar;

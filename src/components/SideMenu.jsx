// src/components/SideMenu.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './SideMenu.css'; // Archivo para estilos específicos del menú lateral

function SideMenu({ toggleSideMenu }) {
  return (
    <div className="sidemenu-overlay" onClick={toggleSideMenu}>
      <div className="sidemenu bg-light" onClick={(e) => e.stopPropagation()}>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <Link to="/" onClick={toggleSideMenu}>Home</Link>
          </li>
          <li className="list-group-item">
            <Link to="/register" onClick={toggleSideMenu}>Registrarse</Link>
          </li>
          <li className="list-group-item">
            <Link to="/login" onClick={toggleSideMenu}>Login</Link>
          </li>
          <li className="list-group-item">
            <Link to="/products" onClick={toggleSideMenu}>Productos</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideMenu;

import React from 'react';
import { Link } from 'react-router-dom';
import './SideMenu.css';

function SideMenu({ isOpen, toggleSideMenu }) {
  return (
    <div
      className={`sidemenu-overlay ${isOpen ? '' : 'hidden'}`}
      onClick={toggleSideMenu}
    >
      <div
        className={`sidemenu ${isOpen ? 'open' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón de cerrar */}
        <button className="close-btn" onClick={toggleSideMenu}>
          &times;
        </button>

        <ul>
          <li>
            <Link to="/" onClick={toggleSideMenu}>Home</Link>
          </li>
          <li>
            <Link to="/register" onClick={toggleSideMenu}>Registrarse</Link>
          </li>
          <li>
            <Link to="/login" onClick={toggleSideMenu}>Login</Link>
          </li>
          <li>
            <Link to="/products" onClick={toggleSideMenu}>Productos</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideMenu;

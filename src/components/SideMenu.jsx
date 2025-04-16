import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './SideMenu.css';

function SideMenu({ isOpen, toggleSideMenu }) {
  const { user, logout } = useContext(UserContext);

  return (
    <div
      className={`sidemenu-overlay ${isOpen ? '' : 'hidden'}`}
      onClick={toggleSideMenu}
    >
      <div
        className={`sidemenu ${isOpen ? 'open' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >

        <button className="close-btn" onClick={toggleSideMenu}>
          &times;
        </button>

        <ul>
          <li>
            <Link to="/" onClick={toggleSideMenu}>Home</Link>
          </li>

          {!user && (
            <>
              <li>
                <Link to="/register" onClick={toggleSideMenu}>Registrarse</Link>
              </li>
              <li>
                <Link to="/login" onClick={toggleSideMenu}>Iniciar sesión</Link>
              </li>
            </>
          )}

          <li>
            <Link to="/products" onClick={toggleSideMenu}>Productos</Link>
          </li>

          {user && (
            <li>
              <button
                onClick={() => {
                  logout();
                  toggleSideMenu();
                }}
                className="logout-btn"
              >
                Cerrar sesión
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default SideMenu;

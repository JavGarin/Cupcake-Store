import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; // importar el contexto
import './SideMenu.css';

function SideMenu({ isOpen, toggleSideMenu }) {
  const { user, logout } = useContext(UserContext); // obtener usuario y función logout

  const handleLogout = () => {
    logout(); // ejecutamos logout
    toggleSideMenu(); // cerramos el menú
  };

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
          {!user && (
            <>
              <li>
                <Link to="/register" onClick={toggleSideMenu}>Registrarse</Link>
              </li>
              <li>
                <Link to="/login" onClick={toggleSideMenu}>Iniciar Sesión</Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <button className="logout-btn" onClick={handleLogout}>
                  Cerrar Sesión
                </button>
              </li>
            </>
          )}
          <li>
            <Link to="/products" onClick={toggleSideMenu}>Productos</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideMenu;

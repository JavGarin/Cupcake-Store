import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import SideMenu from "./SideMenu";
import "./Navbar.css";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext"; // 👈 Importamos el contexto del carrito

function Navbar() {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useContext(UserContext);
  const { cart } = useContext(CartContext); // 👈 Obtenemos el carrito desde el contexto
  const navigate = useNavigate();

  const toggleSideMenu = () => {
    setSideMenuOpen(!sideMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", sideMenuOpen);
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [sideMenuOpen]);

  // 👇 Calculamos la cantidad total de productos
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <nav className={`navbar-custom ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-container">

          {/* Botón del menú lateral */}
          <button className="icon-button menu-button" onClick={toggleSideMenu} aria-label="Toggle menu">
            <i className="fas fa-bars"></i>
            <span className="icon-label">MENU</span>
          </button>

          {/* Logo */}
          <div className="logo-wrapper">
            <Link className="navbar-brand" to="/">
              <img
                src="/images/cupcakeLogo.png"
                alt="Cupcake Logo"
                className="logo-img"
                loading="lazy"
              />
            </Link>
          </div>

          {/* Sección derecha */}
          <div className="d-flex align-items-center gap-2">

            {isAuthenticated && (
              <div className="dropdown">
                <button
                  className="icon-button dropdown-toggle"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  👋 {user?.email}
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                  <li>
                    <Link className="dropdown-item" to="/profile">Perfil</Link>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>Cerrar sesión</button>
                  </li>
                </ul>
              </div>
            )}

            {/* Botón del carrito con contador */}
            <Link to="/cart" className="icon-button cart-button position-relative" aria-label="Cart">
              <i className="fas fa-shopping-cart"></i>
              {totalItems > 0 && (
                <span className="cart-count-badge">{totalItems}</span>
              )}
              <span className="icon-label">ORDENA</span>
            </Link>
          </div>
        </div>
      </nav>

      <SideMenu isOpen={sideMenuOpen} toggleSideMenu={toggleSideMenu} />
    </>
  );
}

export default Navbar;

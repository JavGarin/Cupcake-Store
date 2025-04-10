// src/components/Navbar.jsx
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import SideMenu from "./SideMenu";
import CartSidebar from "./CartSidebar";
import "./Navbar.css";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify"; // Asegúrate de tener toast para notificaciones

function Navbar() {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useContext(UserContext); // Usamos UserContext
  const { cart, toggleCartSidebar, isCartSidebarOpen } = useContext(CartContext); // Usamos CartContext
  const navigate = useNavigate();

  const toggleSideMenu = () => {
    setSideMenuOpen(!sideMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Verificamos si hay scroll en la página
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Controlamos el estado de la clase no-scroll
  useEffect(() => {
    document.body.classList.toggle("no-scroll", sideMenuOpen || isCartSidebarOpen);
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [sideMenuOpen, isCartSidebarOpen]);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleCartClick = () => {
    if (!isAuthenticated) {
      // Si el usuario no está logueado, redirigir al login
      toast.info("Por favor, inicia sesión para ver tu carrito.");
      navigate("/login");
    } else {
      // Si el usuario está logueado, desplegar el carrito
      toggleCartSidebar();
    }
  };

  return (
    <>
      <nav className={`navbar-custom ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-container">
          {/* Menú lateral izquierdo */}
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

          {/* Controles a la derecha */}
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

            {/* Botón carrito -> redirige o despliega dependiendo del estado de autenticación */}
            <button
              className="icon-button cart-button position-relative"
              onClick={handleCartClick} // Modificado para manejar el estado de autenticación
              aria-label="Cart"
            >
              <i className="fas fa-shopping-cart"></i>
              {totalItems > 0 && <span className="cart-count-badge">{totalItems}</span>}
              <span className="icon-label">ORDENA</span>
            </button>
          </div>
        </div>
      </nav>

      <SideMenu isOpen={sideMenuOpen} toggleSideMenu={toggleSideMenu} />
      <CartSidebar /> {/* El carrito ya está desplegable al hacer clic si el usuario está logueado */}
    </>
  );
}

export default Navbar;

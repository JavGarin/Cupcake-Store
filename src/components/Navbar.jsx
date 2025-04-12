// src/components/Navbar.jsx
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import SideMenu from "./SideMenu";
import CartSidebar from "./CartSidebar";
import "./Navbar.css";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";
import { toast, ToastContainer } from "react-toastify"; // ✅ Importamos aquí también
import 'react-toastify/dist/ReactToastify.css';

function Navbar() {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useContext(UserContext);
  const { cart, toggleCartSidebar, isCartSidebarOpen } = useContext(CartContext);
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
    document.body.classList.toggle("no-scroll", sideMenuOpen || isCartSidebarOpen);
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [sideMenuOpen, isCartSidebarOpen]);

  const totalItems = Array.isArray(cart)
    ? cart.reduce((acc, item) => acc + item.quantity, 0)
    : 0;

  const handleCartClick = () => {
    if (!isAuthenticated) {
      toast.info("Por favor, inicia sesión para ver tu carrito.");
      navigate("/login");
    } else {
      toggleCartSidebar();
    }
  };

  return (
    <>
      <nav className={`navbar-custom ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-container">
          <button className="icon-button menu-button" onClick={toggleSideMenu} aria-label="Toggle menu">
            <i className="fas fa-bars"></i>
            <span className="icon-label">MENU</span>
          </button>

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

            <button
              className="icon-button cart-button position-relative"
              onClick={handleCartClick}
              aria-label="Cart"
            >
              <i className="fas fa-shopping-cart"></i>
              {totalItems > 0 && <span className="cart-count-badge">{totalItems}</span>}
              <span className="icon-label"></span>
            </button>
          </div>
        </div>
      </nav>

      <SideMenu isOpen={sideMenuOpen} toggleSideMenu={toggleSideMenu} />
      <CartSidebar />

      {/* ✅ ToastContainer al final, con z-index alto */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 11000 }}
      />
    </>
  );
}

export default Navbar;

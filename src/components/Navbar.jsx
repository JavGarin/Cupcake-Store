import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useCart } from "../context/CartContext";
import SideMenu from "./SideMenu";
import "./Navbar.css";

function Navbar() {
  const { user } = useContext(UserContext);
  const { cartItems } = useCart();
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const toggleSideMenu = () => {
    setSideMenuOpen(!sideMenuOpen);
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleCartClick = () => {
    navigate("/cart");
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

          <div className="user-info-cart">
            {user && (
              <span className="username-display">
                ¡Hola, {user.username}!
              </span>
            )}
            <button className="icon-button cart-button" onClick={handleCartClick} aria-label="Cart">
              <i className="fas fa-shopping-cart"></i>
              <span className="icon-label">ORDENA</span>
              {totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <SideMenu isOpen={sideMenuOpen} toggleSideMenu={toggleSideMenu} />
    </>
  );
}

export default Navbar;

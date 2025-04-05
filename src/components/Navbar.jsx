import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SideMenu from "./SideMenu";
import "./Navbar.css";

function Navbar() {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleSideMenu = () => {
    setSideMenuOpen(!sideMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", sideMenuOpen);
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [sideMenuOpen]);

  return (
    <>
      <nav className={`navbar-custom ${scrolled ? 'scrolled' : ''}`}>
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

          <Link to="/cart" className="icon-button cart-button" aria-label="Cart">
            <i className="fas fa-shopping-cart"></i>
            <span className="icon-label">ORDENA</span>
          </Link>
        </div>
      </nav>

      <SideMenu isOpen={sideMenuOpen} toggleSideMenu={toggleSideMenu} />
    </>
  );
}

export default Navbar;
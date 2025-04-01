import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SideMenu from "./SideMenu";
import "./Navbar.css";

function Navbar() {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const toggleSideMenu = () => {
    setSideMenuOpen(!sideMenuOpen);
  };

  useEffect(() => {
    document.body.classList.toggle("no-scroll", sideMenuOpen);
  }, [sideMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [scrolled]);

  return (
    <>
      <nav className={`navbar navbar-expand-lg navbar-light navbar-custom ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container d-flex justify-content-between align-items-center">
          {/* Botón hamburguesa - Texto "MENÚ" visible en desktop */}
          <button className="icon-button menu-button" onClick={toggleSideMenu}>
            <i className="fas fa-bars"></i>
            <span className="icon-label">MENU</span>
          </button>

          {/* Logo centrado */}
          <div className="logo-wrapper mx-auto">
            <Link className="navbar-brand nav-logo" to="/">
              <img
                src="/images/cupcakeLogo.png"
                alt="Cupcake Logo"
                className="logo-img"
              />
            </Link>
          </div>

          {/* Carrito */}
          <Link to="/cart" className="icon-button cart-button">
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
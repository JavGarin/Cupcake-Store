// src/components/Footer.jsx
import React from 'react';
import './Footer.css'; // Opcional: crea este archivo para estilos específicos

function Footer() {
  return (
    <footer className="footer bg-light py-3 mt-4">
      <div className="container text-center">
        <p>&copy; {new Date().getFullYear()} Cupcake Store. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;

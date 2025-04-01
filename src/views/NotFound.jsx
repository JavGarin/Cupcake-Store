import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="error-image">
          <img 
            src="/images/cupcake404.png" 
            alt="Error 404 - Página no encontrada" 
          />
        </div>
        <h1 className="error-title">¡Ups! Cupcake no encontrado</h1>
        <p className="error-message">
          La página que buscas se ha esfumado como el azúcar glas al viento.
        </p>
        <Link to="/" className="home-button">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
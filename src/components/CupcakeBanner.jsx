// src/components/CupcakeBanner.js
import React from 'react';
import './CupcakeBanner.css';

const CupcakeBanner = () => {
  return (
    <div className="banner-wrapper">
      {/* Fondo independiente */}
      <div className="banner-bg"></div>

      {/* Contenedor del contenido en dos columnas */}
      <div className="banner-content">
        {/* Columna izquierda: imagen */}
        <div className="image-container">
          <img
            src="/images/cupcakeA.png"
            alt="Delicious Cupcake"
            className="cupcake-image"
          />
        </div>
        {/* Columna derecha: texto y botones */}
        <div className="text-container">
          <h2>Delicious Cupcake</h2>
          <p>
            Experience a mouthwatering cupcake topped with sweet frosting and a sprinkle of fun.
            Perfect for satisfying your sweet tooth!
          </p>
          <div className="buttons">
            <button className="btn see-more">See More</button>
            <button className="btn order-now">Order Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CupcakeBanner;

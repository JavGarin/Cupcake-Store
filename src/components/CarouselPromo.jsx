// src/components/CarouselPromo.jsx
import React from 'react';
import './CarouselPromo.css';

function CarouselPromo() {
  return (
    <div id="promoCarousel" className="carousel slide mb-4" data-bs-ride="carousel">
      <div className="carousel-inner">
        {/* Slide 1 */}
        <div className="carousel-item active">
          <video
            className="d-block w-100"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/images/cupcakePromoA.mp4" type="video/mp4" />
            Tu navegador no soporta el video.
          </video>
          <div className="carousel-caption d-none d-md-block">
            <h5>Promoción 1</h5>
            <p>¡Cupcakes irresistibles esta semana!</p>
            <a className="btn btn-primary" href="/products">Comprar ahora</a>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="carousel-item">
          <video
            className="d-block w-100"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/images/cupcakePromoB.mp4" type="video/mp4" />
            Tu navegador no soporta el video.
          </video>
          <div className="carousel-caption d-none d-md-block">
            <h5>Promoción 2</h5>
            <p>¡Oferta exclusiva!</p>
            <a className="btn btn-primary" href="/products">Comprar ahora</a>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="carousel-item">
          <video
            className="d-block w-100"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/images/cupcakePromoA.mp4" type="video/mp4" />
            Tu navegador no soporta el video.
          </video>
          <div className="carousel-caption d-none d-md-block">
            <h5>Promoción 3</h5>
            <p>¡No te lo pierdas!</p>
            <a className="btn btn-primary" href="/products">Comprar ahora</a>
          </div>
        </div>
      </div>

      {/* Controles del carrusel */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#promoCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#promoCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
}

export default CarouselPromo;

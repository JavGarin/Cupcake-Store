import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './CarouselPromo.css';

const CarouselPromo = () => {
  const carouselItems = [
    {
      id: 1,
      video: "/images/cupcakePromoA.mp4",
      title: "Mas Tuki que nunca!",
      description: "¡Nueva receta, nuevos sabores!",
      ctaText: "Comprar ahora",
      ctaLink: "/products"
    },
    {
      id: 2,
      video: "/images/cupcakePromoB.mp4",
      title: "Variedades de top con galletas",
      description: "¡Pruebalos!",
      ctaText: "Comprar ahora",
      ctaLink: "/products"
    },
    {
      id: 3,
      video: "/images/cupcakePromoC.mp4",
      title: "Vuelven los Donkeys",
      description: "¡Monkey week! No te lo pierdas!",
      ctaText: "Comprar ahora",
      ctaLink: "/products"
    }
  ];

  useEffect(() => {
    const carousel = document.querySelector('#promoCarousel');
    if (carousel && window.bootstrap) {
      new window.bootstrap.Carousel(carousel, {
        interval: 5000,
        ride: 'carousel',
        pause: false,
        wrap: true
      });
    }
  }, []);

  return (
    <section
      id="promoCarousel"
      className="carousel slide"
      aria-label="Carrusel promocional"
    >
      <div className="carousel-inner">
        {carouselItems.map((item, index) => (
          <div
            key={item.id}
            className={`carousel-item ${index === 0 ? 'active' : ''}`}
            aria-label={`Diapositiva ${index + 1}: ${item.title}`}
          >
            <video
              className="d-block w-100"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={item.video} type="video/mp4" />
              Tu navegador no soporta video HTML5.
            </video>
            <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 p-3 rounded">
              <h5 className="text-white">{item.title}</h5>
              <p className="text-light">{item.description}</p>
              <Link className="btn btn-primary btn-sm" to={item.ctaLink}>
                {item.ctaText}
              </Link>
            </div>
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#promoCarousel"
        data-bs-slide="prev"
        aria-label="Diapositiva anterior"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#promoCarousel"
        data-bs-slide="next"
        aria-label="Diapositiva siguiente"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
      </button>
    </section>
  );
};

export default CarouselPromo;

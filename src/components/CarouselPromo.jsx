import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CarouselPromo.css';

const CarouselPromo = () => {
  useEffect(() => {
    // Función para ajustes dinámicos
    const adjustLayout = () => {
      const navbar = document.querySelector('.navbar-custom');
      const navbarHeight = navbar?.offsetHeight || 80;
      
      // Aplicar altura del navbar como variable CSS
      document.documentElement.style.setProperty('--navbar-height', `${navbarHeight}px`);
      
      // Ajustes adicionales para el carrusel
      const carousel = document.getElementById('promoCarousel');
      if (carousel) {
        carousel.style.marginTop = `-${navbarHeight}px`;
        carousel.style.height = `calc(100vh + ${navbarHeight}px)`;
      }
    };

    // Inicializar Bootstrap Carousel
    const initCarousel = () => {
      if (typeof window.bootstrap?.Carousel === 'function') {
        new window.bootstrap.Carousel('#promoCarousel', {
          interval: 5000,
          ride: 'carousel',
          wrap: true
        });
      }
    };

    // Ejecutar al montar
    adjustLayout();
    initCarousel();
    
    // Configurar event listeners
    window.addEventListener('resize', adjustLayout);
    window.addEventListener('orientationchange', adjustLayout);
    
    return () => {
      window.removeEventListener('resize', adjustLayout);
      window.removeEventListener('orientationchange', adjustLayout);
    };
  }, []);

  const carouselItems = [
    {
      id: 1,
      video: "/images/cupcakePromoA.mp4",
      title: "Promoción Especial",
      description: "¡Los cupcakes más deliciosos de la temporada!",
      ctaText: "Ordena ahora",
      ctaLink: "/products"
    },
    {
      id: 2,
      video: "/images/cupcakePromoB.mp4",
      title: "Oferta Exclusiva",
      description: "¡No te pierdas nuestras promociones!",
      ctaText: "Ver productos",
      ctaLink: "/products"
    }
  ];

  return (
    <section 
      id="promoCarousel" 
      className="carousel slide carousel-fade" 
      data-bs-ride="carousel"
      aria-label="Carrusel promocional"
    >
      <div className="carousel-inner">
        {carouselItems.map((item, index) => (
          <article 
            key={item.id} 
            className={`carousel-item ${index === 0 ? 'active' : ''}`}
            aria-label={`Diapositiva ${index + 1}: ${item.title}`}
          >
            <div className="video-container">
              <video 
                className="promo-video" 
                autoPlay 
                muted 
                loop 
                playsInline
                aria-hidden="true"
                tabIndex="-1"
                disablePictureInPicture
              >
                <source src={item.video} type="video/mp4" />
                Tu navegador no soporta videos HTML5
              </video>
            </div>
            
            <div className="carousel-caption">
              <h2 className="display-5 fw-bold mb-3">{item.title}</h2>
              <p className="lead mb-4">{item.description}</p>
              <Link 
                to={item.ctaLink} 
                className="btn btn-primary btn-lg px-4 py-2"
                aria-label={item.ctaText}
              >
                {item.ctaText}
              </Link>
            </div>
          </article>
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
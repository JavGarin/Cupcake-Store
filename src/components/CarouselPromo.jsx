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
      title: "1 Tuki de regalo!",
      description: "¡Comprando 2 cupcakes de la semana!",
      ctaText: "Comprar ahora",
      ctaLink: "/products"
    },
    {
      id: 2,
      video: "/images/cupcakePromoB.mp4",
      title: "Promoción 2",
      description: "¡Oferta exclusiva!",
      ctaText: "Comprar ahora",
      ctaLink: "/products"
    },
    {
      id: 3,
      video: "/images/cupcakePromoC.mp4",
      title: "2 Donkeys al precio de 1",
      description: "¡Monkey day! No te lo pierdas!",
      ctaText: "Comprar ahora",
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
              Tu navegador no soporta el video.
            </video>
            <div className="carousel-caption d-none d-md-block">
              <h5>{item.title}</h5>
              <p>{item.description}</p>
              <Link className="btn btn-primary" to={item.ctaLink}>
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
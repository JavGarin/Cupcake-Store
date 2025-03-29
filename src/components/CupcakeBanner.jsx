// src/components/CupcakeBanner.jsx
import React from 'react';
import './CupcakeBanner.css';

const CupcakeBanner = ({ data }) => {
  if (!data) return null;

  const { name, description, price, image, rating } = data;

  // Genera las estrellas
  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - filledStars - (halfStar ? 1 : 0);

    const stars = [];

    for (let i = 0; i < filledStars; i++) {
      stars.push(<i key={`filled-${i}`} className="fas fa-star"></i>);
    }

    if (halfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }

    return stars;
  };

  return (
    <div className="banner-wrapper">
      <div className="banner-bg"></div>

      <div className="banner-content">
        {/* Imagen */}
        <div className="image-container">
          <img src={image} alt={name} className="cupcake-image" />
        </div>

        {/* Texto y botones */}
        <div className="text-container">
          <h2>{name}</h2>
          <div className="rating-stars">{renderStars(rating)}</div>
          <p>{description}</p>
          <div className="buttons">
            <button className="btn see-more">See More</button>
            <button className="btn order-now">Order Now - ${price}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CupcakeBanner;

import React, { useContext } from 'react';
import './CupcakeBanner.css';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';

const CupcakeBanner = ({ data, index = 0 }) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { isAuthenticated } = useContext(UserContext);

  if (!data) return null;

  const { id, name, description, price, image, rating, bgColor } = data;
  const isEven = index % 2 === 0;

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

  const handleViewMore = () => {
    navigate(`/product/${id}`);
  };

  const handleOrderNow = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      addToCart(data);
      navigate('/cart');
    }
  };

  return (
    <div
      className="banner-wrapper"
      style={{ '--bgColor': bgColor || '#fff' }}
    >
      <div className="banner-bg"></div>

      <div
        className="banner-content"
        style={{ flexDirection: isEven ? 'row' : 'row-reverse' }}
      >
        <div className="image-container">
          <img src={image} alt={name} className="cupcake-image" />
        </div>

        <div className="text-container">
          <h2>{name}</h2>
          <div className="rating-stars">{renderStars(rating)}</div>
          <p>{description}</p>
          <div className="buttons">
            <button className="btn see-more" onClick={handleViewMore}>Ver más</button>
            <button className="btn order-now" onClick={handleOrderNow}>Ordena ahora - ${price}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CupcakeBanner;

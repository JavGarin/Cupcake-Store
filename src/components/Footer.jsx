import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCcVisa, 
  faCcMastercard, 
  faCcPaypal,
  faInstagram,
  faFacebook,
  faTiktok,
  faPinterest,
  faGithub
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        <div className="footer-top">

          <div className="footer-section contact-info">
            <h3 className="section-title">Contacto</h3>
            <div className="contact-item">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
              <a href="https://maps.app.goo.gl/Wzs4DboiKuGzdBLu9" target='_blank' rel="noopener noreferrer">
                <span>Av. Dulce 123, Santiago</span>
              </a>
            </div>
            <div className="contact-item">
              <FontAwesomeIcon icon={faPhone} className="icon" />
              <a href="tel:+56912345678" className="clickable-contact">
                <span>+56 9 1234 5678</span>
              </a>
            </div>
            <div className="contact-item">
              <FontAwesomeIcon icon={faEnvelope} className="icon" />
              <a href="mailto:hola@cupcakestore.cl" className="clickable-contact">
                <span>hola@cupcakestore.cl</span>
              </a>
            </div>
          </div>

          <div className="footer-section hours">
            <h3 className="section-title">Horario</h3>
            <div className="hours-item">
              <span>Lunes-Viernes:</span>
              <span>9:00 - 20:00</span>
            </div>
            <div className="hours-item">
              <span>Sábado:</span>
              <span>10:00 - 18:00</span>
            </div>
            <div className="hours-item">
              <span>Domingo:</span>
              <span>11:00 - 16:00</span>
            </div>
          </div>

          <div className="footer-section social-media">
            <h3 className="section-title">Síguenos</h3>
            <div className="social-icons">
              <a href="#" className="social-icon facebook">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="#" className="social-icon instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" className="social-icon tiktok">
                <FontAwesomeIcon icon={faTiktok} />
              </a>
              <a href="#" className="social-icon pinterest">
                <FontAwesomeIcon icon={faPinterest} />
              </a>
            </div>
          </div>
        </div>

        <div className="divider"></div>

        <div className="footer-bottom">

          <div className="branding">
            <img src="/images/cupcakeLogo.png" alt="Cupcake Store" className="logo" />
            <span className="brand-name">Cupcake Store</span>
          </div>

          <div className="quick-links">
            <a href="#">Términos</a>
            <a href="#">Privacidad</a>
            <a href="#">FAQ</a>
          </div>

          <div className="payment-section">
            <div className="payment-methods">
              <FontAwesomeIcon icon={faCcVisa} className="payment-icon" />
              <FontAwesomeIcon icon={faCcMastercard} className="payment-icon" />
              <FontAwesomeIcon icon={faCcPaypal} className="payment-icon" />
            </div>
            <a href="https://github.com/JavGarin/Cupcake-Store" target="_blank" className="github-link">
              <FontAwesomeIcon icon={faGithub} />
              <span>Ver código</span>
            </a>
          </div>
        </div>

        <div className="copyright">
          &copy; {new Date().getFullYear()} Cupcake Store. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
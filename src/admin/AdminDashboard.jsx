import React, { useContext, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { FaStore, FaBoxOpen, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user, logout, isAdmin } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Verificación de permisos
  useEffect(() => {
    if (!isAdmin()) {
      navigate('/admin', { replace: true });
    }
  }, [isAdmin, navigate]);

  // Si no es admin, no renderizar nada
  if (!isAdmin()) return null;

  // Función para determinar si el enlace está activo
  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-profile">
          <div className="profile-icon">
            <FaUserCircle size={40} />
          </div>
          <div className="profile-info">
            <h4>{user?.name || 'Administrador'}</h4>
            <p>{user?.email}</p>
          </div>
        </div>
        
        <nav className="admin-nav">
          <Link 
            to="products" 
            className={`nav-link ${isActive('products') ? 'active' : ''}`}
          >
            <FaBoxOpen className="nav-icon" />
            <span>Gestión de Cupcakes</span>
          </Link>
          
          <Link 
            to="/" 
            className="nav-link store-front"
          >
            <FaStore className="nav-icon" />
            <span>Ver Tienda</span>
          </Link>
        </nav>
        
        <button onClick={logout} className="logout-btn">
          <FaSignOutAlt className="logout-icon" />
          <span>Cerrar sesión</span>
        </button>
      </aside>
      
      <main className="admin-content">
        <div className="content-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './AdminLogin.css';

const AdminLogin = () => {
  const { 
    email, 
    setEmail, 
    password, 
    setPassword, 
    handleSubmit, 
    loading, 
    error,
    isAdmin
  } = useContext(UserContext);
  const navigate = useNavigate();
  const [localError, setLocalError] = useState('');

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      await handleSubmit(e);
      if (isAdmin()) {
        navigate('/admin/dashboard');
      } else {
        setLocalError('Acceso solo para administradores');
      }
    } catch (err) {
      setLocalError(err.message);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <h2>Panel Administrativo</h2>
        <form onSubmit={handleAdminLogin}>
          {error && <div className="alert alert-danger">{error}</div>}
          {localError && <div className="alert alert-danger">{localError}</div>}
          
          <div className="form-group">
            <label>Email Administrador</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          
          <button type="submit" disabled={loading}>
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
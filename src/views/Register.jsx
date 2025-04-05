import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './Auth.css';

const Register = () => {
  const { 
    username, 
    setUsername,
    email, 
    setEmail, 
    password, 
    setPassword, 
    handleRegister, 
    loading, 
    error 
  } = useContext(UserContext);
  
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState('');
  
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');
    
    if (password !== confirmPassword) {
      setValidationError('Las contraseñas no coinciden');
      return;
    }
    
    if (password.length < 6) {
      setValidationError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    handleRegister(e);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Registro</h2>
        <p className="auth-subtitle">Crea una cuenta para comenzar</p>
        
        {error && <div className="alert alert-danger">{error}</div>}
        {validationError && <div className="alert alert-warning">{validationError}</div>}
        
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label>Nombre de usuario</label>
            <input
              type="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="5"
              disabled={loading}
            />
            <small className="form-text">Mínimo 5 caracteres</small>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
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
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
              disabled={loading}
            />
            <small className="form-text">Mínimo 6 caracteres</small>
          </div>
          
          <div className="form-group">
            <label>Confirmar Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          
          <button 
            type="submit" 
            className="auth-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Registrando...
              </>
            ) : (
              "Registrarse"
            )}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
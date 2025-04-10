import { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './Auth.css';

const Login = () => {
  const { 
    handleLogin,
    loading,
    error,
    clearError // Cambiamos setError por clearError
  } = useContext(UserContext);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [touched, setTouched] = useState({
    email: false,
    password: false
  });
  
  const navigate = useNavigate();

  // Limpiar errores cuando se cambian los campos
  useEffect(() => {
    clearError(); // Usamos clearError en lugar de setError
  }, [formData.email, formData.password, clearError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Marcar campo como "touched"
    if (!touched[name]) {
      setTouched(prev => ({
        ...prev,
        [name]: true
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica del formulario
    if (!formData.email || !formData.password) {
      return;
    }
    
    try {
      const result = await handleLogin(formData);
      
      if (result?.success) {
        navigate('/', { replace: true });
      }
    } catch (err) {
      // El error ya está manejado por el UserContext
      console.error('Login error:', err);
    }
  };

  // Función para determinar si un campo tiene error
  const hasError = (field) => {
    return touched[field] && !formData[field];
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Iniciar Sesión</h2>
        <p className="auth-subtitle">Ingresa a tu cuenta para continuar</p>
        
        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} noValidate>
          <div className={`form-group ${hasError('email') ? 'has-error' : ''}`}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
              required
              disabled={loading}
              autoComplete="username"
            />
            {hasError('email') && (
              <small className="form-error">El email es requerido</small>
            )}
          </div>
          
          <div className={`form-group ${hasError('password') ? 'has-error' : ''}`}>
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
              required
              disabled={loading}
              autoComplete="current-password"
            />
            {hasError('password') && (
              <small className="form-error">La contraseña es requerida</small>
            )}
          </div>
          
          <button 
            type="submit" 
            className="auth-btn"
            disabled={loading || !formData.email || !formData.password}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Iniciando sesión...
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>¿No tienes una cuenta? <Link to="/register">Regístrate</Link></p>
          <p><Link to="/forgot-password">¿Olvidaste tu contraseña?</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
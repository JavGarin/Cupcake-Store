import { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './Auth.css';

const Register = () => {
  const { 
    handleRegister,
    loading,
    error,
    clearError 
  } = useContext(UserContext);
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [validationError, setValidationError] = useState('');
  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    clearError();
    setValidationError('');
  }, [formData.username, formData.email, formData.password, formData.confirmPassword, clearError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (!touched[name]) {
      setTouched(prev => ({
        ...prev,
        [name]: true
      }));
    }
  };

  const validateForm = () => {
    if (!formData.username.trim()) {
      setValidationError('El nombre de usuario es obligatorio');
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setValidationError('Por favor ingresa un email válido');
      return false;
    }

    if (formData.password.length < 6) {
      setValidationError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setValidationError('Las contraseñas no coinciden');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({
      username: true,
      email: true,
      password: true,
      confirmPassword: true
    });

    if (!validateForm()) return;

    try {
      const result = await handleRegister({ 
        username: formData.username,
        email: formData.email, 
        password: formData.password 
      });

      if (result.success) {
        navigate('/', { 
          state: { message: '¡Registro exitoso! Bienvenido.' },
          replace: true 
        });
      }
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  const hasError = (field) => {
    return touched[field] && (
      (field === 'username' && !formData.username.trim()) ||
      (field === 'email' && !/^\S+@\S+\.\S+$/.test(formData.email)) ||
      (field === 'password' && formData.password.length < 6) ||
      (field === 'confirmPassword' && formData.password !== formData.confirmPassword)
    );
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Registro</h2>
        <p className="auth-subtitle">Crea una cuenta para comenzar</p>

        {(error || validationError) && (
          <div className={`alert ${error ? 'alert-danger' : 'alert-warning'}`}>
            {error || validationError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Username */}
          <div className={`form-group ${hasError('username') ? 'has-error' : ''}`}>
            <label htmlFor="username">Nombre de usuario</label>
            <input
              id="username"
              type="text"
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
              onBlur={() => setTouched(prev => ({ ...prev, username: true }))}
              required
              disabled={loading}
              autoComplete="username"
            />
            {hasError('username') && (
              <small className="form-error">El nombre de usuario es obligatorio</small>
            )}
          </div>

          {/* Email */}
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
              autoComplete="email"
            />
            {hasError('email') && (
              <small className="form-error">Ingresa un email válido</small>
            )}
          </div>

          {/* Contraseña */}
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
              minLength="6"
              disabled={loading}
              autoComplete="new-password"
            />
            <small className="form-text">Mínimo 6 caracteres</small>
            {hasError('password') && (
              <small className="form-error">La contraseña es muy corta</small>
            )}
          </div>

          {/* Confirmar contraseña */}
          <div className={`form-group ${hasError('confirmPassword') ? 'has-error' : ''}`}>
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              className="form-control"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={() => setTouched(prev => ({ ...prev, confirmPassword: true }))}
              required
              disabled={loading}
              autoComplete="new-password"
            />
            {hasError('confirmPassword') && (
              <small className="form-error">Las contraseñas no coinciden</small>
            )}
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
          <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;

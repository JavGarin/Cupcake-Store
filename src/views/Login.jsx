import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './Auth.css'; // Asegúrate de que el CSS existe

const Login = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    loading,
    error,
  } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    try {
      await handleSubmit(e);
      navigate("/profile");
    } catch (err) {
      console.error("Login fallido:", err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Iniciar Sesión</h2>
        <p className="auth-subtitle">Ingresa tus credenciales para continuar</p>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleLogin}>
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
          </div>

          <button
            type="submit"
            className="auth-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Iniciando...
              </>
            ) : (
              "Ingresar"
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>¿No tienes una cuenta? <a href="/register">Regístrate</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;

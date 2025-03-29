import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
const Register = () => {
  const { 
    email, 
    setEmail, 
    password, 
    setPassword, 
    handleRegister 
  } = useContext(UserContext);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  return (
    <div className="container-profile">
      <h2>Registro</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Confirmar Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Registrarse</button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default Register;
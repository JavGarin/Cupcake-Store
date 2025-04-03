import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminStyles.css';

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
    });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('adminToken', data.token);
            navigate('/admin/dashboard');
        } else {
            setError(data.message || 'Error de autenticación');
    }
    } catch (err) {
        setError('Error al conectar con el servidor');
    }
};

return (
    <div className="login-container">
        <form onSubmit={handleSubmit}>
        <h2>Acceso Administrador</h2>
            {error && <div className="error-message">{error}</div>}
        <input
            type="email"
            placeholder="Correo administrativo"
            value={credentials.email}
            onChange={(e) => setCredentials({...credentials, email: e.target.value})}
            required
        />
        <input
            type="password"
            placeholder="Contraseña"
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            required
        />
        <button type="submit">Ingresar</button>
        </form>
    </div>
    );
};

export default AdminLogin;
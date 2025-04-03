import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ProductEditor from './ProductEditor';
import TextEditor from './TextEditor';

const AdminDashboard = () => {
    return (
    <div className="admin-dashboard">
        <aside className="admin-sidebar">
        <h3>Panel de Control</h3>
        <nav>
            <Link to="/admin/products">Gestión de Cupcakes</Link>
            <Link to="/admin/texts">Editar Textos</Link>
        </nav>
        </aside>

        <main className="admin-content">
        <Routes>
            <Route path="products" element={<ProductEditor />} />
            <Route path="texts" element={<TextEditor />} />
        </Routes>
        </main>
    </div>
    );
};

export default AdminDashboard;
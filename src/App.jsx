import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import Products from "./views/Products";
import ProductDetail from "./views/ProductDetail";
import Cart from "./views/Cart";
import NotFound from "./views/NotFound";
import Footer from "./components/Footer";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <div className="app-container">
        {/* Navbar que se muestra en todas las vistas */}
        <Navbar />

        <main className="main-content">
          <Routes>
            {/* Rutas existentes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            
            {/* Ruta para manejar todas las páginas no encontradas (404) */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Footer que se muestra en todas las vistas */}
        <Footer />
      </div>
    </UserProvider>
  );
}

export default App;
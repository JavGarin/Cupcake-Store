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
import ScrollToTop from "./components/ScrollToTop";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </UserProvider>
  );
}

export default App;
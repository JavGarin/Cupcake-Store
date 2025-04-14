import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import Navbar from "./components/Navbar";
import CarouselPromo from "./components/CarouselPromo";
import TopFive from "./components/TopFive";
import Login from "./views/Login";
import Register from "./views/Register";
import Products from "./views/Products";
import ProductDetail from "./views/ProductDetail";
import CartView from "./views/CartView";
import NotFound from "./views/NotFound";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { UserContext } from "./context/UserContext";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import ProductEditor from "./admin/ProductEditor";
import Profile from "./views/Profile";
import CartSidebar from "./components/CartSidebar";

import { ToastContainer } from 'react-toastify';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'react-toastify/dist/ReactToastify.css';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, isAdmin } = useContext(UserContext);

  if (!user) return <Navigate to="/login" replace />;
  if (requireAdmin && !isAdmin()) return <Navigate to="/" replace />;

  return children;
};

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <CartSidebar />

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <CarouselPromo />
                <TopFive />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:cupcake_id" element={<ProductDetail />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute requireAdmin>
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
            <Route path="products" element={<ProductEditor />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <ScrollToTop />

      
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 99999 }}
      />
    </div>
  );
}

export default App;

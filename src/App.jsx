// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
// import Login from "./views/Login";
// import Register from "./views/Register";
// import Products from "./views/Products";

function App() {
  return (
    <>
      {/* Navbar que se muestra en todas las vistas */}
      <Navbar />

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          {/*
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          */}
        </Routes>
      </div>
    </>
  );
}

export default App;

// src/views/Home.jsx
import React from "react";
import Navbar from "../components/Navbar";
import CarouselPromo from "../components/CarouselPromo";
import CupcakeBanner from "../components/CupcakeBanner";
import TopFive from "../components/TopFive";
import Footer from "../components/Footer";

function Home() {
  // Datos para un cupcake destacado (puede ser el que quieras resaltar)
  const featuredCupcake = {
    id: 6,
    name: "Cupcake Especial",
    description: "Un cupcake único con ingredientes premium.",
    image: "especial.jpg",
  };

  return (
    <>
      <div>
        <CarouselPromo />
        <TopFive />
      </div>
      <Footer />
    </>
  );
}

export default Home;

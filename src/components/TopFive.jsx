// src/components/TopFive.jsx
import React, { useEffect, useState } from "react";
import CupcakeBanner from "./CupcakeBanner";
import "./TopFive.css";

const TopFive = () => {
  const [topCupcakes, setTopCupcakes] = useState([]);

  useEffect(() => {
    fetch("/productos.json")
      .then((res) => res.json())
      .then((data) => {
        // Ordenar de mayor a menor por rating
        const ordenados = [...data].sort((a, b) => b.rating - a.rating);
        const top5 = ordenados.slice(0, 5);
        setTopCupcakes(top5);
      })
      .catch((err) => console.error("Error cargando productos:", err));
  }, []);

  return (
    <div className="top-five-section">
      <h2 className="section-title">Top 5 Cupcakes</h2>
      {topCupcakes.map((cupcake) => (
        <CupcakeBanner key={cupcake.cupcake_id} data={cupcake} />
      ))}
    </div>
  );
};

export default TopFive;

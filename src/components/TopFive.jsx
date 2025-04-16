import React, { useEffect, useState } from "react";
import CupcakeBanner from "./CupcakeBanner";

const TopFive = () => {
  const [topCupcakes, setTopCupcakes] = useState([]);

  useEffect(() => {
    fetch("/productos.json")
      .then((res) => res.json())
      .then((data) => {
        const ordenados = [...data].sort((a, b) => b.rating - a.rating);
        const top5 = ordenados.slice(0, 5);
        setTopCupcakes(top5);
      })
      .catch((err) => console.error("Error cargando productos:", err));
  }, []);

  return (
    <div className="top-five-section">
      <div className="cupcakes-grid">
        {topCupcakes.map((cupcake, index) => (
          <CupcakeBanner
            key={cupcake.cupcake_id}
            data={cupcake}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default TopFive;

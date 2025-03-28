// src/components/TopFive.jsx
import React from 'react';
import CupcakeBanner from './CupcakeBanner';

function TopFive() {
  // Datos de ejemplo para el top 5
  const cupcakes = [
    { id: 1, name: 'Cupcake de Chocolate', description: 'Delicioso y cremoso.', image: 'chocolate.jpg' },
    { id: 2, name: 'Cupcake de Vainilla', description: 'Suave y esponjoso.', image: 'vainilla.jpg' },
    { id: 3, name: 'Cupcake de Fresa', description: 'Fresco y frutal.', image: 'fresa.jpg' },
    { id: 4, name: 'Cupcake de Red Velvet', description: 'Con un toque especial.', image: 'redvelvet.jpg' },
    { id: 5, name: 'Cupcake de Limón', description: 'Ácido y refrescante.', image: 'limon.jpg' }
  ];

  return (
    <div className="top-five my-4">
      <h2>Top 5 Cupcakes más vendidos</h2>
      {cupcakes.map(cupcake => (
        <CupcakeBanner key={cupcake.id} cupcake={cupcake} />
      ))}
    </div>
  );
}

export default TopFive;

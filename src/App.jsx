import { useState } from "react";
import Navbar from "./components/Navbar";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* Navbar que se muestra en todas las vistas */}
      <Navbar />

      <div className="container">
        <div>
          <h1>Futuro Cupcake Store :D</h1>
        </div>
      </div>
    </>
  );
}

export default App;

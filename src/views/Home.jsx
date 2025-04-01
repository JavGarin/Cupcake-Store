import React from "react";
import Navbar from "../components/Navbar";
import CarouselPromo from "../components/CarouselPromo";
import CupcakeBanner from "../components/CupcakeBanner";
import TopFive from "../components/TopFive";

function Home() {
  return (
    <>
      <div>
        <CarouselPromo />
        <TopFive />
      </div>
    </>
  );
}

export default Home;

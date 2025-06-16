import React from "react";
import heroImg from "../../assets/rabbit-hero.webp";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative">
      <img
        src={heroImg}
        alt="hero"
        className="w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover"
      />
      <div className="absolute inset-0 flex justify-center items-center ">
        <div className="text-white text-center">
          <h1 className="text-4xl md:text-9xl uppercase mb-4  ">
            Vacation <br /> Ready
          </h1>
          <p className="text-sm tracking-tighter md:text-lg mb-6">
            Explore our vaction-ready outfits with fast worldwide shipping
          </p>
          <Link to='#' className='bg-white text-gray-950 px-6 py-2 rounded text-sm md:text-lg font-semibold' >
          Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;

import React from "react";
import { Link } from "react-router-dom";
import feature from '../../assets/featured.webp'

const FeaturesCollection = () => {
  return (
    <section className=" p-16 mt-20">
      <div className="conatainer mx-auto bg-green-50 rounded-3xl w-full  flex flex-col-reverse lg:flex-row items-center">
        {/* Left content */}

        <div className="flex flex-col items-center justify-center text-center lg:items-start  p-8 w-full">
          <h2 className="font-semibold text-gray-700 mb-2 text-lg">
            Comfort and Style
          </h2>
          <h2 className="font-bold text-4xl  lg:text-6xl mb-6 ">
            Apparel made for your everyday life
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Discover high-quality, confortable clothing that effortiessly blends
            fashios and function. Designed to make you look and feel great every
            day.
          </p>
          <Link
            to="/collection/all"
            className="bg-black text-white px-6 py-3 rounded-xl text-lg hover:bg-gray-800"
          >
            Shop Now
          </Link>
        </div>

        {/* Right content */}

        <div className="w-full ">
          <img
            src={feature}
            alt="photo"
            className="h-full object-cover w-full rounded-t-3xl  lg:rounded-none lg:rounded-r-3xl"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesCollection;

import React from "react";
import MenCollectionImage from "../../assets/mens-collection.webp";
import WomenCollectionImage from "../../assets/womens-collection.webp";
import { Link } from "react-router-dom";

const GenderCollectionSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        <div className="relative flex-1">
          <img
            src={WomenCollectionImage}
            alt="WomenCollectionImage"
            className="h-[700px] w-full  object-cover"
          />
          <div className="absolute bottom-8 left-8 p-4 bg-white bg-opacity-90 text-black space-y-8 rounded">
            <p className="text-2xl font-bold text-gray-900">Women's Collection</p>
            <Link to='/collections/all?gender=Women' className=" text-gray-900 underline"> Shop Now </Link>
          </div>
        </div>
        <div className="relative flex-1">
          <img
            src={MenCollectionImage}
            alt="MenCollectionImage"
            className="h-[700px] w-full object-cover"
          />
          <div className="absolute bottom-8 left-8 p-4 bg-white bg-opacity-90 text-black space-y-8 rounded">
            <p className="text-2xl font-bold text-gray-900">Men's Collection</p>
            <Link to='/collections/all?gender=Men' className=" text-gray-900 underline"> Shop Now </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollectionSection;

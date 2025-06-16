import React, { useEffect, useRef, useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from 'axios'

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(0);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  // const [scrollRight, setScrollRight] = useState(true);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    const fetchNewArrival = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
        );
        setNewArrivals(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNewArrival()
  }, []);
  
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = (e) => {
    setIsDragging(false);
  };

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behaviour: "smooth" });
  };

  // Update scroll Buttons

  const updateScrollButtons = (e) => {
    const container = scrollRef.current;
    if (container) {
      const scrollLeft = container.scrollLeft;
      const rightScrollable =
        container.scrollWidth > scrollLeft + container.clientWidth;

      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(rightScrollable);
    }
  };
  useEffect(() => {
    const container = scrollRef.current;

    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
      return () => container.removeEventListener("scroll", updateScrollButtons);
    }
  }, [newArrivals]);

  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-lg md:text-3xl font-bold mb-4">
          Explore New Arrivals
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          Discover the latest styles staright off the runway, freshly added to
          keep your wardrobe on the cutting edge of fashion
        </p>
        {/* Button Scrolling images */}
        <div className="absolute bottom-[-30px] right-0 flex space-x-2  ">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={` rounded-full p-2 border hover:bg-gray-300 ${canScrollLeft ? "bg-white shadow-lg text-black" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
          >
            {" "}
            <FiChevronLeft className="h-6 w-6" />{" "}
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={` rounded-full p-2 border hover:bg-gray-300 ${canScrollRight ? "bg-white shadow-lg text-black" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
          >
            {" "}
            <FiChevronRight className="h-6 w-6" />{" "}
          </button>
        </div>
      </div>
      {/* scrolling Images */}
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        ref={scrollRef}
        className={`container mx-auto flex space-x-6 overflow-x-auto relative px-4 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      >
        {newArrivals.map((newArrival) => (
          <div
            key={newArrival._id}
            className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative  "
          >
            <img
              src={newArrival.images[0].url}
              alt={newArrival.images[0].altText || newArrival.name}
              className="w-full h-[400px] object-cover rounded-lg"
              draggable={false}
            />

            <div className=" text-white absolute bottom-0 left-0 right-0 backdrop-blur-sm bg-opacity-50 p-4 rounded-b-lg">
              <Link to={`/product/${newArrival._id}`} className="block">
                <h4 className="font-medium">{newArrival?.name}</h4>
                <p className="mt-1">${newArrival?.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;

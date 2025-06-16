import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { FilterSideBar } from "../component/products/FilterSideBar";
import SortOptions from "../component/products/SortOptions";
import ProductGrid from "../component/products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productSlice";

const CollectionPage = () => {

  const {collection}  = useParams()
  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()
  const {products, loading, error} = useSelector((state) => state.products)
  const queryParams = Object.fromEntries([...searchParams]) 
  const [isSideFilterBarOpen, setIsSideFilterBarOpen] = useState(false);
  const sideFilterBarRef = useRef(null);

 
  useEffect(() => {
   dispatch(fetchProductsByFilters({collection, ...queryParams}));
  }, [dispatch, collection, searchParams])
  

  const toggleOpenSideFilterBar = () => {
    setIsSideFilterBarOpen(!isSideFilterBarOpen);
  };

  const handleClickOutside = (e) => {
    if (
      sideFilterBarRef.current &&
      !sideFilterBarRef.current.contains(e.target)
    ) {
      setIsSideFilterBarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    // Nettoyage à la désinstallation du composant
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  
  return (
    <div className="flex flex-col lg:flex-row">
      {/* Moblie filter button */}
      <button
        onClick={toggleOpenSideFilterBar}
        className="lg:hidden border p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2" /> Filter
      </button>
      {/* Filter Sidebar */}
      <div
        ref={sideFilterBarRef}
        className={`${isSideFilterBarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
      >
        <FilterSideBar />
      </div>
      <div className="flex-grow">
        <h2 className="text-2xl uppercase mb-4">All Collections</h2>
        {/* Sort Options */}
        <SortOptions />

        {/* Product Grid */}
        < ProductGrid products={products} loading={loading} error={error}/>
      </div>
    </div>
  );
};

export default CollectionPage;

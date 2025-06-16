import React, { useEffect, useState } from "react";
import Hero from "../component/layout/Hero";
import GenderCollectionSection from "../component/products/GenderCollectionSection";
import NewArrivals from "../component/products/NewArrivals";
import ProductDetails from "../component/products/ProductDetails";
import ProductGrid from "../component/products/ProductGrid";
import FeaturesCollection from "../component/products/FeaturesCollection"
import FeatureSection from "../component/products/FeatureSection"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchProductsByFilters } from "../redux/slices/productSlice";



 

const Home = () => {
  const dispatch =useDispatch()
  const {products, loading, error} = useSelector((state)=>state.products)
  const [bestSeller, setBestSeller] = useState(null)

  useEffect(() => {
    dispatch(fetchProductsByFilters({
      gender :"Women",
      category:"Top Wear",
      limit : 8,
    })) 
    // Fetch best seller product
    const fetchBestSeller = async () =>{
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`)
        setBestSeller(response.data)
        
      } catch (error) {
        console.error(error);   
      }
    }
    fetchBestSeller()
  }, [dispatch])
  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />

      {/* Best Seller */}
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      {bestSeller ? (<ProductDetails productId={bestSeller._id} />) : (
        <p className="text-center">Loading Best Seller Product</p>
      ) }

      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears for Women
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
      <FeaturesCollection />
      <FeatureSection />
    </div>
  );
};

export default Home;

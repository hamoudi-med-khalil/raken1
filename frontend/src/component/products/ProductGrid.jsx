import React from "react";
import { Link } from "react-router-dom";

const ProductGrid = ({ products, loading, error }) => {
  if(loading){
    return <p>Loading..</p>
  }
  if(error){
        return <p>Error : {error}</p>

  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link
          key={product._id}
          to={`/products/${product._id}`}
          className="block"
        >
          <div className="bg-white p-4 rounded-lg">
            <div className="w-full h-96 mb-4">
              <img
                src={product.images[0].url}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <h3 className="font-semibold text-gray-800 text-sm mb-1">{product.name}</h3>
            <p className="font-semibold text-gray-600 text-sm tracking-tighter">${product.price}</p>
            <div>

            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;

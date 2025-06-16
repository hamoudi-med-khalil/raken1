import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSimilarProducts,
  fetchSingleProduct,
} from "../../redux/slices/productSlice";
import { addToCart } from "../../redux/slices/cartSlice";

// const selectedProduct = {
//   name: "Stylish Jacket",
//   price: 120,
//   originalPrice: 150,
//   description: "This is a stylish Jacket for any occasion",
//   brand: "FashionBrand",
//   material: "Leather",
//   sizes: ["S", "M", "L", "XL"],
//   colors: ["Red", "Black"],
//   images: [
//     {
//       url: "https://picsum.photos/500/500?random=1",
//       altText: "Stylish Jacket 1",
//     },
//     {
//       url: "https://picsum.photos/500/500?random=2",
//       altText: "Stylish Jacket 2",
//     },
//   ],
// };

// const similarProduct = [
//   {
//     _id: 1,
//     name: " Product 1",
//     price: 100,
//     images: [{ url: "https://picsum.photos/500/500?random=1" }],
//   },
//   {
//     _id: 2,
//     name: " Product 2",
//     price: 100,
//     images: [{ url: "https://picsum.photos/500/500?random=2" }],
//   },
//   {
//     _id: 3,
//     name: " Product 3",
//     price: 100,
//     images: [{ url: "https://picsum.photos/500/500?random=3" }],
//   },
//   {
//     _id: 4,
//     name: " Product 4",
//     price: 100,
//     images: [{ url: "https://picsum.photos/500/500?random=4" }],
//   },
// ];

const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, guestId } = useSelector((state) => state.auth);
  const { selectedProduct, loading, error, similarProducts } = useSelector(
    (state) => state.products
  );
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isDisabled, setIsDisabled] = useState(false);

  const productFetchId = productId || id;
  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchSingleProduct(productFetchId));
      dispatch(fetchSimilarProducts({id : productFetchId} ));
    }
  }, [dispatch, productFetchId]);

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  const handelQuantity = (action) => {
    if (action === "plus") setQuantity((prev) => prev + 1);
    if (action === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select a size and color before adding to cart", {
        duration: 1000,
      });
      return;
    }
    setIsDisabled(true);
    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        size: selectedSize,
        color: selectedColor,
        guestId,
        userId: user?._id,
      })
    )
      .then(() => {
        toast.success("Product add to the cart", { duration: 1000 });
      })
      .finally(() => {
        setIsDisabled(false);
      });
  };

  if (loading) {
    return <p>Loading..</p>;
  }
  if (error) {
    return <p>Error : {error}</p>;
  }

  return (
    <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
      {selectedProduct && (
        <div className="mt-3">
          <div className="flex flex-col md:flex-row">
            {/* Left Block */}
            <div className="hidden md:flex flex-col space-y-4 mr-6">
              {selectedProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url || null}
                  alt={image.altText}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${image.url === mainImage ? "border-2 border-black" : "border-gray-300"}`}
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>
            {/* main image */}
            <div className="md:w-1/2">
              <div className="mb-4">
                <img
                  src={mainImage || null}
                  alt={selectedProduct.images[0].altText}
                  className="w-full border rounded-lg h-auto object-cover"
                  draggable={false}
                />
              </div>
            </div>
            {/* Mobile Thumbnail */}
            <div className="md:hidden flex overscroll-x-scroll space-x-4 mb-4 ">
              {selectedProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url || null}
                  alt={image.altText}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${image.url === mainImage ? " border-black" : "border-gray-300"}`}
                  onClick={() => setMainImage(image.url)}
                  draggable={false}
                />
              ))}
            </div>
            {/* Right Side */}
            <div className="md:w-1/2 md:ml-10">
              <h1 className="text-2xl md:text-3xl font-semibold mb-2">
                {selectedProduct.name}
              </h1>
              <p className="text-lg text-gray-600 mb-1 line-through">
                ${" "}
                {selectedProduct.originalPrice &&
                  `${selectedProduct.originalPrice}`}
              </p>
              <p className="text-lg text-gray-600 mb-2 ">
                $ {selectedProduct.price}
              </p>
              <p className="text-gray-600 mb-4">
                {selectedProduct.description}
              </p>
              <div className="mb-4">
                <p className="text-gray-700">Colors:</p>
                <div className="flex space-x-2 mt-2">
                  {selectedProduct.colors.map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full  ${selectedColor === color ? "border-4 border-black" : "border-none"}`}
                      style={{
                        backgroundColor: color.toLocaleLowerCase(),
                        filter: "brightness(0.5)",
                      }}
                      onClick={() => setSelectedColor(color)}
                    ></button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <p className="text-gray-700 ">Size:</p>
                <div className="flex space-x-2 mt-2">
                  {selectedProduct.sizes.map((size) => (
                    <button
                      key={size}
                      className={` px-3 py-1 border rounded font-semibold ${selectedSize == size ? "bg-black text-white" : "bg-gray-200"}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <p className="text-gray-700 ">Quantity:</p>
                <div className=" flex items-center space-x-4 mt-2">
                  <button
                    className={`bg-gray-200 text-lg p-2 rounded border ${quantity > 0 ? "disabled:bg-gray-500" : ""}`}
                    onClick={() => handelQuantity("plus")}
                  >
                    +
                  </button>
                  <span className="text-lg">{quantity}</span>
                  <button
                    className="bg-gray-200 text-lg p-2 rounded border"
                    onClick={() => handelQuantity("minus")}
                  >
                    -
                  </button>
                </div>
              </div>
              <div>
                <button
                  onClick={handleAddToCart}
                  disabled={isDisabled}
                  className={`bg-black text-white uppercase w-full py-2 px-4 rounded-md border ${isDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-slate-900"} `}
                >
                  {isDisabled ? "Adding..." : "add to cart"}
                </button>
              </div>
              <div className="mt-11">
                <h3 className="text-xl font-bold mb-4"> Characteritics </h3>
                <table className="text-left w-full text-sm text-gray-700">
                  <tbody>
                    <tr>
                      <td className="py-1">Brand:</td>
                      <td className="py-1">{selectedProduct.brand}</td>
                    </tr>
                    <tr>
                      <td className="py-1">Material:</td>
                      <td className="py-1">{selectedProduct.material}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Top best Seller */}
          <div className="mt-20">
            <h2 className="font-bold text-center text-3xl mb-4">
              You may also like
            </h2>
            <ProductGrid products={similarProducts} loading={loading} error={error} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;

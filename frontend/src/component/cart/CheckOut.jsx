import React, { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCheckout } from "../../redux/slices/checkOutSlice";

// const cart = {
//   products: [
//     {
//       name: "Stylish Jacket",
//       size: "M",
//       color: "Black",
//       price: 120,
//       image: "https://picsum.photos/150?random=1",
//     },
//     {
//       name: "Casual Sneakers",
//       size: "42",
//       color: "White",
//       price: 75,
//       image: "https://picsum.photos/150?random=2",
//     },
//   ],
//   totalPrice: 195,
// };

const CheckOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [checkOutId, setCheckOutId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const handelCreateCheckout = (e) => {
    e.preventDefault();
    if (cart && cart.products.length > 0) {
      const response = dispatch(
        createCheckout({
          checkoutItem: cart.products,
          shippingAddress,
          PaymentMethod: "Paypal",
          totalPrice: cart.totalPrice,
        })
      );
      if (response.payload && response.payload._Id) {
        setCheckOutId(response.payload._id);
      }
    }
  };
  const handlePaymentSuccess = async (details) => {

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/pay`,
        { paymentStatus: "paid", paymentDetails: details },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      if (response.status === 200) {
        await handleFinalizeCheckout(checkOutId);
      } else {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };
const handleFinalizeCheckout = async (checkOutId) =>{
  try {
    const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkOutId}/finalize`,    
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
       if (response.status === 200) {
        navigate('/order-confirmation')
      } else {
        console.error(error);
      }
  } catch (error) {
    console.error(error);
    
  }
}
  if(loading) return <p>Loading cart ...</p>
  if(error) return <p>Error {error} ...</p>
  if(!cart || !cart.products || cart.products.length === 0) return <p>Your Cart isEmpty ...</p>
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {/* Left Section  */}
      <div className="bg-white rounded-lg">
        <h2 className="text-2xl uppercase mb-6">checkout</h2>
        <form onSubmit={handelCreateCheckout}>
          <h3 className="text-lg mb-4">Contact Details</h3>
          <div>
            <label
              htmlFor="email"
              className="block w-full mb-2 text-lg text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value="admin@exemple.com"
              disabled
              className="block w-full p-2 border rounded "
            />
          </div>
          <div className="mt-4">
            <h3 className="text-lg mb-4">Delivry</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstname" className="text-lg text-gray-700">
                  First name
                </label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  value={shippingAddress.firstName}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      firstName: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastname" className="text-lg text-gray-700">
                  Last name
                </label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  value={shippingAddress.lastName}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      lastName: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="address" className="text-lg text-gray-700">
                Address
              </label>
              <input
                type="text"
                value={shippingAddress.address}
                name="address"
                id="address"
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    address: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label htmlFor="city" className="text-lg text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={shippingAddress.city}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      city: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label htmlFor="postalcode" className="text-lg text-gray-700">
                  Postal code
                </label>
                <input
                  type="text"
                  name="postalcode"
                  id="postalcode"
                  value={shippingAddress.postalCode}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      postalCode: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="country" className="text-lg text-gray-700">
                Country
              </label>
              <input
                type="text"
                value={shippingAddress.country}
                name="country"
                id="country"
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    country: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mt-4">
              <label htmlFor="phone" className="text-lg text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                value={shippingAddress.phone}
                name="phone"
                id="phone"
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    phone: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          {!checkOutId ? (
            <button
              type="submit"
              className="mt-6 bg-black text-white text-lg w-full rounded p-3 cursor-pointer"
            >
              Continue to Payment
            </button>
          ) : (
            <div>
              <h3 className="text-lg mb-4 mt-6">Pay With Paypal</h3>
              {/* Paypal Compennent */}
            </div>
          )}
        </form>
      </div>
      {/* Right section */}
      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="text-lg mb-4">Order summary</h3>
        <div className="border-t py-4 mb-4">
          {cart.products.map((product, index) => (
            <div
              key={index}
              className="flex items-start justify-between py-3 border-b"
            >
              <div className="flex items-start">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover mr-4"
                />
                <div>
                  <h3 className="text-md">{product.name}</h3>
                  <p className="text-gray-500">Size: {product.size} </p>
                  <p className="text-gray-500">Color: {product.color} </p>
                </div>
              </div>
              <p className="text-xl ">${product.price?.toLocaleString()} </p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center text-lg mb-4">
          <p>Subtotal</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
        <div className="flex justify-between items-center text-lg">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className=" flex justify-between items-center text-lg mt-4 border-t pt-4">
          <p>Total</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;

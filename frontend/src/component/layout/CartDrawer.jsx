import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import CartContent from "../cart/CartContent";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CartDrawer = ({ toggleCartDrawer, cartDrawerOpen }) => {
  const navigate = useNavigate();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const userId = user ? user._id : null;

  const handleCheckOut = () => {
    toggleCartDrawer();
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 bg-white shadow-lg w-1/2 lg:w-1/4 h-full transform transition-transform duration-300
    ${cartDrawerOpen ? "translate-x-0" : "translate-x-full"} flex flex-col z-50`}
    >
      <div className="flex justify-end p-4">
        <button onClick={toggleCartDrawer}>
          <IoMdClose className="h-6 w-6" />
        </button>
        {/* cart content with scrollable ares */}
      </div>
      <div className="flex-grow overflow-y-auto p-4 ">
        <h2 className=" font-semibold text-xl mb-4">Your Cart</h2>
        {Array.isArray(cart?.products) && cart.products.length > 0 ? (
          <CartContent cart={cart} userId={userId} guestId={guestId} />
        ) : (
          <p>Your cart is empty.</p>
        )}

        {/* Cart content */}
      </div>

      {/* Check out  */}
      <div className="bg-white sticky bottom-0 p-4">
        {cart && cart?.products?.length > 0 && (
          <>
            <button
              onClick={handleCheckOut}
              className="w-full bg-black text-white font-semibold py-3 px-2 rounded-lg hover:bg-gray-800 transition"
            >
              CheckOut
            </button>
            <p className="text-xs tracking-tighter text-gray-500 mt-2 text-center">
              Shipping, taxes, and discount codes calculated at checkout
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;

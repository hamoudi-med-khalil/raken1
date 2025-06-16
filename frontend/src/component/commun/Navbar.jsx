import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "../layout/CartDrawer";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  const toggleCartDrawer = () => {
    setCartDrawerOpen(!cartDrawerOpen);
  };
  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  const {cart} = useSelector((state) => state.cart)
const cartItemCount = Array.isArray(cart?.products)
  ? cart.products.reduce((total, product) => total + product.quantity, 0)
  : 0;
  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6 relative border-b border-gray-200 ">
        {/* Logo  left */}
        <div>
          <Link to="/" className="text-2xl font-medium">
            Rabbit
          </Link>
        </div>
        {/* Navigation link center */}
        <div className="hidden md:flex space-x-6">
          <Link to='/collections/all?gender=Men' className="text-gray-700 hover:text-black text-sm font-medium uppercase">
            Men
          </Link>
          <Link to='/collections/all?gender=Women' className="text-gray-700 hover:text-black text-sm font-medium uppercase">
            Women
          </Link>
          <Link to='/collections/all?category=Top Wear' className="text-gray-700 hover:text-black text-sm font-medium uppercase">
            Top Wear
          </Link>
          <Link to='/collections/all?category=Bottom Wear' className="text-gray-700 hover:text-black text-sm font-medium uppercase">
            Bottom Wear
          </Link>
        </div>
        {/* Icons Right */}
        <div className="flex space-x-4 ">
          <Link to='/admin' className="block bg-black px-2 py-1 rounded text-white text-center text-sm cursor-pointer">Admin</Link>
          <Link to="profile" className="hover:text-black">
            <HiOutlineUser className="h-6 w-6 text-gray-700 hover:text-black" />
          </Link>
          <button className="relative " onClick={toggleCartDrawer}>
            <HiOutlineShoppingBag className=" h-6 w-6 text-gray-700 hover:text-black" />
           
           {cartItemCount > 0 && (
             <span className="absolute -top-1 left-3 text-sm bg-red-700 text-white rounded-full px-2  h-5 w-5 flex justify-center ">
              {cartItemCount }
            </span>
           )}
          
          </button>

          {/* Search */}
          <div className="overflow-hidden">
            <SearchBar />
          </div>

          {/* mobile bar */}
          <button className="md:hidden" onClick={toggleNavDrawer}>
            <HiBars3BottomRight className="h-6 w-6 text-gray-600 hover:text-black" />
          </button>
        </div>
      </nav>
      {/* cart draw */}
      <CartDrawer
        toggleCartDrawer={toggleCartDrawer}
        cartDrawerOpen={cartDrawerOpen}
      />

      {/* mobile navBar */}
      <div
        className={`bg-white shadow-lg  fixed top-29 left-0 z-50 transform transition-transform duration-300 
                w-1/4 sm:w-1/4 md:w-1/3 h-full ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <div>
          <h2 className="text-lg font-semibold block p-4 mb-4">Menu</h2>
          <nav className="flex flex-col justify-center items-left space-y-6 p-4">
            <Link to='/collections/all?gender=Men'  className="text-gray-700 hover:text-black text-sm font-medium uppercase" onClick={toggleNavDrawer}>
              Men
            </Link>
            <Link to='/collections/all?gender=Women' className="text-gray-700 hover:text-black text-sm font-medium uppercase" onClick={toggleNavDrawer}>
              Women
            </Link>
            <Link to='/collections/all?category=Top Wear' className="text-gray-700 hover:text-black text-sm font-medium uppercase" onClick={toggleNavDrawer}>
              Top Wear
            </Link>
            <Link to='/collections/all?category=Bottom Wear' className="text-gray-700 hover:text-black text-sm font-medium uppercase" onClick={toggleNavDrawer}>
              Bottom Wear
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;

import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import registerImage from "../assets/register.webp";
import { registerUser } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { mergeCart } from "../redux/slices/cartSlice";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, guestId, loading } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  // Get redirect parameters
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  useEffect(() => {
    if (user) {
      if (cart?.products.length > 0 && guestId) {
        dispatch(mergeCart({ guestId, user })).then(() => {
          navigate(isCheckoutRedirect ? "/checkout" : "/");
        });
      } else {
        navigate(isCheckoutRedirect ? "/checkout" : "/");
      }
    }
  }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
    navigate("/")
  };

  return (
    <div className="container mx-auto w-full py-16 flex">
      {/* Left side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm">
          <div className="flex flex-col justify-center text-center mb-6">
            <h2 className="text-xl font-medium mb-6">Rabbit</h2>
            <h2 className="text-2xl font-bold  mb-6">Hey there! 👋 </h2>
            <p className="mb-6">Enter your username and password to login</p>
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block font-semibold mb-2">
              Name
            </label>
            <input
              type="name"
              value={name}
              name={name}
              className="w-full p-2 mb-4  border rounded "
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your ename"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              name={email}
              className="w-full p-2 mb-4  border rounded "
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email adress"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              name={password}
              autoComplete={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className=" w-full border rounded p-2 "
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-1 rounded-lg hover:text-gray-800 transition"
            onClick={handleSubmit}
          >
            {loading ? "Loading...":   <p> "Sign up"</p>  }
          </button>
          <p className="mt-4 text-center text-sm ">
            have an account?{"  "}
            <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className="text-blue-500">
              LogIn{" "}
            </Link>
          </p>
        </form>
      </div>

      {/* Right side */}
      <div className="hidden md:block w-1/2 bg-gray-500">
        <div className="flex flex-col justify-center items-center">
          <img
            src={registerImage}
            alt="loginImage"
            className="object-cover w-full h-[750px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;

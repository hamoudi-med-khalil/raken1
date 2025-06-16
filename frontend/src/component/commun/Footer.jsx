import React from "react";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { TbBrandMeta } from "react-icons/tb";
import { FiPhoneCall } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t-2 py-14">
      <div className="container mx-auto text-center grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        {/* Newsletter */}
        <div>
          <h3 className="text-l text-gray-800 mb-4">Newsletter</h3>
          <p className="text-gray-500 mb-4">
            Be the first to hear about new products, exclusive events, and
            online offers.
          </p>
          <p className="font-md text-sm mb-6 text-gray-700">
            Sign up and get 10% of your first order.
          </p>
          <form action="submit" className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none
                  focus:ring-2 focus:ring-gray-500 transition-all"
              required
            />
            <button
              type="submit"
              className="bg-black text-sm text-white w-1/2 px-6 border-t border-r border-b 
            border-black rounded-r-md hover:bg-gray-800 transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
        {/* Shop List */}
        <div>
          <h3 className="text-l text-gray-800 mb-4">Shop</h3>
          <ul className=" space-y-2 text-gray-600">
            <li>
              {" "}
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Men's Top Wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Women's Top Wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Men's Bottom Wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Women's Bottom Wear
              </Link>
            </li>
          </ul>
        </div>
        {/* Support List */}
        <div>
          <h3 className="text-l text-gray-800 mb-4">Support</h3>
          <ul className=" space-y-2 text-gray-600">
            <li>
              {" "}
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Features
              </Link>
            </li>
          </ul>
        </div>
        {/* Follow section */}
        <div>
          <h3 className="text-l text-gray-800 mb-4">Follow Us</h3>
          <div className="flex items-center text-center justify-center space-x-4 mb-6">
            <a
              href="www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500 transition-colors"
            >
              <TbBrandMeta className="h-5 w-5" />
            </a>
            <a
              href="www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500 transition-colors"
            >
              <IoLogoInstagram className="h-5 w-5" />
            </a>
            <a
              href="www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500 transition-colors"
            >
              <RiTwitterXLine className="h-4 w-4" />
            </a>
          </div>
          <p className="text-gray-500 mb-1">Call Us</p>
          <p>
            <FiPhoneCall className="inline-block mr-2" />

            <a
              href="0123-456-789"
              rel="noopener noreferrer"
              className="hover:text-gray-500 transition-colors"
            >
              0123-456-789
            </a>
          </p>
        </div>
      </div>
      <div className="container mx-auto mt-12 px-4 border-t border-gray-200 pt-6">
            <p className="text-gray-500 text-sm tracking-tighter text-center">
                © 2025, CompileTab. All Right Reserved.
            </p>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import { HiShoppingBag, HiOutlineCreditCard } from "react-icons/hi";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";

const FeatureSection = () => {
  return (
    <section className="py-16 bg-white px-4">
      <div className="containe mx-auto  grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {/* feature 1 */}
        <div className="flex flex-col items-center space-y-4">
          <div className="p-4 rounded-full bg-gray-400">
            <HiShoppingBag className="text-xl" />
          </div>
          <h4 className="tracking-tighter uppercase">
            free international shipping
          </h4>
          <p className="text-gray-600 text-sm tracking-tighter">
            On all orders over $100.00
          </p>
        </div>
        {/* feature 2 */}
        <div className="flex flex-col items-center space-y-4">
          <div className="p-4 rounded-full bg-gray-400">
            <HiArrowPathRoundedSquare className="text-xl" />
          </div>
          <h4 className="tracking-tighter uppercase">
            45 days return
          </h4>
          <p className="text-gray-600 text-sm tracking-tighter">
            Money back gurantee
          </p>
        </div>
        {/* feature 3 */}
        <div className="flex flex-col items-center space-y-4">
          <div className="p-4 rounded-full bg-gray-400">
            <HiOutlineCreditCard className="text-xl" />
          </div>
          <h4 className="tracking-tighter uppercase">
            secure checkout
          </h4>
          <p className="text-gray-600 text-sm tracking-tighter">
            100% secured checkout process
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;

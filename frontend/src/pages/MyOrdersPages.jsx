import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserOrders } from "../redux/slices/orderSlice";

const MyOrdersPages = () => {
  const navigate =useNavigate()
  const dispatch = useDispatch()
  const { orders, loading, error} = useSelector((state) => state.orders)

  useEffect(() => {
    dispatch(fetchUserOrders())
  }, [dispatch])
  

  // useEffect(() => {
  //   setTimeout(() => {
  //     const mockOrders = [
  //       {
  //         _id: "123456",
  //         createdAt: new Date(),
  //         shippingAdress: { city: "New York", country: "USA" },
  //         orderItems: [
  //           {
  //             name: "Product 1",
  //             image: "https://picsum.photos/500/500?random=1",
  //           },
  //         ],
  //         totalPrice: 100,
  //         isPaid: true,
  //       },
  //       {
  //         _id: "4567",
  //         createdAt: new Date(),
  //         shippingAdress: { city: "New York", country: "USA" },
  //         orderItems: [
  //           {
  //             name: "Product 2",
  //             image: "https://picsum.photos/500/500?random=2",
  //           },
  //         ],
  //         totalPrice: 100,
  //         isPaid: false,
  //       },
  //     ];
  //     setOrders(mockOrders);
  //   }, 1000);
  // }, []);

  if(loading){
   return <p>Loading..</p>
  }
  if(error){
   return <p>Erorr : {error}</p>
  }

  const handelRowClick =(orderId)=>{
    navigate(`/order/${orderId}`)

  }

  return (
    <div className=" max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="font-bold text-2xl md:text-3xl  mb-6">My Orders</h2>
      <div className="relative shadow-md sm:rounded-lg overflow-x-scroll">
        <table className="w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-2 px-4 sm:py-3">Image</th>
              <th className="py-2 px-4 sm:py-3">Order ID</th>
              <th className="py-2 px-4 sm:py-3">Created</th>
              <th className="py-2 px-4 sm:py-3">Shipping Address</th>
              <th className="py-2 px-4 sm:py-3">Items</th>
              <th className="py-2 px-4 sm:py-3">Price</th>
              <th className="py-2 px-4 sm:py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders?.map((order) => (
                <tr
                  key={order._id}
                  onClick={() => handelRowClick(order._id)}
                  className="border-b hover:border-gray-50 cursor-pointer"
                >
                  <td className="p-2 sm:p-4">
                    <img
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].name}
                      className="w-10 h-10 sm:h-12 object-cover rounded-lg"
                    />{" "}
                  </td>
                  <td className="p-2 sm:p-4 font-medium text-gray-900 whitespace-nowrap">
                    #{order._id}
                  </td>
                  <td className="p-2 sm:p-4 font-medium ">
                    {new Date(order.createdAt).toLocaleDateString()}{" "}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </td>
                  <td className="p-2 sm:p-4">
                    {order.shippingAdress
                      ? `${order.shippingAdress.city}, ${order.shippingAdress.country}`
                      : "N/A"}
                  </td>
                  <td className="p-2 sm:p-4">{order.orderItems.length}</td>
                  <td className="p-2 sm:p-4">${order.totalPrice}</td>
                  <td className="p-2 sm:p-4">
                    <span
                      className={`p-1 rounded-md ${order.isPaid ? "bg-green-300" : "bg-red-600 text-white"}`}
                    >
                      {order.isPaid ? "Paid" : "Pending..."}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-500">
                  You have no orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrdersPages;

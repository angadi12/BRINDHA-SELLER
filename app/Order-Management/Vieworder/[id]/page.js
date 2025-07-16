"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { MapPin, Mail, Phone } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDispatch, useSelector } from "react-redux";
import { fetchordersbyid } from "@/lib/Redux/Slices/orderSlice";
import { useParams } from "next/navigation";

const Page = () => {
  const { orderdata, orderloading, ordererror } = useSelector(
    (state) => state.order
  );
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    dispatch(fetchordersbyid(id));
  }, [dispatch]);


  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };


  const statusSteps = [
    { title: "Pending" },
    { title: "In Transit" },
    // { title: "Product Shipped", date: "02-03-2025" },
    // { title: "Out for Delivery", date: "04-03-2025" },
    { title: "Delivered" },
  ];

  // Change this dynamically based on status
  const currentStatus =orderdata?.vendorSubOrders[0]?.status; // Example
  const currentIndex = statusSteps.findIndex(
    (step) => step.title === currentStatus
  );
  const progressPercent = ((currentIndex + 1) / statusSteps.length) * 100;

  return (
    <>
      {orderloading ? (
        <div className="flex justify-center items-center h-screen">
          <span className="loader2"></span>
        </div>
      ) : (
        <>
          {ordererror ? (
            <div className="flex justify-center items-center h-full">
              <span>No order data found</span>
            </div>
          ) : (
            <ScrollArea className="h-screen pb-14 bg-gray-50">
              <div className=" mx-auto p-4 w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Left Column - Order Details */}
                  <div className="md:col-span-2 space-y-4">
                    {/* Order Header */}
                    <div className="bg-white rounded-sm p-4  border ">
                      <div className="flex justify-between items-center">
                        <div className="space-y-2">
                          <h2 className="font-bold text-gray-800">
                            #order{orderdata?.orderId?.slice(-8)}
                          </h2>
                          <div className="bg-[#106C83] text-white px-4 py-2 rounded-full inline-flex items-center">
                            <span className="mr-2">📦</span> Estimated Delivery:
                            27-03-2025
                          </div>
                        </div>
                        {/* <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md">
                          Cancel Order
                        </button> */}
                      </div>
                    </div>

                    {/* Order Status */}
                    <div className="bg-white rounded-sm p-6 border">
                      <h3 className="text-sm font-semibold mb-6">Status</h3>
                      <div className="relative">
                        {/* Progress Bar Background */}
                        <div className="h-1 bg-gray-200 absolute top-5 left-7 right-7 z-0">
                          <div
                            className="h-1 bg-[#106C83] transition-all duration-300"
                            style={{ width: `${progressPercent}%` }}
                          ></div>
                        </div>

                        {/* Steps */}
                        <div className="flex justify-between relative z-10">
                          {statusSteps?.map((step, index) => {
                            const isCompleted = index <= currentIndex;
                            return (
                              <div
                                key={step?.title}
                                className="flex flex-col items-center text-center w-1/5"
                              >
                                <div
                                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                                    isCompleted
                                      ? "bg-[#106C83] text-white"
                                      : "bg-gray-300 text-white"
                                  }`}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                </div>
                                <p className="font-medium text-gray-800">
                                  {step.title}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {step.date}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="bg-white rounded-sm p-6  border">
                      <h3 className="text-sm font-semibold text-gray-500 mb-4">
                        PRODUCT DETAILS
                      </h3>

                      {orderdata?.vendorSubOrders[0]?.products?.map(
                        (pro, id) => (
                          <div
                            key={id}
                            className="border-b border-gray-200 pb-6 mb-6"
                          >
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="w-full md:w-36">
                                <Image
                                  src={pro?.productDetails?.Images[0]}
                                  alt="Elite Sewing Machine"
                                  width={144}
                                  height={144}
                                  className="rounded-md object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                                  {pro?.productDetails?.Name}
                                </h4>
                                <div className="grid grid-cols-2 gap-2 mb-2">
                                  <div>
                                    <p className="text-gray-500 text-sm">
                                      QUANTITY:
                                    </p>
                                    <p>x{pro?.quantity}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-500 text-sm">
                                      PRODUCT ID:
                                    </p>
                                    <p>#{pro?._id?.slice(-8)}</p>
                                  </div>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-3">
                                  <div className="bg-gray-100 px-4 py-2 rounded-md">
                                    Size:{pro?.size}
                                  </div>
                                  <div className="bg-gray-100 px-4 py-2 rounded-md">
                                    Color:{pro?.color}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-gray-500 text-sm">PRICE:</p>
                                <p className="text-xl font-semibold">
                                  {pro?.price}
                                </p>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Right Column - Order Summary */}
                  <div className="space-y-4">
                    {/* Order Details */}
                    <div className="bg-white rounded-sm p-6 border">
                      <h3 className="text-sm font-semibold mb-1">
                        Order Details
                      </h3>
                      <p className="text-gray-500 mb-4">Customer Contact</p>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Mail className="text-[#106C83]" size={20} />
                          <span>{orderdata?.orderId?.userId?.Email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="text-[#106C83]" size={20} />
                          <span>{orderdata?.orderId?.userId?.Number}</span>
                        </div>
                      </div>
                    </div>

                    {/* Transaction Details */}
                    <div className="bg-white rounded-sm p-6  border">
                      <p className="text-gray-500 mb-4">
                        #{orderdata?.transactionId}
                      </p>
                      <h4 className="font-semibold mb-2">Summary</h4>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Payment Method</span>
                          <span>{orderdata?.orderId?.paymentMode}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Paid On</span>
                          <span>
                            {new Date(
                              orderdata?.createdAt
                            )?.toLocaleDateString("en-GB")}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Order</span>
                          <span>{orderdata?.vendorSubOrders[0]?.subtotal}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Delivery</span>
                          <span>{orderdata?.vendorSubOrders[0]?.deliveryCharge}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Discount</span>
                          <span className="text-red-500">0</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Tax</span>
                          <span>{orderdata?.orderId?.taxAmount}</span>
                        </div>
                        <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-semibold">
                          <span className="text-[#106C83]">Total</span>
                          <span className="text-[#106C83]">
                            {orderdata?.vendorSubOrders[0]?.total}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="bg-white rounded-sm p-6  border">
                      <h3 className="text-sm font-semibold mb-4">
                        Shipping Address
                      </h3>
                      <div className="flex gap-3">
                        <MapPin
                          className="text-[#106C83] flex-shrink-0"
                          size={24}
                        />
                        <div>
                          <p className="font-semibold">
                            {orderdata?.orderId?.userId?.Username}
                          </p>
                          <p className="text-gray-500">
                            {orderdata?.orderId?.ShipingAddress?.FullAddress}
                            <br></br>
                            {orderdata?.orderId?.ShipingAddress?.State}-
                            {orderdata?.orderId?.ShipingAddress?.Pincode}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          )}
        </>
      )}
    </>
  );
};

export default Page;

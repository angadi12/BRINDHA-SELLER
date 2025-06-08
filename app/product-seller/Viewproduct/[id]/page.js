"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDispatch, useSelector } from "react-redux";
import { fetchSellarproduct } from "@/lib/Redux/Slices/sellarSlice";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = params;
  const { productLoading, productError, Product } = useSelector(
    (state) => state.sellar
  );

  console.log(id);

  useEffect(() => {
    if (id) {
      dispatch(fetchSellarproduct(id));
    }
  }, [dispatch]);

  console.log(Product);

  return (
    <ScrollArea className="w-full mx-auto bg-white h-screen pb-14 px-4">
      {/* Header */}
      <header className="py-4  flex items-center">
        <ChevronLeft
          className="h-5 w-5 mr-2 cursor-pointer"
          onClick={() => router.back()}
        />
        <h1 className="text-xl font-bold">Product Details</h1>
      </header>

      <div className="p-4">
        {/* Product Image and Info Section */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Product Images */}
          <div className="w-full md:w-1/2">
            <div className="rounded-lg overflow-hidden mb-2">
              <Image
                src={Product?.Images[0]}
                alt="Product Image"
                width={500}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="flex gap-2">
              <div className="w-1/4 h-24 bg-gray-100 rounded-lg overflow-hidden border">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt="Thumbnail 1"
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-1/4 h-24 bg-gray-100 rounded-lg overflow-hidden border">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt="Thumbnail 2"
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-1/4 h-24 bg-gray-100 rounded-lg overflow-hidden border">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt="Thumbnail 3"
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-1/4 h-24 bg-gray-100 rounded-lg overflow-hidden border relative">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt="Thumbnail 4"
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full md:w-1/2">
            <div className="inline-block bg-[#106C83] text-white px-3 py-1 rounded-md text-sm mb-2">
              Product Category
            </div>
            <h2 className="text-3xl font-bold mb-1">{Product?.Name}</h2>
            <p className="text-[#106C83] mb-4">Seller Name</p>
            <div className="text-right text-3xl font-bold mb-4">
              ₹{Product?.Yourprice}
            </div>

            <div className="border-t border-b py-4 my-4">
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <h3 className="font-bold mb-2">Product Details</h3>
                <p className="text-gray-700 text-sm">
                  {Product?.Description}
                  <span className="text-[#106C83]">More...</span>
                </p>
              </div>

              <h3 className="font-bold mb-3">Features</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {Product?.Features.map((item, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <h3 className="font-bold mb-3">Select Avalible</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                <button className="bg-gray-200 px-4 py-2 rounded-md text-sm">
                  Small - 5 KG
                </button>
                <button className="bg-gray-200 px-4 py-2 rounded-md text-sm">
                  Small - 5 KG
                </button>
                <button className="bg-gray-200 px-4 py-2 rounded-md text-sm">
                  Small - 5 KG
                </button>
              </div>

              <h3 className="font-bold mb-3">Select Available</h3>
              <div className="flex gap-3 mb-4">
                <button className="w-10 h-10 rounded-full bg-yellow-200 border"></button>
                <button className="w-10 h-10 rounded-full bg-blue-300 border"></button>
                <button className="w-10 h-10 rounded-full bg-green-400 border"></button>
                <button className="w-10 h-10 rounded-full bg-pink-400 border"></button>
                <button className="w-10 h-10 rounded-full bg-teal-700 border"></button>
              </div>

              <div className="border-t pt-4">
                <p className="font-bold">
                  Quantity Available -{" "}
                  <span className="font-normal">200 per color</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">Description</h2>
          <h3 className="text-xl font-bold mb-2">
            Lorem ipsum dolor sit amet elit.
          </h3>
          <p className="text-gray-600 mb-4">{Product?.Description}</p>
        </div>

        {/* Commission Section */}
        <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between mb-4">
          <span className="font-bold">Add Commession-</span>
          <div className="flex items-center">
            <input
              type="text"
              className="border rounded-md px-2 py-1 w-20 text-right"
            />
            <span className="ml-2">%</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <button className="w-full bg-[#106C83] text-white py-3 rounded-md font-medium">
            Accept
          </button>
          <button className="w-full border border-red-500 text-red-500 py-3 rounded-md font-medium">
            Rejected
          </button>
        </div>
      </div>
    </ScrollArea>
  );
}

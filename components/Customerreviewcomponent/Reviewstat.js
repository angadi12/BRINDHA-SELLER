"use client";
import React from "react";
import Image from "next/image";
import Dash1 from "@/public/Asset/Totalproducts.png";
import Dash2 from "@/public/Asset/reviews.png";
import Dash3 from "@/public/Asset/orders.png";
import Dash4 from "@/public/Asset/reviewd.png";
import { useSelector } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton";

const Reviewstat = () => {
  const { reviews, loading, error } = useSelector((state) => state.reviews);

  return (
    <div className=" overflow-auto ">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <div className="bg-white border rounded-lg p-4 flex items-start gap-3">
          <div className="w-14 h-14 rounded-md ring-1 ring-gray-300 flex items-center justify-center">
            {loading ? (
              <Skeleton className="w-14 h-14 bg-gray-200 rounded-md" />
            ) : (
              <Image
                src={Dash2}
                alt="Total orders"
                className="object-contain w-8 h-8"
              />
            )}
          </div>
          <div>
            {loading ? (
              <>
                <Skeleton className="h-4 w-32 bg-gray-200 rounded-md" />

                <Skeleton className="h-8 w-16 mt-2 bg-gray-200 rounded-md" />
              </>
            ) : (
              <>
                <p className="text-sm font-medium text-gray-600">
                  Total Reviews
                </p>

                <p className="text-2xl font-bold text-[#106C83]">
                  {reviews?.length}
                </p>
              </>
            )}
          </div>
        </div>

        <div className="bg-white border rounded-lg p-4 flex items-start gap-3">
          <div className="w-14 h-14 rounded-md ring-1 ring-gray-300 flex items-center justify-center">
            {loading ? (
              <Skeleton className="w-14 h-14 bg-gray-200 rounded-md" />
            ) : (
              <Image
                src={Dash3}
                alt="Total orders"
                className="object-contain w-8 h-8"
              />
            )}
          </div>
          <div>
            {loading ? (
              <>
                <Skeleton className="h-4 w-32 bg-gray-200 rounded-md" />

                <Skeleton className="h-8 w-16 mt-2 bg-gray-200 rounded-md" />
              </>
            ) : (
              <>
                <p className="text-sm font-medium text-gray-600">
                  Total Orders
                </p>

                <p className="text-2xl font-bold text-[#106C83]">
                  {reviews?.length}
                </p>
              </>
            )}
          </div>
        </div>

        <div className="bg-white border rounded-lg p-4 flex items-start gap-3">
          <div className="w-14 h-14 rounded-md ring-1 ring-gray-300 flex items-center justify-center">
            {loading ? (
              <Skeleton className="w-14 h-14 bg-gray-200 rounded-md" />
            ) : (
              <Image
                src={Dash4}
                alt="Total orders"
                className="object-contain w-8 h-8"
              />
            )}
          </div>
          <div>
            {loading ? (
              <>
                <Skeleton className="h-4 w-32 bg-gray-200 rounded-md" />

                <Skeleton className="h-8 w-16 mt-2 bg-gray-200 rounded-md" />
              </>
            ) : (
              <>
                <p className="text-sm font-medium text-gray-600">
                 Total Reviewed Products
                </p>

                <p className="text-2xl font-bold text-[#106C83]">
                  {reviews?.length}
                </p>
              </>
            )}
          </div>
        </div>

     
      </div>
    </div>
  );
};

export default Reviewstat;

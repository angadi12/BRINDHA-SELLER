"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Dash1 from "@/public/Asset/orders.png";
import Dash2 from "@/public/Asset/Wallet.png";
import Dash3 from "@/public/Asset/delivery.png";
import Dash4 from "@/public/Asset/completed.png";
import Dash5 from "@/public/Asset/process.png";
import Dash6 from "@/public/Asset/Stock.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardCount } from "@/lib/Redux/Slices/dashboardSlice";
import { Skeleton } from "@/components/ui/skeleton";

const Orderstats = () => {
  const { count, loadingCount, errorCount } = useSelector(
    (state) => state.dashboard
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDashboardCount());
  }, [dispatch]);

  return (
    <div className=" overflow-auto ">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <div className="bg-white border rounded-lg p-4 flex items-start gap-3">
          <div className="w-14 h-14 rounded-md ring-1 ring-gray-300 flex items-center justify-center">
            {loadingCount ? (
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
            {loadingCount ? (
              <>
                <Skeleton className="h-4 w-32 bg-gray-200 rounded-md" />

                <Skeleton className="h-8 w-16 mt-2 bg-gray-200 rounded-md" />
              </>
            ) : (
              <>
                <p className="text-sm font-medium text-gray-600">
                  Total Earnings
                </p>

                <p className="text-2xl font-bold text-[#106C83]">
                  {count?.totalEarning}
                </p>
              </>
            )}
          </div>
        </div>
        <div className="bg-white border rounded-lg p-4 flex items-start gap-3">
          <div className="w-14 h-14 rounded-md ring-1 ring-gray-300 flex items-center justify-center">
            {loadingCount ? (
              <Skeleton className="w-14 h-14 bg-gray-200 rounded-md" />
            ) : (
              <Image
                src={Dash1}
                alt="Total orders"
                className="object-contain w-8 h-8"
              />
            )}
          </div>
          <div>
            {loadingCount ? (
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
                  {count?.totalOrders}
                </p>
              </>
            )}
          </div>
        </div>

        <div className="bg-white border rounded-lg p-4 flex items-start gap-3">
          <div className="w-14 h-14 rounded-md ring-1 ring-gray-300 flex items-center justify-center">
            {loadingCount ? (
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
            {loadingCount ? (
              <>
                <Skeleton className="h-4 w-32 bg-gray-200 rounded-md" />

                <Skeleton className="h-8 w-16 mt-2 bg-gray-200 rounded-md" />
              </>
            ) : (
              <>
                <p className="text-sm font-medium text-gray-600">
                  Pending Deliveries
                </p>

                <p className="text-2xl font-bold text-[#106C83]">
                  {count?.totalPending}
                </p>
              </>
            )}
          </div>
        </div>
        <div className="bg-white border rounded-lg p-4 flex items-start gap-3">
          <div className="w-14 h-14 rounded-md ring-1 ring-gray-300 flex items-center justify-center">
            {loadingCount ? (
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
            {loadingCount ? (
              <>
                <Skeleton className="h-4 w-32 bg-gray-200 rounded-md" />

                <Skeleton className="h-8 w-16 mt-2 bg-gray-200 rounded-md" />
              </>
            ) : (
              <>
                <p className="text-sm font-medium text-gray-600">
                  Total Delivered
                </p>

                <p className="text-2xl font-bold text-[#106C83]">
                  {count?.totalDelivered}
                </p>
              </>
            )}
          </div>
        </div>
        <div className="bg-white border rounded-lg p-4 flex items-start gap-3">
          <div className="w-14 h-14 rounded-md ring-1 ring-gray-300 flex items-center justify-center">
            {loadingCount ? (
              <Skeleton className="w-14 h-14 bg-gray-200 rounded-md" />
            ) : (
              <Image
                src={Dash5}
                alt="Total orders"
                className="object-contain w-8 h-8"
              />
            )}
          </div>
          <div>
            {loadingCount ? (
              <>
                <Skeleton className="h-4 w-32 bg-gray-200 rounded-md" />

                <Skeleton className="h-8 w-16 mt-2 bg-gray-200 rounded-md" />
              </>
            ) : (
              <>
                <p className="text-sm font-medium text-gray-600">
                  Total Returned
                </p>

                <p className="text-2xl font-bold text-[#106C83]">
                  {count?.totalReturned}
                </p>
              </>
            )}
          </div>
        </div>
        <div className="bg-white border rounded-lg p-4 flex items-start gap-3">
          <div className="w-14 h-14 rounded-md ring-1 ring-gray-300 flex items-center justify-center">
            {loadingCount ? (
              <Skeleton className="w-14 h-14 bg-gray-200 rounded-md" />
            ) : (
              <Image
                src={Dash6}
                alt="Total orders"
                className="object-contain w-8 h-8"
              />
            )}
          </div>
          <div>
            {loadingCount ? (
              <>
                <Skeleton className="h-4 w-32 bg-gray-200 rounded-md" />

                <Skeleton className="h-8 w-16 mt-2 bg-gray-200 rounded-md" />
              </>
            ) : (
              <>
                <p className="text-sm font-medium text-gray-600">
                  Total Cancelled
                </p>

                <p className="text-2xl font-bold text-[#106C83]">
                  {count?.totalCancelled}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orderstats;

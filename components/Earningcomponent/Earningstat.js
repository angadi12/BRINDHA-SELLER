"use client";
import React, { useEffect } from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import messages from "@/public/Asset/Wallet.png";
import accountpending from "@/public/Asset/Refund.png";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  MessageSquare,
  Send,
  ClockIcon as UserClock,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useDispatch, useSelector } from "react-redux";
import { FetchAllcount } from "@/lib/Redux/Slices/revenueSlice";

const Earningstat = () => {
  const { data, loading, error } = useSelector((state) => state.revenue);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchAllcount());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <Card className="p-4 flex shadow-none rounded-md flex-row items-start">
        <div className="bg-white p-3 rounded-md mr-4 border">
          {loading ? (
            <Skeleton className="w-8 h-8 bg-gray-200 rounded-md" />
          ) : (
            <Image
              src={messages}
              alt="Total orders"
              className="object-contain w-8 h-8"
            />
          )}
        </div>
        <div className="flex-grow">
          {loading ? (
            <>
              <Skeleton className="h-4 w-32 bg-gray-200 rounded-md" />

              <Skeleton className="h-8 w-16 mt-2 bg-gray-200 rounded-md" />
            </>
          ) : (
            <>
              <p className="text-sm font-medium text-gray-600">
                Total Payment
              </p>

              <p className="text-2xl font-bold text-[#106C83]">
                {data?.totalPaymentAmount}
              </p>
            </>
          )}
        </div>
      </Card>
      <Card className="p-4 flex shadow-none rounded-md flex-row items-start">
        <div className="bg-white p-3 rounded-md mr-4 border">
          {loading ? (
            <Skeleton className="w-8 h-8 bg-gray-200 rounded-md" />
          ) : (
            <Image
              src={accountpending}
              alt="Total orders"
              className="object-contain w-8 h-8"
            />
          )}
        </div>
        <div className="flex-grow">
          {loading ? (
            <>
              <Skeleton className="h-4 w-32 bg-gray-200 rounded-md" />

              <Skeleton className="h-8 w-16 mt-2 bg-gray-200 rounded-md" />
            </>
          ) : (
            <>
              <p className="text-sm font-medium text-gray-600">
                Total Payout
              </p>

              <p className="text-2xl font-bold text-[#106C83]">
                {data?.totalPayoutAmount}
              </p>
            </>
          )}
        </div>
      </Card>

     
    </div>
  );
};

export default Earningstat;

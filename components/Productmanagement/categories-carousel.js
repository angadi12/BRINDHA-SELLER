"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategories, fetchAllMeasurement, setSelectedCategoryId } from "@/lib/Redux/Slices/masterSlice";

export default function CategoriesCarousel() {
  const dispatch = useDispatch();

  const { categories, loading, error,selectedCategoryId } = useSelector((state) => state.master);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);




  return (
    <div className="w-full bg-white border rounded-lg mx-auto p-6 overflow-hidden">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Your Categories
      </h2>

      {loading ? (
        <div className="w-full flex justify-center items-center h-32">
          <span className="loader2"></span>
        </div>
      ) : (
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-11/12 mx-auto overflow-hidden"
        >
          <CarouselContent className="-ml-2 md:-ml-4 overflow-hidden">
            {categories?.map((category) => (
              <CarouselItem
                key={category?.CategoryId?._id}
                onClick={() =>
                  dispatch(setSelectedCategoryId(category?.CategoryId?._id))
                }
                className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div className="cursor-pointer group">
                  <div className={`bg-white rounded-lg overflow-hidden  transition-shadow duration-200`}>
                    <div className={`${selectedCategoryId===category?.CategoryId?._id?"border-2 border-[#EDC5C5]":""} aspect-[5/2] relative overflow-hidden rounded-lg`}>
                      <Image
                        src={category?.CategoryId?.Image || "/placeholder.svg"}
                        alt={category?.CategoryId?.Categoryname}
                        fill
                        className="object-contain   group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="p-3 text-center">
                      <h3 className="text-xs font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                        {category?.CategoryId?.Categoryname}
                      </h3>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-[#106C83] hover:bg-[#106C83] text-white border-[#106C83] hover:border-[#106C83] rounded-md absolute -left-6 -translate-y-1/2 -translate-x-1/2 top-1/3 " />
          <CarouselNext className="bg-[#106C83] hover:bg-[#106C83] text-white border-[#106C83] hover:border-[#106C83] rounded-md absolute -right-14 -translate-y-1/2 -translate-x-1/2 top-1/3" />
        </Carousel>
      )}
    </div>
  );
}

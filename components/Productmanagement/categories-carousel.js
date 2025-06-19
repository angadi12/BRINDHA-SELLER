"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import catimage from "@/public/Asset/catimage.png"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"


const categories = [
  {
    id: 1,
    name: "Sewing Machine",
    image: catimage,
  },
  {
    id: 2,
    name: "Threads",
    image: catimage,
  },
  {
    id: 3,
    name: "Cutting Tools",
    image: catimage,
  },
  {
    id: 4,
    name: "Fabrics",
    image: catimage,
  },
  {
    id: 5,
    name: "Patterns",
    image: catimage,
  },
  {
    id: 6,
    name: "Notions",
    image: catimage,
  },
]

export default function CategoriesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 4
  const maxIndex = Math.max(0, categories.length - itemsPerView)

  const scrollLeft = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1))
  }

  const scrollRight = () => {
    setCurrentIndex(Math.min(maxIndex, currentIndex + 1))
  }

  return (
   <div className="w-full bg-white border rounded-lg mx-auto p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Your Categories</h2>

      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-11/12 mx-auto"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {categories.map((category) => (
            <CarouselItem key={category.id} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
              <div className="cursor-pointer group">
                <div className="bg-white rounded-lg overflow-hidden  transition-shadow duration-200">
                  <div className="aspect-[5/2] relative overflow-hidden rounded-lg">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <div className="p-3 text-center">
                    <h3 className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                      {category.name}
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
    </div>
  )
}

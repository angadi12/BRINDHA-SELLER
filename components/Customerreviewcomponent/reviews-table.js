"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Filter, Star } from "lucide-react";
import Productimage from "@/public/Asset/Product.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTickets } from "@/lib/Redux/Slices/reviewSlice";
import { useEffect } from "react";

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
      <span className="ml-2 text-sm font-medium text-gray-900">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

export default function ReviewsTable() {
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector((state) => state.reviews);


  useEffect(() => {
 dispatch(fetchAllTickets())
  }, [dispatch])
  

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 w-full ">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Reviews List</h2>
        <div className="flex items-center gap-2">
          <Select defaultValue="this-week">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="last-week">Last Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
            </SelectContent>
          </Select>
         
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border w-full overflow-hidden">

      {loading ? (
              <div className="flex items-center justify-center py-10 text-gray-500">
                <span className="loader2 " />
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-10 text-red-500">
                {error}
              </div>
            ) : reviews?.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No data available
              </div>
            ) : ( 
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                PRODUCT NAME
              </TableHead>
              <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </TableHead>
              <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                DATE
              </TableHead>
              <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                REVIEWER
              </TableHead>
              <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                RATING
              </TableHead>
              <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                REVIEW
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>


            {reviews?.map((review, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={review.productImage || "/placeholder.svg"}
                        alt={review.productName}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {review.productName}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-gray-900">{review.id}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-gray-900">{review.date}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-gray-900">
                    {review.reviewer}
                  </span>
                </TableCell>
                <TableCell>
                  <StarRating rating={review.rating} />
                </TableCell>
                <TableCell>
                  <p className="text-sm text-gray-600 w-full truncate text-wrap">
                    {review.reviewText}
                  </p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>)}
      </div>
    </div>
  );
}

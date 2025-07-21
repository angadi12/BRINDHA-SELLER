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
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
        {rating?.toFixed(1)}
      </span>
    </div>
  );
};

export default function ReviewsTable() {
  const dispatch = useDispatch();
  const { reviews, loading, error,ReviewPagination } = useSelector((state) => state.reviews);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedValue, setSelectedValue] = useState("today");

  useEffect(() => {
 dispatch(fetchAllTickets({filter:selectedValue, page: currentPage, limit: itemsPerPage }))
  }, [dispatch,selectedValue,currentPage,itemsPerPage])
  

  const handleSelectChange = (value) => {
    setSelectedValue(value);
    // filterAndSortData(value, sortValue);
  };

const handlePageChange = (newPage) => {
    const pagination = getCurrentPagination();
    if (
      pagination &&
      newPage >= 1 &&
      newPage <= pagination.totalPages &&
      newPage !== currentPage
    ) {
      setCurrentPage(newPage);
    }
  };

  // Get current pagination data based on active tab
  const getCurrentPagination = () => {
    return ReviewPagination
  };

  // Generate page numbers to display
  const getVisiblePages = () => {
    const pagination = getCurrentPagination();
    if (!pagination) return [];

    const { page: currentPageFromAPI, totalPages } = pagination;
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    // Always show first page
    range.push(1);

    // Add pages around current page
    for (
      let i = Math.max(2, currentPageFromAPI - delta);
      i <= Math.min(totalPages - 1, currentPageFromAPI + delta);
      i++
    ) {
      range.push(i);
    }

    // Always show last page if there are multiple pages
    if (totalPages > 1) {
      range.push(totalPages);
    }

    // Remove duplicates and sort
    const uniqueRange = [...new Set(range)].sort((a, b) => a - b);

    // Add ellipsis where needed
    let prev = 0;
    for (const page of uniqueRange) {
      if (page - prev > 1) {
        rangeWithDots.push("ellipsis");
      }
      rangeWithDots.push(page);
      prev = page;
    }

    return rangeWithDots;
  };

  // Reset to page 1 when switching tabs
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedValue]);



 const renderPaginationAlways = () => {
    const pagination = getCurrentPagination();

    if (!pagination) {
      return null;
    }

    const { page: currentPageFromAPI, totalPages, total } = pagination;
    const visiblePages = getVisiblePages();

    return (
      <div className="mt-6">
        <Pagination>
          <PaginationContent>
            {/* Previous Button */}
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPageFromAPI - 1);
                }}
                className={
                  currentPageFromAPI === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {/* Page Numbers - Always show at least page 1 */}
            {totalPages === 1 ? (
              <PaginationItem>
                <PaginationLink
                  href="#"
                  isActive={true}
                  className="cursor-pointer"
                >
                  1
                </PaginationLink>
              </PaginationItem>
            ) : (
              visiblePages.map((pageItem, index) => (
                <PaginationItem key={index}>
                  {pageItem === "ellipsis" ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(pageItem);
                      }}
                      isActive={pageItem === currentPageFromAPI}
                      className="cursor-pointer"
                    >
                      {pageItem}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))
            )}

            {/* Next Button */}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPageFromAPI + 1);
                }}
                className={
                  currentPageFromAPI === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        {/* Pagination Info */}
        <div className="mt-4 text-sm text-gray-500 text-center">
          Showing page {currentPageFromAPI} of {totalPages} ({total} total
          items)
        </div>
      </div>
    );
  };

 const renderPagination = () => {
    const pagination = getCurrentPagination();

    // Show pagination info even if there's only one page
    if (!pagination) {
      return null;
    }

    const { page: currentPageFromAPI, totalPages, total } = pagination;

    // Option 1: Always show pagination (even for single page)
    // Comment out the line below if you want to always show pagination
    if (totalPages <= 1) {
      return (
        <div className="mt-6">
          <div className="text-sm text-gray-500 text-center">
            Showing {total} item{total !== 1 ? "s" : ""} (Page 1 of 1)
          </div>
        </div>
      );
    }

    // Option 2: Only show full pagination for multiple pages
    const visiblePages = getVisiblePages();

    return (
      <div className="mt-6">
        <Pagination>
          <PaginationContent>
            {/* Previous Button */}
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPageFromAPI - 1);
                }}
                className={
                  currentPageFromAPI === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {/* Page Numbers */}
            {visiblePages.map((pageItem, index) => (
              <PaginationItem key={index}>
                {pageItem === "ellipsis" ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(pageItem);
                    }}
                    isActive={pageItem === currentPageFromAPI}
                    className="cursor-pointer"
                  >
                    {pageItem}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            {/* Next Button */}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPageFromAPI + 1);
                }}
                className={
                  currentPageFromAPI === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        {/* Pagination Info */}
        <div className="mt-4 text-sm text-gray-500 text-center">
          Showing page {currentPageFromAPI} of {totalPages} ({total} total
          items)
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 w-full ">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Reviews List</h2>
        <div className="flex items-center gap-2">
           <Select value={selectedValue} onValueChange={handleSelectChange}>
                <SelectTrigger className="w-[130px] border-gray-200 bg-white text-sm">
                  <SelectValue placeholder="today" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
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
                        src={review?.ProductId?.Images[0] || "/placeholder.svg"}
                        alt={review?.ProductId?.Name || "product-name"}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {review?.ProductId?.Name}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-gray-900">ID:{review?._id.slice(-8)}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-gray-900">
                   {new Date(review?.updatedAt)?.toLocaleDateString(
                            "en-GB"
                          )}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-gray-900">
                    {review?.UserId?.Username}
                  </span>
                </TableCell>
                <TableCell>
                  <StarRating rating={review?.rating} />
                </TableCell>
                <TableCell>
                  <p className="text-sm text-gray-600 w-full truncate text-wrap">
                    {review?.remarks}
                  </p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>)}
      </div>
             {renderPagination()}

    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Filter } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, Mail, Phone, Store, ChevronRight } from "lucide-react";
import dashiconsstore from "@/public/Asset/dashiconsstore.png";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSellars } from "@/lib/Redux/Slices/sellarSlice";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { fetchAllorders } from "@/lib/Redux/Slices/orderSlice";
import { useRouter } from "next/navigation";

const Ordermanagement = () => {
  const [profileTab, setProfileTab] = useState("all");
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState("today");
  const { data, loading, error ,Pagination} = useSelector((state) => state.order);
const router=useRouter()
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10)

  useEffect(() => {
    dispatch(fetchAllorders({filter:selectedValue, page: currentPage, limit: itemsPerPage }));
  }, [dispatch, selectedValue]);

  const handleSelectChange = (value) => {
    setSelectedValue(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
    return profileTab === "all"
      ? Pagination
      : Pagination;
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


  return (
    <div className="w-full rounded-lg border h-full bg-white p-4">
      {/* Main Tabs */}
      <Tabs defaultValue="all" className="">
        <TabsList className="p-0 bg-transparent space-x-2 h-auto w-full mb-4">
          <div className="flex justify-between items-center w-full">
            <div>
              <span className="text-sm text-[#1F1F1F] font-semibold ">
                All Order List
              </span>
            </div>

            <div className="flex justify-between gap-4 items-center   ">
              {/* <Select defaultValue="Active">
                <SelectTrigger className="w-[180px] border rounded-md">
                  <SelectValue
                    placeholder="Status"
                    className="text-[#333333]"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                </SelectContent>
              </Select> */}
              <div className="flex items-center gap-2 ml-4 shrink-0">
                <Select
                  value={selectedValue}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger className="w-[130px] border-gray-200 bg-white text-sm">
                    <SelectValue placeholder="today" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="year">This year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </TabsList>

        <TabsContent value="all">
          {/* Table */}
          <div className=" rounded-md">
            {loading ? (
              <div className="flex items-center justify-center py-10 text-gray-500">
                <span className="loader2 " />
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-10 text-red-500">
                {error}
              </div>
            ) : data?.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No data available
              </div>
            ) : (
              <Table>
                <TableHeader className="bg-gray-50 border border-gray-300 rounded-md">
                  <TableRow className="">
                    <TableHead className="text-xs font-medium text-gray-500 uppercase">
                      Order id.
                    </TableHead>
                    <TableHead className="text-xs font-medium text-gray-500 uppercase">
                      date
                    </TableHead>

                    <TableHead className="text-xs font-medium text-gray-500 uppercase">
                      Items
                    </TableHead>
                    <TableHead className="text-xs font-medium text-gray-500 uppercase">
                      payment type
                    </TableHead>
                    <TableHead className="text-xs font-medium text-gray-500 uppercase">
                      amount
                    </TableHead>
                    <TableHead className="text-xs font-medium text-gray-500 uppercase">
                      status
                    </TableHead>
                    <TableHead className="text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.map((application, index) => (
                    <TableRow
                      key={index}
                      className="border-b border-gray-200 h-12"
                    >
                      <TableCell className="font-medium">
                        ID: {application?.orderId.slice(-8)}
                      </TableCell>
                      <TableCell>{formatDate(application?.createdAt)}</TableCell>
                      <TableCell>
                        {application?.vendorSubOrders[0]?.products?.length}
                      </TableCell>
                      <TableCell>{application?.paymentMode}</TableCell>
                      <TableCell>
                        {application?.vendorSubOrders[0]?.total}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`font-medium text-xs ${
                            application?.vendorSubOrders[0]?.status ===
                            "Pending"
                              ? "text-amber-500 rounded-full p-1 bg-amber-50 border border-amber-500"
                              : application?.vendorSubOrders[0]?.status === "Completed"
                              ? "text-green-500 bg-green-50 border border-green-500 rounded-full p-1"
                              : application?.vendorSubOrders[0]?.status === "Delivered"
                              ? "text-green-500 bg-green-50 border border-green-500 rounded-full p-1"
                              : application?.vendorSubOrders[0]?.status === "Cancelled"
                              ? "text-red-500 bg-red-50 border border-red-500 rounded-full p-1"
                              : "text-gray-500"
                          }`}
                        >
                          {application?.vendorSubOrders[0]?.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                         onClick={()=>router.push(`/Order-Management/Vieworder/${application?.orderId}`)}
                          className="text-[#106C83] hover:underline font-medium cursor-pointer"
                        >
                          View Details
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
       {renderPaginationAlways()}
          {/* {!loading && !error && data?.length > 0 && (
            <div className="flex justify-center mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        handlePageChange(Math.max(1, currentPage - 1))
                      }
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => handlePageChange(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        handlePageChange(Math.min(totalPages, currentPage + 1))
                      }
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )} */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Ordermanagement;

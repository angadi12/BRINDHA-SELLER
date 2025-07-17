"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  FetchAllpaidpayout,
  FetchAllpendingpayout,
} from "@/lib/Redux/Slices/revenueSlice";

const filterAndSortData = (filterValue, sortValue) => {
  // Implement filtering and sorting logic here
};

export default function Earningtable() {
  const [selectedValue, setSelectedValue] = useState("this-week");
  const [sortValue, setSortValue] = useState("sort-by");
  const [profileTab, setProfileTab] = useState("all");
  const [Tab, setTab] = useState("applications");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const router = useRouter();
  const [filteredData, setFilteredData] = useState([]);

  const {
    pendingpayout,
    pendingpayoutloading,
    pendingpayouterror,
    pendingpayoutPagination,
  } = useSelector((state) => state.revenue);

  const {
    paidpayout,
    paidpayoutloading,
    paidpayouterror,
    paidpayoutPagination,
  } = useSelector((state) => state.revenue);

  const dispatch = useDispatch();

  console.log("Paid Pagination:", paidpayoutPagination);
  console.log("Pending Pagination:", pendingpayoutPagination);

  useEffect(() => {
    if (profileTab === "all") {
      dispatch(FetchAllpaidpayout({ page: currentPage, limit: itemsPerPage }));
    }
    if (profileTab === "pending") {
      dispatch(
        FetchAllpendingpayout({ page: currentPage, limit: itemsPerPage })
      );
    }
  }, [dispatch, profileTab, currentPage, itemsPerPage]);

  const handleSelectChange = (value) => {
    setSelectedValue(value);
    // filterAndSortData(value, sortValue);
  };

  const handleSortChange = (value) => {
    setSortValue(value);
    filterAndSortData(selectedValue, value); // Combine filtering and sorting
  };

  const convertToIST = (date) => {
    const utcDate = new Date(date);
    // IST is UTC + 5:30
    const istOffset = 5.5 * 60 * 60 * 1000;
    return new Date(utcDate.getTime() + istOffset);
  };

  const handletabchange = (value) => {
    setTab(value);
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
      ? paidpayoutPagination
      : pendingpayoutPagination;
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
  }, [profileTab]);

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

  // Alternative: Always show pagination component (for testing)
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
      <Tabs value={Tab} onValueChange={handletabchange} className="">
        <TabsContent value="applications">
          {/* Profile Tabs and Filters */}
          <div className="flex justify-between items-center mb-4">
            <div className="border-b border-gray-200 w-full">
              <div className="flex -mb-px">
                <button
                  onClick={() => setProfileTab("all")}
                  className={`mr-8 py-4 text-sm font-medium cursor-pointer ${
                    profileTab === "all"
                      ? "border-b-2 border-[#106C83] text-[#106C83]"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  All Payments
                </button>
                <button
                  onClick={() => setProfileTab("pending")}
                  className={`mr-8 py-4 text-sm font-medium cursor-pointer ${
                    profileTab === "pending"
                      ? "border-b-2 border-[#106C83] text-[#106C83]"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  All Payout
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 ml-4 shrink-0">
              <Select value={selectedValue} onValueChange={handleSelectChange}>
                <SelectTrigger className="w-[130px] border-gray-200 bg-white text-sm">
                  <SelectValue placeholder="This Week" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="this-year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Table */}
          {profileTab === "all" && (
            <div className="rounded-md">
              {paidpayoutloading ? (
                <div className="flex items-center justify-center py-10 text-gray-500">
                  <span className="loader2 " />
                </div>
              ) : paidpayouterror ? (
                <div className="flex items-center justify-center py-10 text-red-500">
                  {paidpayouterror}
                </div>
              ) : paidpayout?.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No data available
                </div>
              ) : (
                <>
                  <Table>
                    <TableHeader className="bg-gray-50 border border-gray-300 rounded-md">
                      <TableRow className="">
                        <TableHead className="text-xs font-medium text-gray-500">
                          NAME
                        </TableHead>
                        <TableHead className="text-xs font-medium text-gray-500">
                          ID
                        </TableHead>
                        <TableHead className="text-xs font-medium text-gray-500 uppercase">
                          paymentMode
                        </TableHead>
                        <TableHead className="text-xs font-medium text-gray-500">
                          DATE
                        </TableHead>
                        <TableHead className="text-xs font-medium text-gray-500 uppercase">
                          amount
                        </TableHead>
                        <TableHead className="text-xs font-medium text-gray-500 uppercase">
                          commissionAmount
                        </TableHead>
                        <TableHead className="text-xs font-medium text-gray-500">
                          STATUS
                        </TableHead>
                        <TableHead className="text-xs font-medium text-gray-500">
                          ACTION
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paidpayout?.map((application, index) => (
                        <TableRow
                          key={index}
                          className="border-b border-gray-200 h-12"
                        >
                          <TableCell className="font-medium">
                            {application?.user?.Username}
                          </TableCell>
                          <TableCell>
                            #ID{application?.userId.slice(-8)}
                          </TableCell>
                          <TableCell>{application?.paymentMode}</TableCell>
                          <TableCell>
                            {new Date(
                              application?.createdAt
                            )?.toLocaleDateString("en-GB")}
                          </TableCell>
                          <TableCell>{application.amount}</TableCell>
                          <TableCell>{application?.commissionAmount}</TableCell>
                          <TableCell>
                            <Badge
                              className={`font-medium ${
                                application.PayoutStatus === "Pending"
                                  ? "text-amber-500 border-amber-200 bg-amber-50"
                                  : application.PayoutStatus === "Completed"
                                  ? "text-green-500 border-green-200 bg-green-50"
                                  : application.PayoutStatus === "Rejected"
                                  ? "text-red-500"
                                  : "text-gray-500"
                              }`}
                            >
                              {application.PayoutStatus}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className="text-[#106C83] cursor-pointer hover:underline font-medium">
                              View Invoice
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {renderPaginationAlways()}
                </>
              )}
            </div>
          )}

          {profileTab === "pending" && (
            <div className="rounded-md">
              {pendingpayoutloading ? (
                <div className="flex items-center justify-center py-10 text-gray-500">
                  <span className="loader2 " />
                </div>
              ) : pendingpayouterror ? (
                <div className="flex items-center justify-center py-10 text-red-500">
                  {pendingpayouterror}
                </div>
              ) : pendingpayout?.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No data available
                </div>
              ) : (
                <>
                  <Table>
                    <TableHeader className="bg-gray-50 border border-gray-300 rounded-md">
                      <TableRow className="">
                        <TableHead className="text-xs font-medium text-gray-500">
                          ID
                        </TableHead>
                        <TableHead className="text-xs font-medium text-gray-500 uppercase">
                          paymentMode
                        </TableHead>
                        <TableHead className="text-xs font-medium text-gray-500">
                          DATE
                        </TableHead>
                        <TableHead className="text-xs font-medium text-gray-500 uppercase">
                          amount
                        </TableHead>
                        <TableHead className="text-xs font-medium text-gray-500 uppercase">
                          commissionAmount
                        </TableHead>
                        <TableHead className="text-xs font-medium text-gray-500">
                          STATUS
                        </TableHead>
                        <TableHead className="text-xs font-medium text-gray-500">
                          ACTION
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingpayout?.map((application, index) => (
                        <TableRow
                          key={index}
                          className="border-b border-gray-200 h-12"
                        >
                          <TableCell>
                            #ID{application?.payments[0]?.userId.slice(-8)}
                          </TableCell>
                          <TableCell>
                            {application?.payments[0]?.paymentMode}
                          </TableCell>
                          <TableCell>
                            {new Date(
                              application?.createdAt
                            )?.toLocaleDateString("en-GB")}
                          </TableCell>
                          <TableCell>
                            {application?.payments[0]?.amount}
                          </TableCell>
                          <TableCell>
                            {application?.payments[0]?.commissionAmount}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`font-medium ${
                                application.status === "Pending"
                                  ? "text-amber-500 border-amber-200 bg-amber-50"
                                  : application.status === "Completed"
                                  ? "text-green-500 border-green-200 bg-green-50"
                                  : application.status === "Rejected"
                                  ? "text-red-500"
                                  : "text-gray-500"
                              }`}
                            >
                              {application.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className="text-[#106C83] cursor-pointer hover:underline font-medium">
                              View Invoice
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {renderPaginationAlways()}
                </>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

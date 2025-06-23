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
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { fetchAllorders } from "@/lib/Redux/Slices/orderSlice";

const Ordermanagement = () => {
  const [profileTab, setProfileTab] = useState("all");
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState("today");
  const { data, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchAllorders(selectedValue));
  }, [dispatch, selectedValue]);

  const handleSelectChange = (value) => {
    setSelectedValue(value);
  };

  const activeSellers = [
    {
      businessName: "Business Name",
      website: "www.businessname.com",
      address: "This is for a sample address",
      email: "businessname@gmail.com",
      phone: "+91 9738687282",
      alternatePhone: "+91 6783567389",
      rating: 5.0,
      reviews: 23,
      totalProducts: 234,
      revenue: 6876,
      commission: 1876,
    },
    {
      businessName: "Business Name",
      website: "www.businessname.com",
      address: "This is for a sample address",
      email: "businessname@gmail.com",
      phone: "+91 9738687282",
      alternatePhone: "+91 6783567389",
      rating: 5.0,
      reviews: 23,
      totalProducts: 234,
      revenue: 6876,
      commission: 1876,
    },
    {
      businessName: "Business Name",
      website: "www.businessname.com",
      address: "This is for a sample address",
      email: "businessname@gmail.com",
      phone: "+91 9738687282",
      alternatePhone: "+91 6783567389",
      rating: 5.0,
      reviews: 23,
      totalProducts: 234,
      revenue: 6876,
      commission: 1876,
    },
    {
      businessName: "Business Name",
      website: "www.businessname.com",
      address: "This is for a sample address",
      email: "businessname@gmail.com",
      phone: "+91 9738687282",
      alternatePhone: "+91 6783567389",
      rating: 5.0,
      reviews: 23,
      totalProducts: 234,
      revenue: 6876,
      commission: 1876,
    },
  ];

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
                    customer name
                  </TableHead>
                  <TableHead className="text-xs font-medium text-gray-500 uppercase">
                    EMAIL ID
                  </TableHead>
                  <TableHead className="text-xs font-medium text-gray-500 uppercase">
                    location
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
                      {/* ID: {application?.orderId.slice(-8)} */}
                    </TableCell>
                    <TableCell>{application?.userDetails?.Username}</TableCell>
                    <TableCell>{application?.userDetails?.Email}</TableCell>
                    <TableCell>{application?.shippingDetails?.City}</TableCell>
                    <TableCell>{application?.products?.length}</TableCell>
                    <TableCell>{application?.payment?.paymentMode}</TableCell>
                    <TableCell>{application?.payment?.amount}</TableCell>
                    <TableCell>{application?.payment?.amount}</TableCell>
                    <TableCell>
                      <span
                        className={`font-medium ${
                          application?.subOrderStatus === "Pending"
                            ? "text-amber-500"
                            : application?.subOrderStatus === "Completed"
                            ? "text-green-500"
                            : application?.subOrderStatus === "Rejected"
                            ? "text-red-500"
                            : "text-gray-500"
                        }`}
                      >
                        {application?.subOrderStatus}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        href="#"
                        className="text-[#106C83] hover:underline font-medium"
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

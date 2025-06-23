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
import { Button } from "@heroui/react";
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
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { FetchAllpaidpayout, FetchAllpendingpayout } from "@/lib/Redux/Slices/revenueSlice";

export default function Earningtable() {
  const [selectedValue, setSelectedValue] = useState("this-week");
  const [sortValue, setSortValue] = useState("sort-by");
  const [profileTab, setProfileTab] = useState("all");
  const [Tab, setTab] = useState("applications");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const router = useRouter();
  const [filteredData, setFilteredData] = useState([]);

  const { pendingpayout, pendingpayoutloading, pendingpayouterror } =
    useSelector((state) => state.revenue);

  const { paidpayout, paidpayoutloading, paidpayouterror } = useSelector(
    (state) => state.revenue
  );
  const dispatch = useDispatch();


  useEffect(() => {
    if(profileTab==="all") dispatch(FetchAllpaidpayout({page:1,limit:10}));
    if(profileTab==="pending") dispatch(FetchAllpendingpayout({page:1,limit:10}));
  }, [dispatch, profileTab]);

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

  // const filterAndSortData = (period, sortBy) => {
  //   const now = new Date();
  //   const currentIST = convertToIST(now);
  //   const currentMonth = currentIST.getMonth();
  //   const currentYear = currentIST.getFullYear();

  //   const filtered = data?.filter((item) => {
  //     const createdAtIST = convertToIST(item.createdAt);
  //     const updatedAtIST = convertToIST(item.updatedAt);

  //     if (period === "this-month") {
  //       const createdInThisMonth =
  //         createdAtIST.getMonth() === currentMonth &&
  //         createdAtIST.getFullYear() === currentYear;

  //       const updatedInThisMonth =
  //         updatedAtIST.getMonth() === currentMonth &&
  //         updatedAtIST.getFullYear() === currentYear;

  //       return createdInThisMonth || updatedInThisMonth;
  //     }

  //     if (period === "this-week") {
  //       const startOfWeek = new Date(currentIST);
  //       startOfWeek.setDate(currentIST.getDate() - currentIST.getDay());
  //       startOfWeek.setHours(0, 0, 0, 0);

  //       return createdAtIST >= startOfWeek || updatedAtIST >= startOfWeek;
  //     }

  //     if (period === "this-year") {
  //       return (
  //         createdAtIST.getFullYear() === currentYear ||
  //         updatedAtIST.getFullYear() === currentYear
  //       );
  //     }

  //     return true;
  //   });

  //   const sortedData = sortData(filtered, sortBy);
  //   setFilteredData(sortedData);
  // };

  // const sortData = (data, sortBy) => {
  //   switch (sortBy) {
  //     case "name-asc":
  //       return data?.sort((a, b) =>
  //         (a?.BusinessName || "").localeCompare(b?.BusinessName || "")
  //       );
  //     case "name-desc":
  //       return data?.sort((a, b) =>
  //         (b?.BusinessName || "").localeCompare(a?.BusinessName || "")
  //       );
  //     case "rating-high":
  //       return data?.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  //     case "rating-low":
  //       return data?.sort((a, b) => (a.rating || 0) - (b.rating || 0));
  //     default:
  //       return data;
  //   }
  // };

  // useEffect(() => {
  //   filterAndSortData(selectedValue, sortValue);
  // }, [selectedValue, sortValue, data]);

  const handletabchange = (value) => {
    setTab(value);
  };

  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem);
  // const totalPages = Math.ceil(filteredData?.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
        { profileTab==="all" && <div className=" rounded-md">
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
              <Table>
                <TableHeader className="bg-gray-50 border border-gray-300 rounded-md">
                  <TableRow className="">
                    <TableHead className="text-xs font-medium text-gray-500">
                      BUSINESS NAME
                    </TableHead>
                    <TableHead className="text-xs font-medium text-gray-500">
                      LOCATION
                    </TableHead>
                    <TableHead className="text-xs font-medium text-gray-500">
                      OWNER NAME
                    </TableHead>
                    <TableHead className="text-xs font-medium text-gray-500">
                      EMAIL ID
                    </TableHead>
                    <TableHead className="text-xs font-medium text-gray-500">
                      CONTACT
                    </TableHead>
                    <TableHead className="text-xs font-medium text-gray-500">
                      REGISTRATION DATE
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
                        {application?.BussinessName}
                      </TableCell>
                      <TableCell>
                        {application?.CompanyId?.Address?.City}
                      </TableCell>
                      <TableCell>{application?.Vendorname}</TableCell>
                      <TableCell>{application.Email}</TableCell>
                      <TableCell>{application?.Number}</TableCell>
                      <TableCell>
                        {new Date(application?.createdAt)?.toLocaleDateString(
                          "en-GB"
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`font-medium ${
                            application.isCompanyVerified === "Pending"
                              ? "text-amber-500"
                              : application.isCompanyVerified === "Approved"
                              ? "text-green-500 border-green-200 bg-green-50"
                              : application.isCompanyVerified === "Rejected"
                              ? "text-red-500"
                              : "text-gray-500"
                          }`}
                        >
                          {application.isCompanyVerified}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {application.isCompanyVerified === "Approved" ? (
                          <span
                            onClick={() =>
                              router.push(
                                `/product-seller/profile/${application?._id}`
                              )
                            }
                            className="text-[#106C83] cursor-pointer hover:underline font-medium"
                          >
                            View Profile
                          </span>
                        ) : (
                          <span
                            onClick={() =>
                              router.push(
                                `/product-seller/profiledoc/${application?._id}`
                              )
                            }
                            className="text-[#106C83] cursor-pointer hover:underline font-medium"
                          >
                            View Details
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>}

        { profileTab==="pending" && <div className=" rounded-md">
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
              <Table>
                <TableHeader className="bg-gray-50 border border-gray-300 rounded-md">
                  <TableRow className="">
                    <TableHead className="text-xs font-medium text-gray-500">
                      BUSINESS NAME
                    </TableHead>
                    <TableHead className="text-xs font-medium text-gray-500">
                      LOCATION
                    </TableHead>
                    <TableHead className="text-xs font-medium text-gray-500">
                      OWNER NAME
                    </TableHead>
                    <TableHead className="text-xs font-medium text-gray-500">
                      EMAIL ID
                    </TableHead>
                    <TableHead className="text-xs font-medium text-gray-500">
                      CONTACT
                    </TableHead>
                    <TableHead className="text-xs font-medium text-gray-500">
                      REGISTRATION DATE
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
                        {application?.BussinessName}
                      </TableCell>
                      <TableCell>
                        {application?.CompanyId?.Address?.City}
                      </TableCell>
                      <TableCell>{application?.Vendorname}</TableCell>
                      <TableCell>{application.Email}</TableCell>
                      <TableCell>{application?.Number}</TableCell>
                      <TableCell>
                        {new Date(application?.createdAt)?.toLocaleDateString(
                          "en-GB"
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`font-medium ${
                            application.isCompanyVerified === "Pending"
                              ? "text-amber-500"
                              : application.isCompanyVerified === "Approved"
                              ? "text-green-500 border-green-200 bg-green-50"
                              : application.isCompanyVerified === "Rejected"
                              ? "text-red-500"
                              : "text-gray-500"
                          }`}
                        >
                          {application.isCompanyVerified}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {application.isCompanyVerified === "Approved" ? (
                          <span
                            onClick={() =>
                              router.push(
                                `/product-seller/profile/${application?._id}`
                              )
                            }
                            className="text-[#106C83] cursor-pointer hover:underline font-medium"
                          >
                            View Profile
                          </span>
                        ) : (
                          <span
                            onClick={() =>
                              router.push(
                                `/product-seller/profiledoc/${application?._id}`
                              )
                            }
                            className="text-[#106C83] cursor-pointer hover:underline font-medium"
                          >
                            View Details
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>}

      
        </TabsContent>

       
      </Tabs>
    </div>
  );
}

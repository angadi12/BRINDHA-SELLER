"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

const Productmanagement = () => {
  const [activeTab, setActiveTab] = useState("seller");
  const router = useRouter();

  return (
    <div className="w-full rounded-lg border bg-white p-3 mt-4 relative">
      <div className="flex w-full items-center justify-between ">
        <Tabs
          defaultValue="seller"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-[600px] grid-cols-2 mb-4 bg-white">
            <TabsTrigger
              value="seller"
              className={`text-sm border-0 rounded-none font-medium ${
                activeTab === "seller" ? "border-b-2 border-[#106C83]" : ""
              }`}
            >
              Products under this category{" "}
            </TabsTrigger>
            <TabsTrigger
              value="provider"
              className={`text-sm border-0 rounded-none shadow-none  text-[#939393] font-medium ${
                activeTab === "provider"
                  ? "border-b-2 text-black border-[#106C83]"
                  : ""
              }`}
            >
              Products Status{" "}
            </TabsTrigger>
          </TabsList>

          <div className="absolute right-4 top-4 ">
            <Button
              onClick={() => router.push("/addproduct")}
              variant="default"
              className="bg-[#106C83] hover:bg-[#106C83] cursor-pointer"
            >
              +Add Product
            </Button>
          </div>

          <TabsContent value="seller" className="mt-2">
            {/* {loading ? (
              <div className="flex items-center justify-center py-10 text-gray-500">
                <span className="loader2 " />
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-10 text-red-500">
                {error}
              </div>
            ) : data?.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No seller applications available
              </div>
            ) : ( */}
            <Table>
              <TableHeader className="bg-gray-100 border border-gray-300">
                <TableRow>
                  <TableHead className="text-[#9C9C9C] text-sm font-medium">
                    BUSINESS NAME
                  </TableHead>
                  <TableHead className="text-[#9C9C9C] text-sm font-medium">
                    LOCATION
                  </TableHead>
                  <TableHead className="text-[#9C9C9C] text-sm font-medium">
                    OWNER NAME
                  </TableHead>
                  <TableHead className="text-[#9C9C9C] text-sm font-medium">
                    EMAIL ID
                  </TableHead>
                  <TableHead className="text-[#9C9C9C] text-sm font-medium">
                    CONTACT
                  </TableHead>
                  <TableHead className="text-[#9C9C9C] text-sm font-medium">
                    STATUS
                  </TableHead>
                  <TableHead className="text-[#9C9C9C] text-sm font-medium">
                    ACTION
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[]?.map((application, index) => (
                  <TableRow
                    key={index}
                    className="border-t border-gray-200 h-14 hover:bg-gray-50 transition-all"
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
                      <Badge
                        variant="outline"
                        className={`
                            ${
                              application.CompanyId === "Pending"
                                ? "text-amber-500 border-amber-200 bg-amber-50"
                                : ""
                            }
                            ${
                              application?.isCompanyVerified === "Approved"
                                ? "text-green-500 border-green-200 bg-green-50"
                                : ""
                            }
                          `}
                      >
                        {application?.isCompanyVerified}
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
                          className="text-[#106C83] hover:underline font-medium"
                        >
                          View Profile
                        </span>
                      ) : (
                        <DocumentApprovalPage />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* )} */}
          </TabsContent>

          <TabsContent value="provider" className="mt-4">
            <div className="text-center py-8 text-gray-500">
              No service provider applications available
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Productmanagement;

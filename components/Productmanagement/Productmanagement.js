"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "@/lib/Redux/Slices/productSlice";
import Image from "next/image";
import { Edit, Eye, Trash2 } from "lucide-react";

const Productmanagement = () => {
  const [activeTab, setActiveTab] = useState("seller");
  const [productstatus, setstatus] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const { allProducts, loadingAll, errorAll } = useSelector(
    (state) => state.product
  );
  const { categories, loading, error, selectedCategoryId } = useSelector(
    (state) => state.master
  );

  useEffect(() => {
    dispatch(
      fetchAllProducts({
        Status: productstatus,
        CategoryId: selectedCategoryId,
        SubcategoryId: "",
        Measturments: "",
        page: 1,
        limit: 10,
      })
    );
  }, [dispatch, selectedCategoryId, productstatus]);

  console.log(allProducts);
  console.log(loadingAll);
  return (
    <div className="w-full rounded-lg border bg-white p-3 mt-4 relative">
      <div className="flex w-full items-center justify-between overflow-hidden ">
        <Tabs
          defaultValue="seller"
          className="w-full"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-[600px] grid-cols-3 mb-4 bg-white">
            <TabsTrigger
              value="seller"
              onClick={() => setstatus("")}
              className={`text-sm border-0 rounded-none font-medium cursor-pointer ${
                activeTab === "seller" ? "border-b-2 border-[#106C83]" : ""
              }`}
            >
              Products under this category{" "}
            </TabsTrigger>
            <TabsTrigger
              value="provider"
              onClick={() => setstatus("Approved")}
              className={`text-sm border-0 rounded-none shadow-none  text-[#939393] font-medium cursor-pointer ${
                activeTab === "provider"
                  ? "border-b-2 text-black border-[#106C83]"
                  : ""
              }`}
            >
              Approved Product
            </TabsTrigger>
            <TabsTrigger
              value="Live"
              onClick={() => setstatus("Live")}
              className={`text-sm border-0 rounded-none shadow-none  text-[#939393] font-medium cursor-pointer ${
                activeTab === "Live"
                  ? "border-b-2 text-black border-[#106C83]"
                  : ""
              }`}
            >
              Live Product
            </TabsTrigger>
          </TabsList>

          <div className="absolute right-4 top-4 ">
            <Button
              onClick={() => router.push("/Product-management/addproduct")}
              variant="default"
              className="bg-[#106C83] hover:bg-[#106C83] cursor-pointer"
            >
              +Add Product
            </Button>
          </div>

          <TabsContent value="seller" className="mt-2 overflow-hidden">
            {loadingAll ? (
              <div className="flex items-center justify-center py-10 text-gray-500">
                <span className="loader2 " />
              </div>
            ) : errorAll ? (
              <div className="flex items-center justify-center py-10 text-red-500">
                {errorAll}
              </div>
            ) : allProducts?.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No products available
              </div>
            ) : (
              <Table className="overflow-hidden">
                <TableHeader className="bg-gray-100 border border-gray-300">
                  <TableRow>
                    <TableHead className="text-[#9C9C9C] text-sm font-medium uppercase">
                      product name
                    </TableHead>
                    <TableHead className="text-[#9C9C9C] text-sm font-medium uppercase">
                      id
                    </TableHead>

                    <TableHead className="text-[#9C9C9C] text-sm font-medium uppercase">
                      product price
                    </TableHead>

                    <TableHead className="text-[#9C9C9C] text-sm font-medium uppercase">
                      Price on display
                    </TableHead>
                    <TableHead className="text-[#9C9C9C] text-sm font-medium uppercase">
                      Stock
                    </TableHead>
                    <TableHead className="text-[#9C9C9C] text-sm font-medium uppercase">
                      status
                    </TableHead>

                    <TableHead className="text-[#9C9C9C] text-sm font-medium uppercase">
                      ACTION
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allProducts?.map((application, index) => (
                    <TableRow
                      key={index}
                      className="border-t border-gray-200 h-14 hover:bg-gray-50 transition-all"
                    >
                      <TableCell className="font-medium flex gap-1 items-center">
                        <div className="relative h-12 w-12 rounded-md overflow-hidden bg-muted ring-1 ring-gray-300">
                          <Image
                            src={application?.Images[0]}
                            alt={application?.Name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        {application?.Name}
                      </TableCell>
                      <TableCell>#{application?._id.slice(-8)}</TableCell>
                      <TableCell>{application.Yourprice}</TableCell>
                      <TableCell>{application?.SellingPrice}</TableCell>
                      <TableCell>{application?.Stock}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`
                            ${
                              application.Status === "Pending"
                                ? "text-amber-500 border-amber-200 bg-amber-50"
                                : ""
                            }
                            ${
                              application?.Status === "Approved"
                                ? "text-green-500 border-green-200 bg-green-50"
                                : ""
                            }
                            ${
                              application?.Status === "SendForApprove"
                                ? "text-blue-500 border-blue-200 bg-blue-50"
                                : ""
                            }
                            ${
                              application?.Status === "Live"
                                ? "text-[#106C83] border-[#106C83]/60 bg-[#106C83]/10"
                                : ""
                            }
                          `}
                        >
                          {application?.Status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-1">
                         {application?.Status==="Pending" && <Button
                            onClick={() =>
                              router.push(
                                `/Product-management/updateproduct/${application?._id}`
                              )
                            }
                            variant="outline"
                            className="p-2 text-[#106C83] cursor-pointer hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                            title="Edit product"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>}

                          <Button
                            variant="outline"
                            onClick={() =>
                              router.push(
                                `/Product-management/Viewdetails/${application?._id}`
                              )
                            }
                            className="p-2 text-[#106C83] cursor-pointer hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                            title="View product"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            className="p-2 text-red-600 cursor-pointer hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                            title="Delete product"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TabsContent>

          <TabsContent value="provider" className="mt-4">
            {loadingAll ? (
              <div className="flex items-center justify-center py-10 text-gray-500">
                <span className="loader2 " />
              </div>
            ) : errorAll ? (
              <div className="flex items-center justify-center py-10 text-red-500">
                {errorAll}
              </div>
            ) : allProducts?.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No products available
              </div>
            ) : (
              <Table className="overflow-hidden">
                <TableHeader className="bg-gray-100 border border-gray-300">
                  <TableRow>
                    <TableHead className="text-[#9C9C9C] text-sm font-medium uppercase">
                      product name
                    </TableHead>
                    <TableHead className="text-[#9C9C9C] text-sm font-medium uppercase">
                      id
                    </TableHead>

                    <TableHead className="text-[#9C9C9C] text-sm font-medium uppercase">
                      product price
                    </TableHead>

                    <TableHead className="text-[#9C9C9C] text-sm font-medium uppercase">
                      Price on display
                    </TableHead>
                    <TableHead className="text-[#9C9C9C] text-sm font-medium uppercase">
                      Stock
                    </TableHead>
                    <TableHead className="text-[#9C9C9C] text-sm font-medium uppercase">
                      status
                    </TableHead>

                    <TableHead className="text-[#9C9C9C] text-sm font-medium uppercase">
                      ACTION
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allProducts?.map((application, index) => (
                    <TableRow
                      key={index}
                      className="border-t border-gray-200 h-14 hover:bg-gray-50 transition-all"
                    >
                      <TableCell className="font-medium flex gap-1 items-center">
                        <div className="relative h-12 w-12 rounded-md overflow-hidden bg-muted ring-1 ring-gray-300">
                          <Image
                            src={application?.Images[0]}
                            alt={application?.Name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        {application?.Name}
                      </TableCell>
                      <TableCell>#{application?._id.slice(-8)}</TableCell>
                      <TableCell>{application.Yourprice}</TableCell>
                      <TableCell>{application?.SellingPrice}</TableCell>
                      <TableCell>{application?.Stock}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`
                            ${
                              application.Status === "Pending"
                                ? "text-amber-500 border-amber-200 bg-amber-50"
                                : ""
                            }
                            ${
                              application?.Status === "Approved"
                                ? "text-green-500 border-green-200 bg-green-50"
                                : ""
                            }
                          `}
                        >
                          {application?.Status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-1">
                          <Button
                        
                            variant="outline"
                            className="p-2 text-[#106C83] cursor-pointer hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                            title="Edit Product"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() =>
                              router.push(
                                `/Product-management/Viewdetails/${application?._id}`
                              )
                            }
                            variant="outline"
                            className="p-2 text-[#106C83] cursor-pointer hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                            title="View Product"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            className="p-2 text-red-600 cursor-pointer hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TabsContent>
          <TabsContent value="Live" className="mt-4">
            {loadingAll ? (
              <div className="flex items-center justify-center py-10 text-gray-500">
                <span className="loader2 " />
              </div>
            ) : errorAll ? (
              <div className="flex items-center justify-center py-10 text-red-500">
                {errorAll}
              </div>
            ) : allProducts?.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No products available
              </div>
            ) : (
              <Table className="overflow-hidden">
                <TableHeader className="bg-gray-100 border border-gray-300">
                  <TableRow>
                    <TableHead className="text-[#9C9C9C] text-sm font-medium uppercase">
                      product name
                    </TableHead>
                    <TableHead className="text-[#9C9C9C] text-sm font-medium uppercase">
                      id
                    </TableHead>

                    <TableHead className="text-[#9C9C9C] text-sm font-medium uppercase">
                      product price
                    </TableHead>

                    <TableHead className="text-[#9C9C9C] text-sm font-medium uppercase">
                      Price on display
                    </TableHead>
                    <TableHead className="text-[#9C9C9C] text-sm font-medium uppercase">
                      Stock
                    </TableHead>
                    <TableHead className="text-[#9C9C9C] text-sm font-medium uppercase">
                      status
                    </TableHead>

                    <TableHead className="text-[#9C9C9C] text-sm font-medium uppercase">
                      ACTION
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allProducts?.map((application, index) => (
                    <TableRow
                      key={index}
                      className="border-t border-gray-200 h-14 hover:bg-gray-50 transition-all"
                    >
                      <TableCell className="font-medium flex gap-1 items-center">
                        <div className="relative h-12 w-12 rounded-md overflow-hidden bg-muted ring-1 ring-gray-300">
                          <Image
                            src={application?.Images[0]}
                            alt={application?.Name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        {application?.Name}
                      </TableCell>
                      <TableCell>#{application?._id.slice(-8)}</TableCell>
                      <TableCell>{application.Yourprice}</TableCell>
                      <TableCell>{application?.SellingPrice}</TableCell>
                      <TableCell>{application?.Stock}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`
                            ${
                              application.Status === "Pending"
                                ? "text-amber-500 border-amber-200 bg-amber-50"
                                : ""
                            }
                            ${
                              application?.Status === "Approved"
                                ? "text-green-500 border-green-200 bg-green-50"
                                : ""
                            }
                            ${
                              application?.Status === "Live"
                                ? "text-green-500 border-green-200 bg-green-50"
                                : ""
                            }
                          `}
                        >
                          {application?.Status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-1">
                          <Button
                            onClick={() =>
                              router.push(
                                `/Product-management/Viewdetails/${application?._id}`
                              )
                            }
                            variant="outline"
                            className="p-2 text-[#106C83] cursor-pointer hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                            title="View Product"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            className="p-2 text-red-600 cursor-pointer hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Productmanagement;

"use client";

import { Filter } from "lucide-react";
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

const taxData = [
  {
    businessName: "Business Name PVT",
    applicationId: "BRD-00123",
    location: "New York, USA",
    ownerName: "Robbin K",
    emailId: "robbink@gmail.com",
    contact: "+91 6737892767",
    registrationDate: "28-03-2025",
    taxPercentage: "3%",
  },
  {
    businessName: "Business Name PVT",
    applicationId: "BRD-00123",
    location: "New York, USA",
    ownerName: "Robbin K",
    emailId: "robbink@gmail.com",
    contact: "+91 6737892767",
    registrationDate: "28-03-2025",
    taxPercentage: "3%",
  },
  {
    businessName: "Business Name PVT",
    applicationId: "BRD-00123",
    location: "New York, USA",
    ownerName: "Robbin K",
    emailId: "robbink@gmail.com",
    contact: "+91 6737892767",
    registrationDate: "28-03-2025",
    taxPercentage: "3%",
  },
  {
    businessName: "Business Name PVT",
    applicationId: "BRD-00123",
    location: "New York, USA",
    ownerName: "Robbin K",
    emailId: "robbink@gmail.com",
    contact: "+91 6737892767",
    registrationDate: "28-03-2025",
    taxPercentage: "3%",
  },
  {
    businessName: "Business Name PVT",
    applicationId: "BRD-00123",
    location: "New York, USA",
    ownerName: "Robbin K",
    emailId: "robbink@gmail.com",
    contact: "+91 6737892767",
    registrationDate: "28-03-2025",
    taxPercentage: "3%",
  },
  {
    businessName: "Business Name PVT",
    applicationId: "BRD-00123",
    location: "New York, USA",
    ownerName: "Robbin K",
    emailId: "robbink@gmail.com",
    contact: "+91 6737892767",
    registrationDate: "28-03-2025",
    taxPercentage: "3%",
  },
];
import { fetchAllTax } from "@/lib/Redux/Slices/masterSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export function TaxTable() {
 const dispatch = useDispatch();
  const { tax, loading ,error} = useSelector((state) => state.master);

  useEffect(() => {
    dispatch(fetchAllTax());
  }, [dispatch]);

  console.log(tax)

  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 overflow-hidden p-2">
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-xl font-medium">Tax</h2>
        {/* <div className="flex items-center gap-2">
          <Select defaultValue="this-week">
            <SelectTrigger className="w-[180px] border-gray-200">
              <SelectValue placeholder="This Week" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="this-year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" className="border-gray-200">
            <Filter className="h-4 w-4" />
          </Button>
        </div> */}
      </div>

      <div className="overflow-x-auto">
       {loading ? (
              <div className="flex items-center justify-center py-10 text-gray-500">
                <span className="loader2 " />
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-10 text-red-500">
                {error}
              </div>
            ) : tax?.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No seller applications available
              </div>
            ) : (
        <Table className="p-2">
          <TableHeader className="bg-gray-50 border border-gray-200 ">
            <TableRow>
              <TableHead className="text-gray-500 text-xs font-medium">
               Tax Type
              </TableHead>
              <TableHead className="text-gray-500 text-xs font-medium">
                Percentage
              </TableHead>
              {/* <TableHead className="text-gray-500 text-xs font-medium">
                LOCATION
              </TableHead>
              <TableHead className="text-gray-500 text-xs font-medium">
                OWNER NAME
              </TableHead>
              <TableHead className="text-gray-500 text-xs font-medium">
                EMAIL ID
              </TableHead>
              <TableHead className="text-gray-500 text-xs font-medium">
                CONTACT
              </TableHead>
              <TableHead className="text-gray-500 text-xs font-medium">
                REGISTRATION DATE
              </TableHead>
              <TableHead className="text-gray-500 text-xs font-medium">
                TAX PERCENTAGE
              </TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody >
            {tax.map((item, index) => (
              <TableRow
                key={index}
               className="border-t border-gray-200 h-12 hover:bg-gray-50 transition-all"
              >
                <TableCell>{item.Taxtype}</TableCell>
                <TableCell>{item.Percentage}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>)}
      </div>
    </div>
  );
}

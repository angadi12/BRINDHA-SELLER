"use client"

import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { fetchAllMeasurement } from "@/lib/Redux/Slices/masterSlice"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"



export function MeasurementsTable() {
 const dispatch = useDispatch();
  const { measurement, loading ,error} = useSelector((state) => state.master);

  useEffect(() => {
    dispatch(fetchAllMeasurement());
  }, [dispatch]);

  console.log(measurement)



  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-xl font-medium">Measurements</h2>
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
            ) : measurement?.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No data available
              </div>
            ) : (
        <Table>
          <TableHeader className="bg-gray-50 border-y border-gray-200">
            <TableRow>
              <TableHead className="text-gray-500 text-sm font-medium">Measurement</TableHead>
              {/* <TableHead className="text-gray-500 text-sm font-medium">ID</TableHead>
              <TableHead className="text-gray-500 text-sm font-medium">CREATED ON</TableHead>
              <TableHead className="text-gray-500 text-sm font-medium">PRODUCT PRICE</TableHead>
              <TableHead className="text-gray-500 text-sm font-medium">MEASUREMENTS</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {measurement?.map((item, index) => (
              <TableRow key={index} className="hover:bg-gray-50 border-b border-gray-200">
                <TableCell>
                  <div className="flex items-center gap-3">
                    {/* <div className="h-12 w-12 bg-gray-100 rounded overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=48&width=48"
                        alt={item.productName}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div> */}
                    <span>{item?.measurement}</span>
                  </div>
                </TableCell>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.createdOn}</TableCell>
                <TableCell>{item.productPrice}</TableCell>
                <TableCell>{item.measurements}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>)}
      </div>
    </div>
  )
}

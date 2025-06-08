"use client"

import { useState } from "react"
import { Calendar, ChevronDown } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"

export default function Component() {
  const [selectedMonth, setSelectedMonth] = useState("May,2024")

  // Sample data for Orders chart
  const ordersData = [
    { month: "Jan", sales: 80 },
    { month: "Feb", sales: 48 },
    { month: "Mar", sales: 40 },
    { month: "Apr", sales: 32 },
    { month: "May", sales: 28 },
    { month: "Jun", sales: 88 },
    { month: "Jul", sales: 64 },
    { month: "Aug", sales: 45 },
    { month: "Sep", sales: 32 },
    { month: "Oct", sales: 70 },
    { month: "Nov", sales: 42 },
    { month: "Dec", sales: 64 },
  ]

  // Sample data for Earnings chart
  const earningsData = [
    { month: "Jan", profit: 1.8 },
    { month: "Feb", profit: 1.2 },
    { month: "Mar", profit: 2.2 },
    { month: "Apr", profit: 1.9 },
    { month: "May", profit: 1.6 },
    { month: "Jun", profit: 3.5 },
    { month: "Jul", profit: 1.4 },
    { month: "Aug", profit: 0.8 },
    { month: "Sep", profit: 1.3 },
    { month: "Oct", profit: 2.5 },
    { month: "Nov", profit: 2.4 },
    { month: "Dec", profit: 1.8 },
  ]

  const ordersChartConfig = {
    sales: {
      label: "Sales",
      color: "#106C83",
    },
  }

  const earningsChartConfig = {
    profit: {
      label: "Profit",
      color: "#106C83",
    },
  }

  // Custom bar component to handle June highlighting
  const CustomBar = ({ fill, payload, ...props }) => {
    const isJune = payload?.month === "Jun"
    return <rect {...props} fill={isJune ? "#f8b4cb" : "#106C83"} className="transition-colors duration-200" />
  }

  return (
    <div className="grid grid-cols-2 gap-2 bg-gray-50 h-auto overflow-hidden">
      {/* Orders Chart */}
      <Card className="flex-1 w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
          <CardTitle className="text-xl font-semibold">Orders</CardTitle>
          <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
            <Calendar className="w-4 h-4 mr-2" />
            {selectedMonth}
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </CardHeader>
        <CardContent>
          <ChartContainer config={ordersChartConfig} className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ordersData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={true} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
                <YAxis
                  domain={[0, 100]}
                  axisLine={true}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#106C83" }}
                  label={{
                    value: "Sales",
                    angle: -90,
                    position: "insideLeft",
                    style: { textAnchor: "middle", fill: "#106C83", fontSize: "12px" },
                  }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="sales" shape={CustomBar} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="text-center mt-2 text-sm text-gray-500 font-medium">Months</div>
        </CardContent>
      </Card>

      {/* Earnings Chart */}
      <Card className="flex-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
          <CardTitle className="text-xl font-semibold">Earnings</CardTitle>
          <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
            <Calendar className="w-4 h-4 mr-2" />
            {selectedMonth}
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </CardHeader>
        <CardContent>
          <ChartContainer config={earningsChartConfig} className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={earningsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={true} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
                <YAxis
                  domain={[0, 5]}
                  axisLine={true}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  tickFormatter={(value) => `$${value}k`}
                  label={{
                    value: "Profit",
                    angle: -90,
                    position: "insideLeft",
                    style: { textAnchor: "middle", fill: "#6b7280", fontSize: "12px" },
                  }}
                />
                <ChartTooltip content={<ChartTooltipContent formatter={(value) => [`$${value}k`, "Profit"]} />} />
                <Bar dataKey="profit" shape={CustomBar} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="text-center mt-2 text-sm text-gray-500 font-medium">Months</div>
        </CardContent>
      </Card>
    </div>
  )
}

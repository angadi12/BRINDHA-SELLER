"use client";

import { useEffect, useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEarningGraph,
  fetchOrderGraph,
} from "@/lib/Redux/Slices/dashboardSlice";

export default function Component() {
  const [selectedValue, setSelectedValue] = useState("week");
  const [selectedValueearn, setSelectedValueearn] = useState("week");

  const handleSelectChange = (value) => {
    setSelectedValue(value);
  };
  const handleSelectChangeearn = (value) => {
    setSelectedValueearn(value);
  };

  const {
    orderGraph,
    loadingOrder,
    errorOrder,
    earningGraph,
    loadingEarning,
    errorEarning,
  } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrderGraph(selectedValue));
  }, [dispatch, selectedValue]);

  useEffect(() => {
    dispatch(fetchEarningGraph(selectedValueearn));
  }, [dispatch, selectedValueearn]);

  const ordersChartConfig = {
    orders: {
      label: "Orders",
      color: "#106C83",
    },
  };

  const earningsChartConfig = {
    earning: {
      label: "Earning",
      color: "#106C83",
    },
  };

  const shortMonth = new Date().toLocaleString('default', { month: 'short' });

  const CustomBar = ({ fill, payload, ...props }) => {
    const isJune = payload?.month === shortMonth;
    return (
      <rect
        {...props}
        fill={isJune ? "#f8b4cb" : "#106C83"}
        className="transition-colors duration-200"
      />
    );
  };

  return (
    <div className="grid grid-cols-2 gap-4 bg-gray-50 h-auto overflow-hidden">
      {/* Orders Chart */}
      <Card className="flex-1 w-full shadow-none ">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-8">
          <CardTitle className="text-lg font-semibold">Orders</CardTitle>
          <div className="flex items-center gap-2 ml-4 shrink-0">
            <Select value={selectedValue} onValueChange={handleSelectChange}>
              <SelectTrigger className="w-[130px] border-gray-200 bg-white text-sm">
                <SelectValue placeholder="This Week" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={ordersChartConfig} className="h-64 w-full">
           {loadingOrder ? (
              <div className="flex items-center justify-center py-10 text-gray-500 w-full h-full">
                <span className="loader2 " />
              </div>
            ) : errorOrder ? (
              <div className="flex items-center justify-center py-10 text-red-500">
                {errorOrder}
              </div>
            ) :!orderGraph ? (
              <div className="text-center py-8 text-gray-500">
                No data available
              </div>
            ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={orderGraph}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey={selectedValue === "week" ? "day" : "month"}
                  axisLine={true}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                />
                <YAxis
                  domain={[0, 100]}
                  axisLine={true}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#106C83" }}
                  label={{
                    value: "orders",
                    angle: -90,
                    position: "insideLeft",
                    style: {
                      textAnchor: "middle",
                      fill: "#106C83",
                      fontSize: "12px",
                    },
                  }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="orders" shape={CustomBar} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>)}
          </ChartContainer>
          <div className="text-center mt-2 text-sm text-gray-500 font-medium">
            {selectedValue === "week" ? "day" : "months"}
          </div>
        </CardContent>
      </Card>

      {/* Earnings Chart */}
      <Card className="flex-1 shadow-none w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-8">
          <CardTitle className="text-lg font-semibold">Earnings</CardTitle>
          <div className="flex items-center gap-2 ml-4 shrink-0">
            <Select
              value={selectedValueearn}
              onValueChange={handleSelectChangeearn}
            >
              <SelectTrigger className="w-[130px] border-gray-200 bg-white text-sm">
                <SelectValue placeholder="This Week" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={earningsChartConfig} className="h-64 w-full">
            {loadingEarning ? (
              <div className="flex items-center justify-center py-10 text-gray-500 w-full h-full">
                <span className="loader2 " />
              </div>
            ) : errorEarning ? (
              <div className="flex items-center justify-center py-10 text-red-500">
                {errorEarning}
              </div>
            ) :!earningGraph ? (
              <div className="text-center py-8 text-gray-500">
                No data available
              </div>
            ) : ( <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={earningGraph}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey={selectedValueearn === "week" ? "day" : "month"}
                  axisLine={true}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                />
                <YAxis
                  domain={[0, 5]}
                  axisLine={true}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  tickFormatter={(value) => `₹ ${value}k`}
                  label={{
                    value: "earning",
                    angle: -90,
                    position: "insideLeft",
                    style: {
                      textAnchor: "middle",
                      fill: "#6b7280",
                      fontSize: "12px",
                    },
                  }}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) => [`₹ ${value}k-`, "earning"]}
                    />
                  }
                />
                <Bar
                  dataKey="earning"
                  shape={CustomBar}
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>)}
          </ChartContainer>
          <div className="text-center mt-2 text-sm text-gray-500 font-medium">
            {selectedValueearn === "week" ? "day" : "months"}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

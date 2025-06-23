import Image from "next/image";
import { Bell, ChevronDown, ChevronRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import User from "@/public/Asset/User.png";

import Statcard from "@/components/Productsellercomponents/Statcard";
import RevenueOverview from "@/components/Analyticscomponents/revenue-overview";
import SellerApplicationsTable from "@/components/Analyticscomponents/seller-applications-table";
import Dashboardcharts from "@/components/Analyticscomponents/dashboard-charts";
import Productstat from "@/components/Productmanagement/productstat";
export default function Dashboard() {
  return (
    <ScrollArea className=" bg-gray-50 h-screen pb-14">
      {/* Main Content */}

      {/* Dashboard Content */}
      <div className=" overflow-auto p-3">
        {/* Stats Cards */}
        <Productstat />

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 items-stretch mb-4">
          <RevenueOverview />
        </div>

        <Dashboardcharts />
      </div>
    </ScrollArea>
  );
}

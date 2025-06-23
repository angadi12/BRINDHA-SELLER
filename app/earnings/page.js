"use client";
import React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import Earningstat from "@/components/Earningcomponent/Earningstat";
import Earningtable from "@/components/Earningcomponent/Earningtable";

const page = () => {
  return (
    <ScrollArea className=" mx-auto p-4 w-full h-screen pb-14 mb-8">
      {/* Top Cards */}
      <Earningstat/>
      <Earningtable/>
    </ScrollArea>
  );
};

export default page;

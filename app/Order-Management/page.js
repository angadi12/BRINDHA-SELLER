import Ordermanagement from '@/components/Ordermanagement/Ordermanagement'
import Orderstats from '@/components/Ordermanagement/Orderstats'
import { ScrollArea } from '@/components/ui/scroll-area'
import React from 'react'

const page = () => {
  return (
    <ScrollArea className="pb-14 bg-gray-50 h-screen">
      <section className="p-4">
        <Orderstats/>
        <Ordermanagement/>
      </section>
    </ScrollArea>
  )
}

export default page
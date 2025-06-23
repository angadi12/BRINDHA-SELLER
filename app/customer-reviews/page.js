import ReviewsTable from '@/components/Customerreviewcomponent/reviews-table'
import Reviewstat from '@/components/Customerreviewcomponent/Reviewstat'
import { ScrollArea } from '@/components/ui/scroll-area'
import React from 'react'

const page = () => {
  return (
    <ScrollArea className="pb-14 bg-gray-50 h-screen">
      <section className="p-4">
        <Reviewstat/>
        <ReviewsTable/>
      </section>
    </ScrollArea>
  )
}

export default page
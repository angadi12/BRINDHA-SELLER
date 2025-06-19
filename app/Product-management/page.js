import CategoriesCarousel from "@/components/Productmanagement/categories-carousel";
import Productmanagement from "@/components/Productmanagement/Productmanagement";
import Productstat from "@/components/Productmanagement/productstat";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Component() {
  return (
    <ScrollArea className="pb-14 bg-gray-50 h-screen">
      <section className="p-4">
        <Productstat/>
        <CategoriesCarousel/>
        <Productmanagement/>
      </section>
    </ScrollArea>
  );
}

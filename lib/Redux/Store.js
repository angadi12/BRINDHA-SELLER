import { configureStore } from "@reduxjs/toolkit";
import sellarSlice from "@/lib/Redux/Slices/sellarSlice";
import orderSlice from "@/lib/Redux/Slices/orderSlice";
import revenueSlice from "@/lib/Redux/Slices/revenueSlice";
import masterSlice from "@/lib/Redux/Slices/masterSlice";
import ticketSlice from "@/lib/Redux/Slices/ticketSlice";
import vendorSlice from "@/lib/Redux/Slices/vendorSlice";
import dashboardSlice from "@/lib/Redux/Slices/dashboardSlice";
import productSlice from "@/lib/Redux/Slices/productSlice";
import reviewsSlice from "@/lib/Redux/Slices/reviewSlice";
import adminSlice from "@/lib/Redux/Slices/adminSlice";

export const store = configureStore({
  reducer: {
    sellar: sellarSlice,
    order: orderSlice,
    revenue: revenueSlice,
    master: masterSlice,
    tickets: ticketSlice,
    vendor: vendorSlice,
    dashboard: dashboardSlice,
    product: productSlice,
    reviews: reviewsSlice,
    admins: adminSlice,
  },
});

"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDispatch, useSelector } from "react-redux";
import { fetchSellarproduct } from "@/lib/Redux/Slices/sellarSlice";
import {
  fetchProductById,
  sendForlive,
  sendForVerification,
} from "@/lib/Redux/Slices/productSlice";
import { useToast } from "@/components/ui/toast-provider";

export default function ProductDetailsPage() {
  const { addToast } = useToast();
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = params;
  const { singleProduct, loadingById, errorById } = useSelector(
    (state) => state.product
  );
  const [imageindex, Setimageindex] = useState(0);
  const [loadingVerify, SetloadingVerify] = useState(false);
  const [loadinglive, Setloadinglive] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch]);

  const sendproductforverification = async () => {
    if (!id) {
      addToast({
        title: `Product ID required`,
        description: `Product ID required`,
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    SetloadingVerify(true);
    try {
      const data = {
        productId: [id],
      };

      const result = await dispatch(sendForVerification(data));
      if (result.payload.code == 200) {
        addToast({
          title: `Product Send For Approval`,
          description: `Product Send For Approval`,
          variant: "success",
          duration: 5000,
        });
        SetloadingVerify(false);
      } else {
        addToast({
          title: `Failed to send`,
          description: result.message,
          variant: "destructive",
          duration: 5000,
        });
      }
    } catch (error) {
      addToast({
        title: `Failed to send`,
        description: error || "An unknown error occurred",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      SetloadingVerify(false);
    }
  };

  const sendproductforlive = async () => {
    if (!id) {
      addToast({
        title: `Product ID required`,
        description: `Product ID required`,
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    Setloadinglive(true);
    try {
      const data = {
        productId: [id],
      };

      const result = await dispatch(sendForlive(data));
      if (result.payload.code == 200) {
        addToast({
          title: `Product is Successfully Available to sell`,
          description: `Product has been lived`,
          variant: "success",
          duration: 5000,
        });
        Setloadinglive(false);
      } else {
        addToast({
          title: `Failed`,
          description: result.message,
          variant: "destructive",
          duration: 5000,
        });
      }
    } catch (error) {
      addToast({
        title: `Failed`,
        description: error || "An unknown error occurred",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      Setloadinglive(false);
    }
  };

  return (
    <>
      {loadingById ? (
        <div className="flex items-center justify-center h-screen text-gray-500">
          <span className="loader2 " />
        </div>
      ) : errorById ? (
        <div className="flex items-center justify-center py-10 text-red-500 h-screen">
          {errorById}
        </div>
      ) : !singleProduct ? (
        <div className="text-center py-8 text-gray-500 h-screen">
          Product not found
        </div>
      ) : (
        <ScrollArea className="w-full mx-auto bg-white h-screen pb-14 px-4">
          {/* Header */}
          <header className="py-4  flex items-center">
            <ChevronLeft
              className="h-5 w-5 mr-2 cursor-pointer"
              onClick={() => router.back()}
            />
            <h1 className="text-lg font-bold">Product Details</h1>
          </header>

          <div className="p-4">
            {/* Product Image and Info Section */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Product Images */}
              <div className="w-full md:w-1/2">
                <div className="rounded-lg overflow-hidden mb-2 ring-1 ring-gray-300">
                  <Image
                    src={singleProduct?.Images[imageindex]}
                    alt="Product Image"
                    width={500}
                    height={500}
                    className="w-full h-80 object-cover"
                  />
                </div>
                <div className="flex gap-2 mt-4">
                  {singleProduct?.Images.map((img, key) => (
                    <div
                      key={key}
                      onClick={() => Setimageindex(key)}
                      className={
                        key === imageindex
                          ? "w-1/4 h-16 ring-1 ring-[#106C83] cursor-pointer  bg-gray-100 rounded-lg overflow-hidden border"
                          : "w-1/4 h-16 cursor-pointer  bg-gray-100 rounded-lg overflow-hidden border"
                      }
                    >
                      <Image
                        src={img}
                        alt="Thumbnail 1"
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="w-full md:w-1/2">
                <div className="inline-block bg-[#106C83] text-white px-3 py-1 rounded-md text-sm mb-2">
                  Product Category
                </div>
                <h2 className="text-xl font-bold mb-1">
                  {singleProduct?.Name}
                </h2>
                <p className="text-[#106C83] mb-4">Seller Name</p>
                <div className="text-right text-xl font-bold mb-4">
                  ₹{singleProduct?.Yourprice}
                </div>

                <div className="border-t border-b py-4 my-4">
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <h3 className="font-bold mb-2">Product Details</h3>
                    <p className="text-gray-700 text-sm">
                      {singleProduct?.Description}
                      <span className="text-[#106C83]">More...</span>
                    </p>
                  </div>

                  <h3 className="font-bold mb-3">Features</h3>
                  <div className="flex flex-wrap gap-2  mb-4">
                    {singleProduct?.Features.map((item, index) => (
                      <span
                        key={index}
                        className="text-gray-600 px-3 py-1 rounded-full  text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* <h3 className="font-bold mb-3">Select Avalible</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                <button className="bg-gray-200 px-4 py-2 rounded-md text-sm">
                  Small - 5 KG
                </button>
                <button className="bg-gray-200 px-4 py-2 rounded-md text-sm">
                  Small - 5 KG
                </button>
                <button className="bg-gray-200 px-4 py-2 rounded-md text-sm">
                  Small - 5 KG
                </button>
              </div> */}

                  <h3 className="font-bold mb-3">Select Available</h3>
                  <div className="flex flex-wrap gap-3 mb-4">
                    {singleProduct?.colors?.map((col, key) => (
                      <button
                        key={key}
                        style={{ backgroundColor: col }}
                        className={`w-10 h-10 rounded-full  border`}
                      ></button>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <p className="font-bold">
                      Quantity Available -{" "}
                      <span className="font-normal">
                        {singleProduct?.Stock}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-4 border-b pb-2">
                Description
              </h2>
              <h3 className="text-lg font-bold mb-2">
                Lorem ipsum dolor sit amet elit.
              </h3>
              <p className="text-gray-600 mb-4">{singleProduct?.Description}</p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 justify-end-safe items-end justify-items-end  gap-4 mb-8">
             {singleProduct.Status==="Approved" && <button
                onClick={sendproductforlive}
                className="w-full bg-[#106C83] text-white py-3 rounded-md font-medium "
              >
                {loadinglive ? <span className="loader"></span> : "Live"}
              </button>}
             {singleProduct.Status==="Pending" && <button
                onClick={sendproductforverification}
                className="w-full capitalize bg-red-500 cursor-pointer text-white py-2 rounded-md font-medium order-2"
              >
                {loadingVerify ? (
                  <span className="loader"></span>
                ) : (
                  " send for verification"
                )}
              </button>}
             {singleProduct.Status==="SendForApprove" && <button
                className="w-full capitalize bg-yellow-500 cursor-pointer text-white py-2 rounded-md font-medium order-2"
              >
               wait for Approval
              </button>}
             {singleProduct.Status==="Live" && <button
                className="w-full capitalize bg-green-500 cursor-pointer text-white py-2 rounded-md font-medium order-2"
              >
              Live
              </button>}
            </div>
          </div>
        </ScrollArea>
      )}
    </>
  );
}

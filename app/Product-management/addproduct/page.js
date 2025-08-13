"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, Camera, ArrowLeft } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useRef } from "react";
import { useToast } from "@/components/ui/toast-provider";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCategories,
  fetchAllMeasurement,
} from "@/lib/Redux/Slices/masterSlice";
import { Uploadfiles } from "@/lib/API/fileupload/multiplefile";
import { Addproducts, Downloadtemplate } from "@/lib/API/Product/product";
import Productimage from "@/public/Asset/Product1.png";
import { useRouter } from "next/navigation";
import { BaseUrl } from "@/lib/API/Baseurl";

const defaultSizes = [
  "Small",
  "Medium",
  "Large",
  "Extra Large",
  "Double Extra Large",
];
const defaultColors = [
  "Teal Blue",
  "Coral Red",
  "Turquoise",
  "Sky Blue",
  "Sage Green",
  "Pastel Yellow",
  "Plum",
  "Aqua Green",
  "Golden Yellow",
  "Lavender Purple",
  "Soft Blue",
  "Soft Salmon",
  "Mint Green",
  "Lilac",
  "Seafoam Green",
  "Jet Black",
  "Charcoal Gray",
  "Slate Gray",
  "Ivory",
  "White",
  "Beige",
  "Cream",
  "Khaki",
  "Camel",
  "Chocolate Brown",
  "Chestnut",
  "Maroon",
  "Burgundy",
  "Scarlet",
  "Rose Pink",
  "Hot Pink",
  "Magenta",
  "Royal Blue",
  "Navy Blue",
  "Cobalt Blue",
  "Ocean Blue",
  "Forest Green",
  "Olive Green",
  "Emerald Green",
  "Mustard Yellow",
  "Sunflower Yellow",
  "Copper",
  "Bronze",
  "Silver Gray",
  "Gold"
];

const categories = [
  "Electronics",
  "Clothing & Fashion",
  "Home & Garden",
  "Sports & Outdoors",
  "Health & Beauty",
  "Toys & Games",
  "Books & Media",
  "Automotive",
  "Jewelry & Accessories",
  "Food & Beverages",
];

const measurements = [
  "Centimeters (cm)",
  "Inches (in)",
  "Meters (m)",
  "Feet (ft)",
  "Millimeters (mm)",
  "Kilograms (kg)",
  "Pounds (lbs)",
  "Grams (g)",
  "Liters (L)",
  "Milliliters (ml)",
];

const getSizeAbbreviation = (size) => {
  const sizeMap = {
    Small: "S",
    Medium: "M",
    Large: "L",
    "Extra Large": "XL",
    "Double Extra Large": "XXL",
  };
  return sizeMap[size] || size.charAt(0).toUpperCase();
};

export default function Component() {
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();
  const router = useRouter();
  const [formData, setFormData] = useState({
    Name: "Elite Sewing Machine",
    Description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis.",
    CategoryId: "",
    SubcategoryId: "",
    Measturments: "",
    Features: [],
    Yourprice: "599",
    SellingPrice: "799",
    colors: [],
    Images: [],
    Ecofriendly: true,
    Stock: 0,
  });

  const [selectedSize, setSelectedSize] = useState("Small");
  const [selectedColor, setSelectedColor] = useState("#106C83");
  const [previewImage, setPreviewImage] = useState(Productimage);
  const [thumbnailimages, setthumnailimage] = useState([]);

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [newColor, setNewColor] = useState("");

  const [showSizePicker, setShowSizePicker] = useState(false);
  const [newSize, setNewSize] = useState("");

  const [showFeatureInput, setShowFeatureInput] = useState(false);
  const [newFeature, setNewFeature] = useState("");
  const dispatch = useDispatch();

  const { categories, loading, error } = useSelector((state) => state.master);
  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const { measurement } = useSelector((state) => state.master);

  useEffect(() => {
    dispatch(fetchAllMeasurement());
  }, [dispatch]);

  const uniqueCategories = [
    ...new Map(
      categories.map((item) => [item.CategoryId?._id, item.CategoryId])
    ).values(),
  ];

  const filteredSubcategories = categories.filter(
    (item) => item.CategoryId?._id === formData.CategoryId
  );

  const handleInputChange = (key, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [key]: value };
      if (key === "CategoryId") {
        updated.SubcategoryId = "";
      }
      return updated;
    });
  };

  // const handleInputChange = (field, value) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     [field]: value,
  //   }));
  // };

  const handleSizeToggle = (size, checked) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        sizes: [...prev.sizes, size],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        sizes: prev.sizes.filter((s) => s !== size),
      }));
    }
  };

  // const handleFileUpload = (event) => {
  //   const files = Array.from(event.target.files || []);
  //   if (files.length > 0) {
  //     const file = files[0];
  //     const imageUrl = URL.createObjectURL(file);
  //     setPreviewImage(imageUrl);

  //     setFormData((prev) => ({
  //       ...prev,
  //       Images: files,
  //     }));
  //   }
  // };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      const urls = files.map((file) => URL.createObjectURL(file));
      setPreviewImage(urls[0]); // Default preview is the first image
      setthumnailimage(urls);
      setFormData((prev) => ({
        ...prev,
        Images: files, // Store image URLs instead of File objects
      }));
    }
  };

  const calculateDiscount = () => {
    const yourPrice = Number.parseFloat(formData.yourPrice) || 0;
    const sellingPrice = Number.parseFloat(formData.sellingPrice) || 0;

    if (sellingPrice > 0) {
      const discount = ((sellingPrice - yourPrice) / sellingPrice) * 100;
      setFormData((prev) => ({
        ...prev,
        discountPercentage: Math.max(0, discount).toFixed(0),
      }));
    }
  };

  const handlePriceChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Auto-calculate discount when prices change
    setTimeout(() => {
      calculateDiscount();
    }, 100);
  };

  const handleAddColor = () => {
    if (newColor && !formData.colors.includes(newColor)) {
      setFormData((prev) => ({
        ...prev,
        colors: [...prev.colors, newColor],
      }));
      setNewColor("");
      // setShowColorPicker(false);
    }
  };

  const handleRemoveColor = (colorToRemove) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.filter((color) => color !== colorToRemove),
    }));
  };

  const handleAddSize = () => {
    if (newSize.trim() && !formData.sizes.includes(newSize.trim())) {
      setFormData((prev) => ({
        ...prev,
        sizes: [...prev.sizes, newSize.trim()],
      }));
      setNewSize("");
      setShowSizePicker(false);
    }
  };

  const handleRemoveSize = (sizeToRemove) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((size) => size !== sizeToRemove),
    }));
  };

  const handleAddFeature = () => {
    if (newFeature.trim() && !formData.Features.includes(newFeature.trim())) {
      setFormData((prev) => ({
        ...prev,
        Features: [...prev.Features, newFeature.trim()],
      }));
      setNewFeature("");
      setShowFeatureInput(false);
    }
  };

  const handleRemoveFeature = (featureToRemove) => {
    setFormData((prev) => ({
      ...prev,
      Features: prev.Features.filter((feature) => feature !== featureToRemove),
    }));
  };

  const validateForm = () => {
    if (!formData.Name.trim()) {
      addToast({
        title: "Error",
        description: "Product name is required",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.CategoryId) {
      addToast({
        title: "Error",
        description: "Category is required",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.Stock) {
      addToast({
        title: "Error",
        description: "Stock is required",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.Yourprice || Number.parseFloat(formData.Yourprice) <= 0) {
      addToast({
        title: "Error",
        description: "Valid your price is required",
        variant: "destructive",
      });
      return false;
    }
    if (
      !formData.SellingPrice ||
      Number.parseFloat(formData.SellingPrice) <= 0
    ) {
      addToast({
        title: "Error",
        description: "Valid selling price is required",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  // const handleAddProduct = async () => {
  //   if (!validateForm()) return;

  //   setIsLoading(true);

  //   try {
  //     // Create FormData for file upload
  //     const formDataToSend = new FormData();

  //     // Add product data
  //     formDataToSend.append("Name", formData.Name);
  //     formDataToSend.append("Description", formData.Description);
  //     formDataToSend.append("CategoryId", formData.CategoryId);
  //     formDataToSend.append("Measturments", formData.Measturments);
  //     formDataToSend.append("Features", JSON.stringify(formData.Features));
  //     formDataToSend.append("Yourprice", formData.Yourprice);
  //     formDataToSend.append("SellingPrice", formData.SellingPrice);
  //     formDataToSend.append("colors", JSON.stringify(formData.colors));

  //     // Add media files
  //     formData.Images.forEach((file, index) => {
  //       formDataToSend.append(`media_${index}`, file);
  //     });

  //     // Make API call - replace with your actual API endpoint
  //     const response = await fetch("/api/products/add", {
  //       method: "POST",
  //       body: formDataToSend,
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to add product");
  //     }

  //     const result = await response.json();

  //     addToast({
  //       title: "Success",
  //       description: "Product added successfully!",
  //       variant: "default",
  //     });

  //     // Reset form or redirect as needed
  //     console.log("Product added:", result);
  //   } catch (error) {
  //     console.error("Error adding product:", error);
  //     addToast({
  //       title: "Error",
  //       description: "Failed to add product. Please try again.",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleAddProduct = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Step 1: Upload images to Cloudinary
      const uploadResponse = await Uploadfiles(formData.Images); // uses your Uploadfiles util

      if (!uploadResponse || uploadResponse?.status !== true) {
        throw new Error("Image upload failed");
      }

      // Step 2: Extract image URLs from response
      const uploadedImageUrls = uploadResponse?.data?.map((img) => img);

      if (!uploadedImageUrls || uploadedImageUrls.length === 0) {
        throw new Error("No image URLs returned");
      }

      // Step 3: Build final product data object
      const productPayload = {
        Name: formData.Name,
        Description: formData.Description,
        CategoryId: formData.CategoryId,
        SubcategoryId: formData.SubcategoryId,
        Measturments: formData.Measturments,
        Ecofriendly: formData.Ecofriendly,
        Features: formData.Features, // already JSON string in API
        Yourprice: formData.Yourprice,
        Stock: formData.Stock,
        SellingPrice: formData.SellingPrice,
        colors: formData.colors,
        Images: uploadedImageUrls, // <-- Important!
      };

      // Step 4: Send product data to backend
      const result = await Addproducts(productPayload);

      if (!result || result.status !== true) {
        throw new Error(result?.message || "Product creation failed");
      }

      addToast({
        title: "Success",
        description: "Product added successfully!",
        variant: "success",
      });
      setFormData({
        Name: "",
        Description: "",
        CategoryId: "",
        SubcategoryId: "",
        Measturments: "",
        Features: [],
        Yourprice: "",
        SellingPrice: "",
        Ecofriendly: true,
        colors: defaultColors,
        Images: [],
        Stock: 0,
      });
      setPreviewImage(Productimage);
      // Optionally reset form or redirect here
    } catch (error) {
      console.error("Error adding product:", error);
      addToast({
        title: "Error",
        description:
          error.message || "Failed to add product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddBulkProduct = async () => {
    // Implement bulk product logic here
    addToast({
      title: "Info",
      description: "Bulk product feature coming soon!",
      variant: "default",
    });
  };

 const handleDownload = async () => {
    try {
      const response = await fetch(`${BaseUrl}/vendor/download-template`, {
        method: "GET",
      });

      if (!response.ok) throw new Error("Failed to download file");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "ProductTemplate.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };


  const handleCancel = () => {
    setFormData({
      Name: "",
      Description: "",
      CategoryId: "",
      SubcategoryId: "",
      Measturments: "",
      Features: [],
      Yourprice: "",
      SellingPrice: "",
      Ecofriendly: true,
      colors: defaultColors,
      Images: [],
      Stock: 0,
    });
    setPreviewImage(Productimage);
    addToast({
      title: "Info",
      description: "Form cleared",
      variant: "success",
    });
  };

  return (
    <ScrollArea className="h-screen pb-14">
      <div className="flex justify-between items-center p-6">
        <div>
          <Button
            onClick={() => router.back()}
            className="flex-1   cursor-pointer bg-white hover:bg-white text-black"
          >
            <ArrowLeft /> Back
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleDownload}
            className="flex-1 text-[#106C83] ring-[#0d5a6e] ring-1 hover:bg-white cursor-pointer bg-white capitalize"
          >
            Download bulk upload template
          </Button>
          <Button
            onClick={handleAddBulkProduct}
            className="flex-1 bg-[#106C83] hover:bg-[#0d5a6e] cursor-pointer text-white"
          >
            Add Bulk Product
          </Button>
        </div>
      </div>
      <div className="flex gap-6 px-6 bg-gray-50 min-h-screen">
        {/* Left Side - Preview */}
        <div className="w-80 bg-white rounded-lg p-4 h-fit border">
          <h3 className="text-lg font-semibold mb-4">Preview</h3>

          {/* Product Image */}
          <div className="mb-4">
            {thumbnailimages?.length !== 0 ? (
              <Image
                src={previewImage || "/placeholder.svg"}
                alt={formData.Name || "Product"}
                width={280}
                height={200}
                className="w-full h-48 object-cover rounded-lg"
              />
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 flex flex-col gap-2 justify-center items-center text-center cursor-pointer hover:border-[#106C83] transition-colors">
                <Camera className="text-[#106C83] font-semibold h-12 w-12" />{" "}
                <p className="text-gray-600 font-medium">Image Preview</p>
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center justify-start gap-2 mb-4">
            {thumbnailimages?.map((img, k) => (
              <Image
                src={img}
                alt={`Preview ${k + 1}`}
                key={k}
                width={40}
                height={40}
                onClick={() => setPreviewImage(img)}
                className={`w-12 h-12 rounded-sm object-contain cursor-pointer ${
                  previewImage === img
                    ? "ring-2 ring-[#106C83]"
                    : "ring-1 ring-gray-300"
                }`}
              />
            ))}
          </div>
          {/* Product Info */}
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900">
              {formData.Name || "Product Name"}
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              {formData.Description ||
                "Product description will appear here..."}
            </p>
          </div>

          {/* Price */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-1">Price:</p>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 line-through">
                ₹{formData.SellingPrice || "0"}
              </span>
              <span className="font-semibold text-gray-900">
                ₹{formData.Yourprice || "0"}
              </span>
              <span className="text-xs text-green-600">
                ({formData.discountPercentage || "0"}% Off)
              </span>
            </div>
          </div>
          <div className="mb-4 ext-sm text-gray-600">
            Stock :
            <p className="text-black inline-block text-sm">X{formData.Stock}</p>
          </div>
          {/* Size Selection */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Features:</p>
            <div className="flex gap-2 flex-wrap">
              {formData.Features.map((size) => (
                <div
                  key={size}
                  className="flex flex-col justify-items-start gap-1 w-full"
                >
                  <p>{size}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">Colors:</p>
            <div className="flex gap-2 flex-wrap">
              {formData?.colors?.map((color, index) => (
                <div
                  key={index}
                  className={`w-auto text-xs px-2 rounded-full cursor-pointer border-1`}
                >{color}</div>
              ))}
            </div>
          </div>

          {/* Add Product Button */}
          <Button
            onClick={handleAddProduct}
            disabled={isLoading}
            className="w-full bg-[#106C83] hover:bg-[#0d5a6e] cursor-pointer text-white"
          >
            {isLoading ? "Adding..." : "Add Product"}
          </Button>
        </div>

        {/* Right Side - Product Form */}
        <div className="flex-1 bg-white rounded-lg p-6 border">
          {/* Add Product Media */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Add Product Media</h3>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-[#106C83] transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="flex flex-col items-center">
                <Upload className="w-12 h-12 text-[#106C83] mb-2" />
                <p className="text-gray-600 font-medium">Upload your Images</p>
                <p className="text-sm text-gray-500">
                  Recommended: PNG, JPG & JPEG files
                </p>
                {formData?.Images?.length > 0 && (
                  <p className="text-sm text-green-600 mt-2">
                    {formData?.Images?.length} file(s) selected
                  </p>
                )}
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          {/* Product Information */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Product Information</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Ecofriendly</span>
                <Switch
                  checked={formData.Ecofriendly}
                  onCheckedChange={(checked) =>
                    handleInputChange("Ecofriendly", checked)
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-4">
              <Input
                placeholder="Product Name"
                className="bg-gray-50"
                value={formData.Name}
                onChange={(e) => handleInputChange("Name", e.target.value)}
              />
            </div>

            {/* <div className="grid grid-cols-2 gap-4 mb-4">
              <Input
                placeholder="Product ID"
                className="bg-gray-50"
                value={formData.productId}
                onChange={(e) => handleInputChange("productId", e.target.value)}
              />
              <Input
                placeholder="Product Status"
                className="bg-gray-50"
                value={formData.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
              />
            </div> */}

            <Textarea
              placeholder="Product Description"
              className="bg-gray-50 min-h-[100px]"
              value={formData.Description}
              onChange={(e) => handleInputChange("Description", e.target.value)}
            />
          </div>

          {/* Category and Measurement */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {/* <div>
              <label className="block w-full text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <Select
                onValueChange={(value) => handleInputChange("CategoryId", value)}
                value={formData.CategoryId}
              >
                <SelectTrigger
                  id="location-select"
                  className="w-full h-12 flex items-center gap-2"
                >
                  <SelectValue placeholder="Select Category">
                    {loading ? (
                      <span className="loader2"></span>
                    ) : (
                      <div className="flex items-center gap-2">
                        {categories?.find(
                          (theater) => theater?._id === formData.CategoryId
                        )?.CategoryId?.Categoryname || "Select category"}
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {loading ? (
                    <span className="loader2"></span>
                  ) : categories?.length > 0 ? (
                    categories?.map((location) => (
                      <SelectItem key={location._id} value={location._id}>
                        {location?.CategoryId?.Categoryname}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-1 text-center text-sm">
                      No Category available
                    </div>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block w-full text-sm font-medium text-gray-700 mb-2">
               Sub-Category
              </label>
              <Select
                onValueChange={(value) => handleInputChange("SubcategoryId", value)}
                value={formData.SubcategoryId}
              >
                <SelectTrigger
                  id="location-select"
                  className="w-full h-12 flex items-center gap-2"
                >
                  <SelectValue placeholder="Select Sub-Category">
                    {loading ? (
                      <span className="loader2"></span>
                    ) : (
                      <div className="flex items-center gap-2">
                        {categories?.find(
                          (theater) => theater?._id === formData.CategoryId
                        )?.CategoryId?.Categoryname || "Select Sub-category"}
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {loading ? (
                    <span className="loader2"></span>
                  ) : categories?.length > 0 ? (
                    categories?.map((location) => (
                      <SelectItem key={location._id} value={location._id}>
                        {location?.CategoryId?.Categoryname}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-1 text-center text-sm">
                      No Category available
                    </div>
                  )}
                </SelectContent>
              </Select>
            </div> */}
            <div>
              <label className="block w-full text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <Select
                onValueChange={(value) =>
                  handleInputChange("CategoryId", value)
                }
                value={formData.CategoryId}
              >
                <SelectTrigger className="w-full h-12 flex items-center gap-2">
                  <SelectValue placeholder="Select Category">
                    {loading ? (
                      <span className="loader2"></span>
                    ) : (
                      uniqueCategories.find(
                        (cat) => cat?._id === formData.CategoryId
                      )?.Categoryname || "Select category"
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {loading ? (
                    <span className="loader2"></span>
                  ) : uniqueCategories.length > 0 ? (
                    uniqueCategories.map((cat) => (
                      <SelectItem key={cat?._id} value={cat?._id}>
                        {cat?.Categoryname}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-1 text-center text-sm">
                      No Category available
                    </div>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block w-full text-sm font-medium text-gray-700 mb-2">
                Sub-Category
              </label>
              <Select
                onValueChange={(value) =>
                  handleInputChange("SubcategoryId", value)
                }
                value={formData.SubcategoryId}
              >
                <SelectTrigger className="w-full h-12 flex items-center gap-2">
                  <SelectValue placeholder="Select Sub-Category">
                    {loading ? (
                      <span className="loader2"></span>
                    ) : (
                      categories.find(
                        (sub) => sub?._id === formData?.SubcategoryId
                      )?.Subcategoryname || "Select Sub-category"
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {loading ? (
                    <span className="loader2"></span>
                  ) : filteredSubcategories.length > 0 ? (
                    filteredSubcategories.map((sub) => (
                      <SelectItem key={sub?._id} value={sub?._id}>
                        {sub?.Subcategoryname}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-1 text-center text-sm">
                      No Subcategories Available
                    </div>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Measurement Unit
              </label>
              <Select
                value={formData.Measturments}
                onValueChange={(value) =>
                  handleInputChange("Measturments", value)
                }
              >
                <SelectTrigger className="bg-white w-full">
                  <SelectValue placeholder="Select Measurement" />
                </SelectTrigger>
                <SelectContent>
                  {measurement.map((measurement) => (
                    <SelectItem key={measurement} value={measurement?._id}>
                      {measurement?.measurement}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Product Features */}
          <div className="mb-6">
            <h4 className="font-semibold mb-3">Product Features</h4>
            <div className="space-y-2 mb-3">
              {formData?.Features?.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-blue-50 px-3 py-2 rounded"
                >
                  <span className="text-sm text-blue-700">• {feature}</span>
                  <button
                    onClick={() => handleRemoveFeature(feature)}
                    className="text-red-500 hover:text-red-700 text-sm font-bold"
                    type="button"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {showFeatureInput ? (
              <div className="space-y-3 p-3 border rounded-lg bg-gray-50">
                <Input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Enter product feature (e.g., Waterproof, Wireless, etc.)"
                  className="text-sm"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddFeature();
                    }
                  }}
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    onClick={handleAddFeature}
                    size="sm"
                    className="bg-[#106C83] hover:bg-[#0d5a6e] text-white"
                    disabled={!newFeature.trim()}
                  >
                    Add Feature
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      setShowFeatureInput(false);
                      setNewFeature("");
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                type="button"
                onClick={() => setShowFeatureInput(true)}
                variant="outline"
                className="w-full cursor-pointer border-[#106C83] bg-[#106C83] text-white hover:bg-[#106C83] hover:text-white"
              >
                + Add Feature
              </Button>
            )}
          </div>

          {/* Available Sizes and Colors */}
          <div className="grid grid-cols-1 gap-8 mb-6">
            {/* Available Sizes */}
            {/* <div>
              <h4 className="font-semibold mb-3">Available Sizes:</h4>
              <div className="space-y-2 mb-3">
                {defaultSizes.map((size) => (
                  <div key={size} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={size.toLowerCase().replace(" ", "-")}
                        checked={formData.sizes.includes(size)}
                        onCheckedChange={(checked) =>
                          handleSizeToggle(size, checked)
                        }
                      />
                      <label
                        htmlFor={size.toLowerCase().replace(" ", "-")}
                        className="text-sm"
                      >
                        {size} ({getSizeAbbreviation(size)})
                      </label>
                    </div>
                  </div>
                ))}

                {formData.sizes
                  .filter((size) => !defaultSizes.includes(size))
                  .map((size) => (
                    <div
                      key={size}
                      className="flex items-center justify-between bg-blue-50 px-2 py-1 rounded"
                    >
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`custom-${size}`}
                          checked={true}
                          onCheckedChange={(checked) => {
                            if (!checked) handleRemoveSize(size);
                          }}
                        />
                        <label
                          htmlFor={`custom-${size}`}
                          className="text-sm font-medium text-blue-700"
                        >
                          {size} (Custom)
                        </label>
                      </div>
                      <button
                        onClick={() => handleRemoveSize(size)}
                        className="text-red-500 hover:text-red-700 text-sm"
                        type="button"
                      >
                        ×
                      </button>
                    </div>
                  ))}
              </div>

              {showSizePicker ? (
                <div className="space-y-3 p-3 border rounded-lg bg-gray-50">
                  <Input
                    type="text"
                    value={newSize}
                    onChange={(e) => setNewSize(e.target.value)}
                    placeholder="Enter custom size (e.g., XXXL, 2XL, etc.)"
                    className="text-sm"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddSize();
                      }
                    }}
                  />
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      onClick={handleAddSize}
                      size="sm"
                      className="bg-[#106C83] hover:bg-[#0d5a6e] text-white"
                      disabled={!newSize.trim()}
                    >
                      Add Size
                    </Button>
                    <Button
                      type="button"
                      onClick={() => {
                        setShowSizePicker(false);
                        setNewSize("");
                      }}
                      variant="outline"
                      size="sm"
                    >
                      Cancel
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs text-gray-600">Quick Sizes:</p>
                    <div className="flex flex-wrap gap-1">
                      {["XXXL", "2XL", "3XL", "4XL", "5XL", "XS", "XXS"].map(
                        (size) => (
                          <button
                            key={size}
                            type="button"
                            onClick={() => setNewSize(size)}
                            className="px-2 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-50"
                            disabled={formData.sizes.includes(size)}
                          >
                            {size}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <Button
                  type="button"
                  onClick={() => setShowSizePicker(true)}
                  variant="outline"
                  className="w-full text-[#106C83] border-[#106C83] hover:bg-[#106C83] hover:text-white"
                >
                  + Manual Size
                </Button>
              )}
            </div> */}

            {/* Available Colors */}
            <div>
              <h4 className="font-semibold mb-3">Available Colors:</h4>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData?.colors?.map((color, index) => (
                  <div key={index} className="relative group">
                    <div
                      className="w-auto text-xs text-[#106C83] px-2 rounded-full border-1 border-[#106C83] cursor-pointer"
                      title={color}
                    >{color}</div>
                    <button
                      onClick={() => handleRemoveColor(color)}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      type="button"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              {showColorPicker ? (
                <div className="space-y-3 p-3 border rounded-lg bg-gray-50">
                  <div className="flex items-center gap-2">
                    <Input
                      type="text"
                      value={newColor}
                      onChange={(e) => setNewColor(e.target.value)}
                      placeholder="Choose color"
                      className="flex-1 text-sm"
                      pattern="^#[0-9A-Fa-f]{6}$"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      onClick={handleAddColor}
                      size="sm"
                      className="bg-[#106C83] hover:bg-[#0d5a6e] text-white"
                    >
                      Add Color
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setShowColorPicker(false)}
                      variant="outline"
                      size="sm"
                    >
                      Cancel
                    </Button>
                  </div>

                  {/* Color Palette Presets */}
                  <div className="space-y-2">
                    <p className="text-xs text-gray-600">Quick Colors:</p>
                    <div className="grid grid-cols-4 gap-1">
                      {defaultColors?.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setNewColor(color)}
                          className="w-auto text-sm p-1 rounded  border border-gray-300 hover:scale-110 transition-transform"
                          title={color}
                        >{color}</button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Button
                  type="button"
                  onClick={() => setShowColorPicker(true)}
                  variant="outline"
                  className="w-full cursor-pointer border-[#106C83] bg-[#106C83] text-white hover:bg-[#106C83] hover:text-white"
                >
                  + New Color
                </Button>
              )}
            </div>
          </div>

          {/* Pricing Details */}
          <div className="mb-8">
            <h4 className="font-semibold mb-3">Pricing Details</h4>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Price (₹)
                </label>
                <Input
                  placeholder="599"
                  className="bg-gray-50"
                  type="number"
                  value={formData.Yourprice}
                  onChange={(e) =>
                    handlePriceChange("Yourprice", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Selling Price (₹)
                </label>
                <Input
                  placeholder="799"
                  className="bg-gray-50"
                  type="number"
                  value={formData.SellingPrice}
                  onChange={(e) =>
                    handlePriceChange("SellingPrice", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock
                </label>
                <Input
                  placeholder="25"
                  className="bg-gray-50"
                  type="number"
                  value={formData.Stock}
                  onChange={(e) => handlePriceChange("Stock", e.target.value)}
                />
              </div>
            </div>
            {/* <p className="text-xs text-gray-500 mt-2">
              Discount is automatically calculated based on Your Price and
              Selling Price
            </p> */}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={handleAddProduct}
              disabled={isLoading}
              className="flex-1 bg-[#106C83] hover:bg-[#0d5a6e] cursor-pointer text-white"
            >
              {isLoading ? <span className="loader"></span> : "Add Product"}
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              className="flex-1 text-red-600 border-red-600 hover:bg-red-50"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}

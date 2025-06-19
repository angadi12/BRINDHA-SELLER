import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Home } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Component() {
  return (
    <ScrollArea className="h-screen pb-14">

    <div className="flex gap-6 p-6 bg-gray-50 min-h-screen">
      {/* Left Side - Preview */}
      <div className="w-80 bg-white rounded-lg p-4 h-fit border">
        <h3 className="text-lg font-semibold mb-4">Preview</h3>

        {/* Product Image */}
        <div className="mb-4">
          <Image
            src="/sewing-machine.png"
            alt="Elite Sewing Machine"
            width={280}
            height={200}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-900">Elite Sewing Machine</h4>
          <p className="text-sm text-gray-600 mb-2">Supplier Name</p>
          <p className="text-xs text-gray-500 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis.
          </p>
        </div>

        {/* Price */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-1">Price:</p>
          <div className="flex items-center gap-2">
            <span className="text-gray-400 line-through">₹59</span>
            <span className="font-semibold text-gray-900">₹45</span>
            <span className="text-xs text-green-600">(10% Off)</span>
          </div>
        </div>

        {/* Size Selection */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Size:</p>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded bg-[#106C83] text-white text-sm font-medium">S</button>
            <button className="w-8 h-8 rounded border border-gray-300 text-gray-600 text-sm">M</button>
            <button className="w-8 h-8 rounded border border-gray-300 text-gray-600 text-sm">L</button>
            <button className="w-8 h-8 rounded border border-gray-300 text-gray-600 text-sm">XL</button>
          </div>
        </div>

        {/* Color Selection */}
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-2">Colors:</p>
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded-full bg-yellow-300 border-2 border-gray-200"></div>
            <div className="w-6 h-6 rounded-full bg-blue-300 border-2 border-gray-200"></div>
            <div className="w-6 h-6 rounded-full bg-green-400 border-2 border-gray-200"></div>
            <div className="w-6 h-6 rounded-full bg-pink-300 border-2 border-gray-200"></div>
            <div className="w-6 h-6 rounded-full bg-[#106C83] border-2 border-[#106C83]"></div>
          </div>
        </div>

        {/* Add Product Button */}
        <Button className="w-full bg-[#106C83] hover:bg-[#106C83] cursor-pointer text-white">Add Product</Button>
      </div>

      {/* Right Side - Product Form */}
      <div className="flex-1 bg-white rounded-lg p-6 border">
        {/* Add Product Media */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Add Product Media</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
            <div className="flex flex-col items-center">
              <Home className="w-12 h-12 text-[#106C83] mb-2" />
              <p className="text-gray-600 font-medium">Drop your Image/Video</p>
              <p className="text-sm text-gray-500">Recommended: PNG, JPG & GIF files</p>
            </div>
          </div>
        </div>

        {/* Product Information */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Product Information</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Visible on Store</span>
              <Switch defaultChecked />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-4">
            <Input placeholder="Product Name" className="bg-gray-50" />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <Input placeholder="Product ID" className="bg-gray-50" />
            <Input placeholder="Product Status" className="bg-gray-50" />
          </div>

          <Textarea placeholder="Product Description" className="bg-gray-50 min-h-[100px]" />
        </div>

        {/* Available Sizes and Colors */}
        <div className="grid grid-cols-2 gap-8 mb-6">
          {/* Available Sizes */}
          <div>
            <h4 className="font-semibold mb-3">Available Sizes:</h4>
            <div className="space-y-2 mb-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="small" defaultChecked />
                <label htmlFor="small" className="text-sm">
                  Small
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="medium" defaultChecked />
                <label htmlFor="medium" className="text-sm">
                  Medium
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="large" defaultChecked />
                <label htmlFor="large" className="text-sm">
                  Large
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="extra-large" defaultChecked />
                <label htmlFor="extra-large" className="text-sm">
                  Extra Large
                </label>
              </div>
            </div>
            <Button variant="outline" className="w-full text-[#106C83] border-[#106C83]">
              + Manual Size
            </Button>
          </div>

          {/* Available Colors */}
          <div>
            <h4 className="font-semibold mb-3">Available Colors:</h4>
            <div className="flex gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-yellow-300 border-2 border-gray-200"></div>
              <div className="w-8 h-8 rounded-full bg-blue-300 border-2 border-gray-200"></div>
              <div className="w-8 h-8 rounded-full bg-green-400 border-2 border-gray-200"></div>
              <div className="w-8 h-8 rounded-full bg-pink-300 border-2 border-gray-200"></div>
              <div className="w-8 h-8 rounded-full bg-[#106C83] border-2 border-gray-200"></div>
            </div>
            <Button variant="outline" className="w-full text-[#106C83] border-[#106C83]">
              + New Color
            </Button>
          </div>
        </div>

        {/* Pricing Details */}
        <div className="mb-8">
          <h4 className="font-semibold mb-3">Pricing Details</h4>
          <div className="grid grid-cols-3 gap-4">
            <Input placeholder="Set Price" className="bg-gray-50" />
            <Input placeholder="Discount %" className="bg-gray-50" />
            <Input placeholder="Display Price" className="bg-gray-50" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button className="flex-1 bg-[#106C83] hover:bg-[#106C83] cursor-pointer text-white">Add Product</Button>
          <Button className="flex-1 bg-[#106C83] hover:bg-[#106C83] cursor-pointer text-white">Add Bulk Product</Button>
          <Button variant="outline" className="flex-1 text-red-600 border-red-600 hover:bg-red-50">
            Cancel
          </Button>
        </div>
      </div>
    </div>
    </ScrollArea>
  )
}

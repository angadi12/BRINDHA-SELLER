import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Component() {
  return (

    <ScrollArea className="w-full mx-auto h-screen pb-14 p-4 bg-gray-50">
      {/* Business Information Section */}
      <div className="mb-8 bg-white border p-6 rounded-2xl ">
        <h2 className="text-xl font-semibold mb-6 text-gray-900">Business Information</h2>

        <div className="space-y-4 mb-6">
          <Input placeholder="Store Name" className="w-full  border-gray-200 rounded-lg px-4 py-3" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select>
              <SelectTrigger className=" border-gray-200 rounded-lg px-4 py-3">
                <SelectValue placeholder="Business Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="wholesale">Wholesale</SelectItem>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                <SelectItem value="services">Services</SelectItem>
              </SelectContent>
            </Select>

            <Input placeholder="Website" className="bg-gray-50 border-gray-200 rounded-lg px-4 py-3" />
          </div>
        </div>

        {/* Logo Upload Area */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center mb-8">
          <div className="flex flex-col items-center">
            <Upload className="w-12 h-12 text-teal-600 mb-2" />
            <p className="text-gray-600 font-medium">
              Drop your <span className="text-teal-600">Business Logo</span>
            </p>
            <p className="text-sm text-gray-500">Recommended: PNG, JPG & GIF files</p>
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="mb-8 bg-white border p-6 rounded-2xl">
        <h2 className="text-xl font-semibold mb-6 text-gray-900">Contact Information</h2>

        <div className="space-y-4">
          <Input
            placeholder="Business Email"
            type="email"
            className="w-full bg-gray-50 border-gray-200 rounded-lg px-4 py-3"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Phone Number" className="bg-gray-50 border-gray-200 rounded-lg px-4 py-3" />
            <Input placeholder="Phone Number (Secondary)" className="bg-gray-50 border-gray-200 rounded-lg px-4 py-3" />
          </div>

          <Input
            placeholder="Apartment/Suite/Building No."
            className="w-full bg-gray-50 border-gray-200 rounded-lg px-4 py-3"
          />

          <Input placeholder="Street Address" className="w-full bg-gray-50 border-gray-200 rounded-lg px-4 py-3" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="City" className="bg-gray-50 border-gray-200 rounded-lg px-4 py-3" />
            <Input placeholder="State/Province/Region" className="bg-gray-50 border-gray-200 rounded-lg px-4 py-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Postal Code/ZIP Code" className="bg-gray-50 border-gray-200 rounded-lg px-4 py-3" />
            <Input placeholder="Country" className="bg-gray-50 border-gray-200 rounded-lg px-4 py-3" />
          </div>
        </div>
      </div>

      {/* Bank Account Details Section */}
      <div className="mb-8 bg-white border p-6 rounded-2xl">
        <h2 className="text-xl font-semibold mb-6 text-gray-900">Bank Account Details</h2>

        <div className="space-y-4">
          <Input placeholder="Account Holder Name" className="w-full bg-gray-50 border-gray-200 rounded-lg px-4 py-3" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Bank Name" className="bg-gray-50 border-gray-200 rounded-lg px-4 py-3" />
            <Input placeholder="IFSC/SWIFT Code" className="bg-gray-50 border-gray-200 rounded-lg px-4 py-3" />
          </div>

          <Input placeholder="Account Number" className="w-full bg-gray-50 border-gray-200 rounded-lg px-4 py-3" />

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="withdrawal"
                defaultChecked
                className="data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600"
              />
              <label htmlFor="withdrawal" className="text-sm text-gray-700">
                Use this account for my withdrawals
              </label>
            </div>
            <button className="text-teal-600 text-sm font-medium hover:underline">+ Add New Account</button>
          </div>
        </div>
      </div>

      {/* Tax Details Section */}
      <div className="mb-8 bg-white border p-6 rounded-2xl">
        <h2 className="text-xl font-semibold mb-6 text-gray-900">Tax Details</h2>

        <div className="space-y-4">
          <Input placeholder="GST Number" className="w-full bg-gray-50 border-gray-200 rounded-lg px-4 py-3" />

          <Input placeholder="PAN Number" className="w-full bg-gray-50 border-gray-200 rounded-lg px-4 py-3" />

          <Select>
            <SelectTrigger className="w-full bg-gray-50 border-gray-200 rounded-lg px-4 py-3">
              <SelectValue placeholder="Tax Category (Individual or Business)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="individual">Individual</SelectItem>
              <SelectItem value="business">Business</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Shipping & Return Policies Section */}
      <div className="mb-8 bg-white border p-6 rounded-2xl">
        <h2 className="text-xl font-semibold mb-6 text-gray-900">Shipping & Return Policies</h2>

        <div className="space-y-4">
          <Textarea
            placeholder="Describe your shipping methods and delivery timeline"
            className="w-full bg-gray-50 border-gray-200 rounded-lg px-4 py-3 min-h-[120px] resize-none"
          />

          <Textarea
            placeholder="Describe your cancellation policy"
            className="w-full bg-gray-50 border-gray-200 rounded-lg px-4 py-3 min-h-[120px] resize-none"
          />

          <Textarea
            placeholder="Describe your cancellation policy"
            className="w-full bg-gray-50 border-gray-200 rounded-lg px-4 py-3 min-h-[120px] resize-none"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4">
        <Button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-medium">
          Save Changes
        </Button>
        <Button
          variant="outline"
          className="flex-1 text-red-600 border-red-600 hover:bg-red-50 py-3 rounded-lg font-medium"
        >
          Cancel
        </Button>
      </div>
    </ScrollArea>
  )
}

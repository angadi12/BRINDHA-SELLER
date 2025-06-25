"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchSellarprofile } from "@/lib/Redux/Slices/sellarSlice";
import { Label } from "@/components/ui/label";

export default function Component() {
  const { profile, loadingprofile, profileerror } = useSelector(
    (state) => state.sellar
  );
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    BussinessName: "",
    BussinessEmail: "",
    BussinessNumber: "",
    BussinessWebsite: "",
    Bussinesstype: "",

    GstNumber: "",
    PanNumber: "",

    Address: {
      State: "",
      City: "",
      Country: "",
      Place: "",
      Pincode: "",
    },

    Bankdetails: {
      AccountholderName: "",
      BankName: "",
      Accountnumber: "",
      Ifsc: "",
    },

    Documents: {
      AddressProof: "",
      AadharCard: "",
      Pincard: "",
      BankPassbook: "",
    },
  });

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    dispatch(fetchSellarprofile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      const data = profile;
      setFormData({
        BussinessName: data.BussinessName || "",
        BussinessEmail: data.BussinessEmail || "",
        BussinessNumber: data.BussinessNumber?.toString() || "",
        BussinessWebsite: data.BussinessWebsite || "",
        Bussinesstype: data.Bussinesstype || "",
        GstNumber: data.GstNumber || "",
        PanNumber: data.PanNumber || "",

        Address: {
          State: data.Address?.State || "",
          City: data.Address?.City || "",
          Country: data.Address?.Country || "",
          Place: data.Address?.Place || "",
          Pincode: data.Address?.Pincode?.toString() || "",
        },

        Bankdetails: {
          AccountholderName: data.Bankdetails?.AccountholderName || "",
          BankName: data.Bankdetails?.BankName || "",
          Accountnumber: data.Bankdetails?.Accountnumber || "",
          Ifsc: data.Bankdetails?.Ifsc || "",
        },

        Documents: {
          AddressProof: data.Documents?.AddressProof || "",
          AadharCard: data.Documents?.AadharCard || "",
          Pincard: data.Documents?.Pincard || "",
          BankPassbook: data.Documents?.BankPassbook || "",
        },
      });
    }
  }, [profile]);

  // const handleSubmit = async () => {
  //   try {
  //     await dispatch(updateCompanyData(formData)); // adjust thunk/action accordingly
  //     toast.success("Profile updated!");
  //   } catch (err) {
  //     toast.error("Update failed");
  //   }
  // };

  return (
    <>
   {loadingprofile?<div className="w-full h-screen flex justify-center items-center"><span className="loader2"></span></div>: <ScrollArea className="w-full mx-auto h-screen pb-14 p-4 bg-gray-50">
      {/* Business Information Section */}
      <div className="mb-8 bg-white border p-6 rounded-2xl ">
        <h2 className="text-xl font-semibold mb-6 text-gray-900">
          Business Information
        </h2>

        <div className="space-y-4 mb-6">
          <Label htmlFor="Bussiness Name">Bussiness Name</Label>
          <Input
            placeholder="Bussiness Name"
            className="w-full  border-gray-200 rounded-lg px-4 py-3"
            value={formData.BussinessName}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                BussinessName: e.target.value,
              }))
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            {/* <Select>
              <SelectTrigger className=" border-gray-200 rounded-lg px-4 py-3">
                <SelectValue placeholder="Business Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="wholesale">Wholesale</SelectItem>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                <SelectItem value="services">Services</SelectItem>
              </SelectContent>
            </Select> */}
            <Label htmlFor="Website">Bussiness Website</Label>
            <Input
              placeholder="Website"
              className="bg-gray-50 border-gray-200 rounded-lg px-4 py-3"
              value={formData.BussinessWebsite}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  BussinessWebsite: e.target.value,
                }))
              }
            />
          </div>
        </div>

        {/* Logo Upload Area */}
        {/* <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center mb-8">
          <div className="flex flex-col items-center">
            <Upload className="w-12 h-12 text-[#106C83] mb-2" />
            <p className="text-gray-600 font-medium">
              Drop your <span className="text-[#106C83]">Business Logo</span>
            </p>
            <p className="text-sm text-gray-500">Recommended: PNG, JPG & GIF files</p>
          </div>
        </div> */}
      </div>

      {/* Contact Information Section */}
      <div className="mb-8 bg-white border p-6 rounded-2xl">
        <h2 className="text-xl font-semibold mb-6 text-gray-900">
          Contact Information
        </h2>

        <div className="space-y-4">
          <Label htmlFor="Business Email">Business Email</Label>

          <Input
            placeholder="Business Email"
            type="email"
            className="w-full bg-gray-50 border-gray-200 rounded-lg px-4 py-3"
            value={formData.BussinessEmail}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                BussinessEmail: e.target.value,
              }))
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-4 items-start justify-start">
              <Label htmlFor="Phone Number">Business Number</Label>

              <Input
                placeholder="Phone Number"
                className="bg-gray-50 border-gray-200 rounded-lg px-4 py-3"
                value={formData.BussinessNumber}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    BussinessNumber: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col gap-4 items-start justify-start">
              <Label htmlFor="Phone Number (Secondary)">
                Phone Number (Secondary)
              </Label>

              <Input
                placeholder="Phone Number (Secondary)"
                className="bg-gray-50 border-gray-200 rounded-lg px-4 py-3"
                value={formData.BussinessNumber}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    BussinessNumber: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-4 items-start justify-start">
              <Label htmlFor="Country">Country</Label>

              <Input
                placeholder="Country"
                className="w-full bg-gray-50 border-gray-200 rounded-lg px-4 py-3"
                value={formData.Address.Country}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    Address: {
                      ...prev.Address,
                      Country: e.target.value,
                    },
                  }))
                }
              />
            </div>
            <div className="flex flex-col gap-4 items-start justify-start">
              <Label htmlFor="State">State</Label>

              <Input
                placeholder="State"
                className="w-full bg-gray-50 border-gray-200 rounded-lg px-4 py-3"
                value={formData.Address.State}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    Address: {
                      ...prev.Address,
                      State: e.target.value,
                    },
                  }))
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-4 items-start justify-start">
              <Label htmlFor="City">City</Label>

              <Input
                placeholder="City"
                className="bg-gray-50 border-gray-200 rounded-lg px-4 py-3"
                value={formData.Address.City}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    Address: {
                      ...prev.Address,
                      City: e.target.value,
                    },
                  }))
                }
              />
            </div>
            <div className="flex flex-col gap-4 items-start justify-start">
              <Label htmlFor="Postal Code/ZIP Code">Postal Code/ZIP Code</Label>

              <Input
                placeholder="Postal Code/ZIP Code"
                className="bg-gray-50 border-gray-200 rounded-lg px-4 py-3"
                value={formData.Address.Pincode}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    Address: {
                      ...prev.Address,
                      Pincode: e.target.value,
                    },
                  }))
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bank Account Details Section */}
      <div className="mb-8 bg-white border p-6 rounded-2xl">
        <h2 className="text-xl font-semibold mb-6 text-gray-900">
          Bank Account Details
        </h2>

        <div className="space-y-4">
          <Label htmlFor="Account Holder Name">Account Holder Name</Label>

          <Input
            placeholder="Account Holder Name"
            className="w-full bg-gray-50 border-gray-200 rounded-lg px-4 py-3"
            value={formData.Bankdetails.AccountholderName}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                Bankdetails: {
                  ...prev.Bankdetails,
                  AccountholderName: e.target.value,
                },
              }))
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-4 items-start justify-start">
              <Label htmlFor="Bank Name">Bank Name</Label>

              <Input
                placeholder="Bank Name"
                className="bg-gray-50 border-gray-200 rounded-lg px-4 py-3"
                value={formData.Bankdetails.BankName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    Bankdetails: {
                      ...prev.Bankdetails,
                      BankName: e.target.value,
                    },
                  }))
                }
              />
            </div>
            <div className="flex flex-col gap-4 items-start justify-start">
              <Label htmlFor="IFSC/SWIFT Code">IFSC Code</Label>

              <Input
                placeholder="IFSC/SWIFT Code"
                className="bg-gray-50 border-gray-200 rounded-lg px-4 py-3"
                value={formData.Bankdetails.Ifsc}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    Bankdetails: {
                      ...prev.Bankdetails,
                      Ifsc: e.target.value,
                    },
                  }))
                }
              />
            </div>
          </div>
          <Label htmlFor="Account Number">Account Number</Label>

          <Input
            placeholder="Account Number"
            className="w-full bg-gray-50 border-gray-200 rounded-lg px-4 py-3"
            value={formData.Bankdetails.Accountnumber}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                Bankdetails: {
                  ...prev.Bankdetails,
                  Accountnumber: e.target.value,
                },
              }))
            }
          />

          {/* <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="withdrawal"
                defaultChecked
                className="data-[state=checked]:bg-[#106C83] data-[state=checked]:border-[#106C83]"
              />
              <label htmlFor="withdrawal" className="text-sm text-gray-700">
                Use this account for my withdrawals
              </label>
            </div>
            <button className="text-[#106C83] text-sm font-medium hover:underline">
              + Add New Account
            </button>
          </div> */}
        </div>
      </div>

      {/* Tax Details Section */}
      <div className="mb-8 bg-white border p-6 rounded-2xl">
        <h2 className="text-xl font-semibold mb-6 text-gray-900">
          Tax Details
        </h2>

        <div className="space-y-4">
          <Label htmlFor="GST Number">GST Number</Label>
          <Input
            placeholder="GST Number"
            className="w-full bg-gray-50 border-gray-200 rounded-lg px-4 py-3"
            value={formData.GstNumber}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                GstNumber: e.target.value,
              }))
            }
          />
          <Label htmlFor="PAN Number">PAN Number</Label>

          <Input
            placeholder="PAN Number"
            className="w-full bg-gray-50 border-gray-200 rounded-lg px-4 py-3"
            value={formData.PanNumber}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                PanNumber: e.target.value,
              }))
            }
          />
          <Label htmlFor="Bussiness type">Bussiness type</Label>

          <Input
            placeholder="Bussiness type"
            className="w-full bg-gray-50 border-gray-200 rounded-lg px-4 py-3"
            value={formData.Bussinesstype}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                Bussinesstype: e.target.value,
              }))
            }
          />

          {/* <Select>
            <SelectTrigger className="w-full bg-gray-50 border-gray-200 rounded-lg px-4 py-3">
              <SelectValue placeholder="Tax Category (Individual or Business)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="individual">Individual</SelectItem>
              <SelectItem value="business">Business</SelectItem>
            </SelectContent>
          </Select> */}
        </div>
      </div>

      {/* Shipping & Return Policies Section */}
      {/* <div className="mb-8 bg-white border p-6 rounded-2xl">
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
      </div> */}
      <div className=" p-6 rounded-2xl">
        <div className="flex gap-4 mb-8">
          <Button className="flex-1 bg-[#106C83] hover:bg-[#106C83] text-white py-3 rounded-lg font-medium">
            Save Changes
          </Button>
          <Button
            variant="outline"
            className="flex-1 text-red-600 border-red-600 hover:bg-red-50 py-3 rounded-lg font-medium"
          >
            Cancel
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
    </ScrollArea>}

    </>
  );
}

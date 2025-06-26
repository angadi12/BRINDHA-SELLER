"use client";

import { DialogTrigger } from "@/components/ui/dialog";

import React from "react";

import { useState } from "react";
import { Button } from "@heroui/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, Building2, Delete } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Sendverification } from "@/lib/API/Auth/Auth";
import { Uploadfiles } from "@/lib/API/fileupload/multiplefile";
import { useToast } from "@/components/ui/toast-provider";
import { getVerificationStatusThunk } from "@/lib/Redux/Slices/vendorSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

export default function CompanyRegistrationDialog() {
  const { addToast } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    BussinessName: "",
    BussinessEmail: "",
    BussinessNumber: "",
    BussinessWebsite: "",
    Bussinesstype: "",
    GstNumber: "",
    PanNumber: "",
    Bankdetails: {
      AccountholderName: "",
      BankName: "",
      Accountnumber: "",
      Ifsc: "",
    },
    Address: {
      State: "",
      City: "",
      Country: "",
      Place: "",
      Pincode: "",
    },
    Documents: {
      AddressProof: null,
      AadharCard: null,
      Pincard: null,
      BankPassbook: null,
    },
  });

  const handleInputChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleFileUpload = (documentType, file) => {
    setFormData((prev) => ({
      ...prev,
      Documents: {
        ...prev.Documents,
        [documentType]: file,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      BussinessName,
      BussinessEmail,
      BussinessNumber,
      BussinessWebsite,
      Bussinesstype,
      GstNumber,
      PanNumber,
      Bankdetails,
      Address,
      Documents,
    } = formData;

    const requiredFields = [
      BussinessName,
      BussinessEmail,
      BussinessNumber,
      BussinessWebsite,
      Bussinesstype,
      GstNumber,
      PanNumber,
      Bankdetails.AccountholderName,
      Bankdetails.BankName,
      Bankdetails.Accountnumber,
      Bankdetails.Ifsc,
      Address.State,
      Address.City,
      Address.Country,
      Address.Place,
      Address.Pincode,
    ];

    const missing = requiredFields.some((field) => !field?.toString().trim());

    if (missing) {
      return addToast({
        title: `All fields are required`,
        description: `Please fill out all form fields before submitting.`,
        variant: "destructive",
        duration: 5000,
      });
    }

    const docFiles = Object.values(Documents).filter(Boolean);
    if (docFiles.length < 4) {
      return addToast({
        title: `All 4 documents are required`,
        description: `Please upload all required documents.`,
        variant: "destructive",
        duration: 5000,
      });
    }

    setLoading(true);
    try {
      const uploadRes = await Uploadfiles(docFiles);

      if (!uploadRes?.status || !uploadRes?.data) {
        throw new Error("File upload failed.");
      }

      const uploadedUrls = uploadRes.data;
      const docKeys = Object.keys(Documents);
      const mappedDocs = {};
      docKeys.forEach((key, index) => {
        mappedDocs[key] = uploadedUrls[index];
      });

      const finalPayload = {
        ...formData,
        Documents: mappedDocs,
      };

      const result = await Sendverification(finalPayload);

      if (result?.status) {
        addToast({
          title: "Verification submitted successfully",
          description: "Your business verification has been submitted.",
          variant: "success",
          duration: 5000,
        });
        dispatch(getVerificationStatusThunk());
        setOpen(false);
        router.refresh();
      } else {
        throw new Error(result?.message || "Verification failed");
      }
    } catch (error) {
      addToast({
        title: "Submission Failed",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
        duration: 5000,
      });
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const FileUploadField = ({
    label,
    documentType,
    accept = ".pdf,.jpg,.jpeg,.png",
  }) => {
    const handleRemoveFile = () => {
      setFormData((prev) => ({
        ...prev,
        Documents: {
          ...prev.Documents,
          [documentType]: null, // Remove the file
        },
      }));
    };

    return (
      <div className="space-y-2">
        <Label htmlFor={documentType}>{label}</Label>
        <div className="flex items-center gap-2">
          {formData.Documents[documentType] ? (
            <div className="flex items-center justify-between w-full gap-1 text-sm text-green-600">
              <div className="flex justify-center items-center gap-2">
                <FileText className="h-4 w-4" />
                {formData.Documents[documentType]?.name}
              </div>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="text-red-500 hover:text-red-700 ml-2 cursor-pointer"
              >
                <Delete />
              </button>
            </div>
          ) : (
            <Input
              id={documentType}
              type="file"
              accept={accept}
              onChange={(e) =>
                handleFileUpload(documentType, e.target.files?.[0] || null)
              }
              className="file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:font-medium file:bg-[#106C83] file:text-white hover:file:bg-[#0D5669]"
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#106C83] text-white rounded-md">
          Complete Verification
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <ScrollArea className="w-full max-h-[90vh] pb-10 px-4">
          <DialogHeader className="mb-4">
            <DialogTitle className="flex items-center gap-2 ">
              Account Verification
            </DialogTitle>
            <DialogDescription>
              Please fill in all the required information to register your
              company.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Business Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">
                    Business Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="businessName"
                    value={formData.BussinessName}
                    onChange={(e) =>
                      handleInputChange("BussinessName", e.target.value)
                    }
                    placeholder="Enter business name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessEmail">
                    Business Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="businessEmail"
                    type="email"
                    value={formData.BussinessEmail}
                    onChange={(e) =>
                      handleInputChange("BussinessEmail", e.target.value)
                    }
                    placeholder="contact@company.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessNumber">
                    Business Phone <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="Number"
                    id="businessNumber"
                    onChange={(e) =>
                      handleInputChange("BussinessNumber", e.target.value)
                    }
                    onBlur={() => {
                      if (
                        formData.BussinessNumber &&
                        formData.BussinessNumber.length !== 10
                      ) {
                        addToast({
                          title: "Invalid Phone Number",
                          description:
                            "Phone number should be exactly 10 digits.",
                          variant: "destructive",
                          duration: 1000,
                        });
                      }
                    }}
                    placeholder="Enter phone number"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessWebsite">Website</Label>
                  <Input
                    id="businessWebsite"
                    value={formData.BussinessWebsite}
                    onChange={(e) =>
                      handleInputChange("BussinessWebsite", e.target.value)
                    }
                    placeholder="https://www.company.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessType">
                    Business Type <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.Bussinesstype}
                    onValueChange={(value) =>
                      handleInputChange("Bussinesstype", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Company">Company</SelectItem>
                      <SelectItem value="Partnership">Partnership</SelectItem>
                      <SelectItem value="Proprietorship">
                        Proprietorship
                      </SelectItem>
                      <SelectItem value="LLP">LLP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Tax Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tax Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gstNumber">
                    GST Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="gstNumber"
                    value={formData.GstNumber}
                    onChange={(e) =>
                      handleInputChange("GstNumber", e.target.value)
                    }
                    placeholder="27AAAPL1234C1ZV"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="panNumber">
                    PAN Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="panNumber"
                    value={formData.PanNumber}
                    onChange={(e) =>
                      handleInputChange("PanNumber", e.target.value)
                    }
                    placeholder="AAAPL1234C"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Bank Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Bank Details</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="accountHolderName">
                    Account Holder Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="accountHolderName"
                    value={formData.Bankdetails.AccountholderName}
                    onChange={(e) =>
                      handleInputChange(
                        "Bankdetails.AccountholderName",
                        e.target.value
                      )
                    }
                    placeholder="Company Name Pvt Ltd"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bankName">
                    Bank Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="bankName"
                    value={formData.Bankdetails.BankName}
                    onChange={(e) =>
                      handleInputChange("Bankdetails.BankName", e.target.value)
                    }
                    placeholder="HDFC Bank"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">
                    Account Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="Number"
                    id="accountNumber"
                    value={formData.Bankdetails.Accountnumber}
                    onChange={(e) =>
                      handleInputChange(
                        "Bankdetails.Accountnumber",
                        e.target.value
                      )
                    }
                    placeholder="123456789012"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ifscCode">
                    IFSC Code <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="ifscCode"
                    value={formData.Bankdetails.Ifsc}
                    onChange={(e) =>
                      handleInputChange("Bankdetails.Ifsc", e.target.value)
                    }
                    placeholder="HDFC0001234"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Address Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Address Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country">
                    Country <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.Address.Country}
                    onValueChange={(value) =>
                      handleInputChange("Address.Country", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="India">India</SelectItem>
                      {/* <SelectItem value="USA">USA</SelectItem>
                      <SelectItem value="UK">UK</SelectItem> */}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">
                    State <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="state"
                    value={formData.Address.State}
                    onChange={(e) =>
                      handleInputChange("Address.State", e.target.value)
                    }
                    placeholder="Maharashtra"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">
                    City <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="city"
                    value={formData.Address.City}
                    onChange={(e) =>
                      handleInputChange("Address.City", e.target.value)
                    }
                    placeholder="Pune"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="place">
                    Area/Place <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="place"
                    value={formData.Address.Place}
                    onChange={(e) =>
                      handleInputChange("Address.Place", e.target.value)
                    }
                    placeholder="Shivaji Nagar"
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="pincode">
                    Pincode <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type={"Number"}
                    id="pincode"
                    value={formData.Address.Pincode}
                    onChange={(e) =>
                      handleInputChange("Address.Pincode", e.target.value)
                    }
                    placeholder="411005"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Document Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Document Upload
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FileUploadField
                  label="Address Proof "
                  documentType="AddressProof"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <FileUploadField
                  label="Aadhar Card "
                  documentType="AadharCard"
                  accept=".jpg,.jpeg,.png,.pdf"
                />
                <FileUploadField
                  label="PAN Card "
                  documentType="Pincard"
                  accept=".jpg,.jpeg,.png,.pdf"
                />
                <FileUploadField
                  label="Bank Passbook "
                  documentType="BankPassbook"
                  accept=".jpg,.jpeg,.png,.pdf"
                />
              </CardContent>
            </Card>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="w-60 bg-[#106C83] text-white rounded-md"
                type="submit"
              >
                {loading ? <span className="loader"></span> : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { useEffect, useState } from "react";
import {
  AlertTriangle,
  LogOut,
  Upload,
  Check,
  Clock,
  X,
  FileText,
  Cross,
  OctagonX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import UploadDocumentDialog from "@/components/Verficationcomponents/upload-document-dialog";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getVerificationStatusThunk } from "@/lib/Redux/Slices/vendorSlice";
import CompanyRegistrationDialog from "@/components/Verficationcomponents/company-registration-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function NotVerifiedPage() {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({
    panCard: null,
    gstCertificate: null,
    sampleDocument: null,
  });
  const dispatch = useDispatch();
  const { status, loading, error } = useSelector((state) => state.vendor);

  const submittedDocuments = [
    {
      name: "Address Proof",
      status: "submitted",
      fileName: "address_proof.pdf",
    },
    { name: "Aadhar Card", status: "submitted", fileName: "aadhar_card.jpg" },
    { name: "PAN Card", status: "submitted", fileName: "pan_card.jpg" },
    {
      name: "Bank Passbook",
      status: "submitted",
      fileName: "bank_passbook.jpg",
    },
  ];

  const documents = [
    {
      id: "aadhar",
      name: "Aadhar Card",
      status: "verified",
      required: true,
      icon: Check,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      statusText: "Approved!",
    },
    {
      id: "panCard",
      name: "Pan Card",
      status: "pending",
      required: true,
      icon: Clock,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      statusText: "Pending!",
    },
    {
      id: "gstCertificate",
      name: "GST Certificate",
      status: "pending",
      required: false,
      icon: Clock,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      statusText: "Pending!",
    },
    {
      id: "sampleDocument1",
      name: "Sample document",
      status: "rejected",
      required: true,
      icon: X,
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
      statusText: "Rejected! Rejection Reason.",
    },
    {
      id: "sampleDocument2",
      name: "Sample document",
      status: "upload",
      required: true,
      icon: Upload,
      bgColor: "bg-gray-100",
      iconColor: "text-gray-600",
      statusText: "Upload Now",
    },
  ];

  const handleFileUpload = (documentId, file) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [documentId]: file,
    }));
  };

  const handleLogout = () => {
    setIsLogoutDialogOpen(false);
    Cookies.remove("token");
    Cookies.remove("isCompanyVerified");
    window.location.href = "/Signin";
  };

  useEffect(() => {
    dispatch(getVerificationStatusThunk());
  }, [dispatch]);

  useEffect(() => {
    if (status?.isCompanyVerified) {
      Cookies.set("isCompanyVerified", status.isCompanyVerified);
    }
  }, [status?.isCompanyVerified]);

  return (
    <>
      {loading ? (
        <div className="w-full flex justify-center items-center h-screen ">
          <span className="loader2"></span>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-50 p-4 flex justify-center items-center">
          {status?.isCompanyVerified === "Pending" && (
            <div className="max-w-5xl mx-auto space-y-6 border p-8 rounded-2xl bg-white ">
              {/* Header */}
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">
                  Account Verification
                </h1>
                <Dialog
                  open={isLogoutDialogOpen}
                  onOpenChange={setIsLogoutDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 border-[#106C83] text-[#106C83] hover:bg-[#106C83] hover:text-white"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-center">
                        Confirm Logout
                      </DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-center text-gray-600">
                        Are you sure you want to logout? You will need to sign
                        in again to access your account.
                      </p>
                    </div>
                    <div className="flex gap-3 justify-end">
                      <Button
                        variant="outline"
                        onClick={() => setIsLogoutDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={handleLogout}
                        className="flex items-center gap-2"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Alert Box */}
              <Alert className="border-red-800/30 bg-red-500/10">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <AlertTitle className="text-red-600">
                  Account Not Verified
                </AlertTitle>
                <AlertDescription className="text-red-600/80">
                  Your account verification is pending. Please upload the
                  required documents to complete your verification process. This
                  may take up to 48 hours to process.
                </AlertDescription>
              </Alert>

              {/* Single Verification Status Card */}
              <div className="bg-white rounded-lg shadow-sm border p-6 flex justify-center items-center flex-col gap-4">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex justify-center flex-col items-center gap-3">
                    <div className="p-3 bg-[#106C83]/10 rounded-full">
                      <AlertTriangle className="h-6 w-6 text-[#106C83]" />
                    </div>
                    <div className="flex justify-center items-center gap-2 flex-col">
                      <h2 className="text-xl font-semibold text-gray-900">
                        Verification Required
                      </h2>
                      <p className="text-gray-600">
                        Complete your document verification to access all
                        features
                      </p>
                    </div>
                  </div>
                  {/* <Badge
              variant="secondary"
              className="bg-[#106C83]/10 text-[#106C83] px-3 py-1 border-[#106C83]/20"
            >
              Pending Review
            </Badge> */}
                </div>

                {/* <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Document Progress</span>
                <span className="font-medium text-gray-900">
                  3 of 5 verified
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#106C83] h-2 rounded-full transition-all duration-300"
                  style={{ width: "60%" }}
                ></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Processing Time</span>
                <span className="font-medium text-gray-900">
                  Up to 48 hours
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>Average verification time</span>
              </div>
            </div>
          </div> */}

                <div className="flex flex-col sm:flex-row gap-3">
                  <CompanyRegistrationDialog />
                </div>
              </div>
            </div>
          )}

          {status?.isCompanyVerified === "Requestsend" && (
            <main className="max-w-5xl mx-auto space-y-6 border p-8 rounded-2xl bg-white ">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">
                  Account Verification
                </h1>
                <Dialog
                  open={isLogoutDialogOpen}
                  onOpenChange={setIsLogoutDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 border-[#106C83] text-[#106C83] hover:bg-[#106C83] hover:text-white"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-center">
                        Confirm Logout
                      </DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-center text-gray-600">
                        Are you sure you want to logout? You will need to sign
                        in again to access your account.
                      </p>
                    </div>
                    <div className="flex gap-3 justify-end">
                      <Button
                        variant="outline"
                        onClick={() => setIsLogoutDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={handleLogout}
                        className="flex items-center gap-2"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              {/* Alert Banner */}
              <Alert className="mb-8 border-orange-200 bg-orange-50">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <div>
                  <h3 className="font-medium text-orange-800 mb-1">
                    Verification In Progress
                  </h3>
                  <AlertDescription className="text-orange-700">
                    Your verification documents have been submitted
                    successfully. Our team is currently reviewing your
                    application. This process may take up to 48 hours to
                    complete.
                  </AlertDescription>
                </div>
              </Alert>

              {/* Main Status Card */}
              <Card className="bg-white rounded-lg border p-2 flex justify-center items-center flex-col gap-4">
                <CardContent className="flex flex-col items-center justify-center py-4 px-8 text-center">
                  {/* Clock Icon */}
                  <div className="w-16 h-16 bg-[#106C83]/10 rounded-full flex items-center justify-center mb-6">
                    <Clock className="h-8 w-8 text-[#106C83]" />
                  </div>

                  {/* Heading */}
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                    Verification Requested
                  </h2>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 max-w-md">
                    Your documents have been submitted and are currently under
                    review by our verification team.
                  </p>

                  {/* Status Badge */}
                  <div className="inline-flex items-center gap-2 bg-[#106C83]/10 text-[#106C83] px-4 py-2 rounded-full text-sm font-medium mb-6">
                    <Clock className="h-4 w-4" />
                    Review in Progress
                  </div>
                </CardContent>
              </Card>

              {/* Documents Status */}
              {/* <Card className="max-w-2xl mx-auto mb-8">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Submitted Documents
                  </h3>
                  <div className="space-y-3">
                    {submittedDocuments.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="font-medium text-gray-900">
                              {doc.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              {doc.fileName}
                            </p>
                          </div>
                        </div>
                        <span className="text-sm text-green-700 bg-green-100 px-2 py-1 rounded-full">
                          Submitted
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card> */}

              {/* What's Next Information */}
              {/* <Card className="max-w-2xl mx-auto">
                <CardContent className="p-6">
                  <h3 className="font-medium text-gray-900 mb-3">
                    What happens next?
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-[#106C83] text-white rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                        1
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Document Review
                        </p>
                        <p className="text-sm text-gray-600">
                          Our team verifies all submitted documents
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                        2
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">
                          Verification Complete
                        </p>
                        <p className="text-sm text-gray-600">
                          You'll receive an email notification with the results
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                        3
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">
                          Account Activation
                        </p>
                        <p className="text-sm text-gray-600">
                          Full access to all platform features upon approval
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card> */}

              {/* Contact Support */}
              <div className="max-w-2xl mx-auto mt-8 text-center">
                <p className="text-gray-600 text-sm">
                  Need help? Contact our support team at{" "}
                  <a
                    href="mailto:support@easypg.com"
                    className="text-[#106C83] hover:underline"
                  >
                    support@easypg.com
                  </a>
                </p>
              </div>
            </main>
          )}
          {status?.isCompanyVerified === "Reverify" && (
            <main className="max-w-5xl mx-auto space-y-6 border p-8 rounded-2xl bg-white ">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">
                  Account Verification
                </h1>
                <Dialog
                  open={isLogoutDialogOpen}
                  onOpenChange={setIsLogoutDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 border-[#106C83] text-[#106C83] hover:bg-[#106C83] hover:text-white"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-center">
                        Confirm Logout
                      </DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-center text-gray-600">
                        Are you sure you want to logout? You will need to sign
                        in again to access your account.
                      </p>
                    </div>
                    <div className="flex gap-3 justify-end">
                      <Button
                        variant="outline"
                        onClick={() => setIsLogoutDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={handleLogout}
                        className="flex items-center gap-2"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              {/* Alert Banner */}
              <Alert className="mb-8 border-orange-200 bg-orange-50">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <div>
                  <h3 className="font-medium text-orange-800 mb-1">
                    Verification In Progress
                  </h3>
                  <AlertDescription className="text-orange-700">
                    Your verification documents have been submitted
                    successfully. Our team is currently reviewing your
                    application. This process may take up to 48 hours to
                    complete.
                  </AlertDescription>
                </div>
              </Alert>

              {/* Main Status Card */}
              <Card className="bg-white rounded-lg border p-2 flex justify-center items-center flex-col gap-4">
                <CardContent className="flex flex-col items-center justify-center py-4 px-8 text-center">
                  {/* Clock Icon */}
                  <div className="w-16 h-16 bg-[#106C83]/10 rounded-full flex items-center justify-center mb-6">
                    <Clock className="h-8 w-8 text-[#106C83]" />
                  </div>

                  {/* Heading */}
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                    Verification Requested
                  </h2>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 max-w-md">
                    Your documents have been submitted and are currently under
                    review by our verification team.
                  </p>

                  {/* Status Badge */}
                  <div className="inline-flex items-center gap-2 bg-[#106C83]/10 text-[#106C83] px-4 py-2 rounded-full text-sm font-medium mb-6">
                    <Clock className="h-4 w-4" />
                    Review in Progress
                  </div>
                </CardContent>
              </Card>

              {/* Documents Status */}
              {/* <Card className="max-w-2xl mx-auto mb-8">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Submitted Documents
                  </h3>
                  <div className="space-y-3">
                    {submittedDocuments.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="font-medium text-gray-900">
                              {doc.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              {doc.fileName}
                            </p>
                          </div>
                        </div>
                        <span className="text-sm text-green-700 bg-green-100 px-2 py-1 rounded-full">
                          Submitted
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card> */}

              {/* What's Next Information */}
              {/* <Card className="max-w-2xl mx-auto">
                <CardContent className="p-6">
                  <h3 className="font-medium text-gray-900 mb-3">
                    What happens next?
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-[#106C83] text-white rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                        1
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Document Review
                        </p>
                        <p className="text-sm text-gray-600">
                          Our team verifies all submitted documents
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                        2
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">
                          Verification Complete
                        </p>
                        <p className="text-sm text-gray-600">
                          You'll receive an email notification with the results
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                        3
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">
                          Account Activation
                        </p>
                        <p className="text-sm text-gray-600">
                          Full access to all platform features upon approval
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card> */}

              {/* Contact Support */}
              <div className="max-w-2xl mx-auto mt-8 text-center">
                <p className="text-gray-600 text-sm">
                  Need help? Contact our support team at{" "}
                  <a
                    href="mailto:support@easypg.com"
                    className="text-[#106C83] hover:underline"
                  >
                    support@easypg.com
                  </a>
                </p>
              </div>
            </main>
          )}
          {status?.isCompanyVerified === "Rejected" && (
            <main className="max-w-5xl mx-auto space-y-6 border p-8 rounded-2xl bg-white ">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">
                  Account Verification
                </h1>
                <Dialog
                  open={isLogoutDialogOpen}
                  onOpenChange={setIsLogoutDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 border-[#106C83] text-[#106C83] hover:bg-[#106C83] hover:text-white"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-center">
                        Confirm Logout
                      </DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-center text-gray-600">
                        Are you sure you want to logout? You will need to sign
                        in again to access your account.
                      </p>
                    </div>
                    <div className="flex gap-3 justify-end">
                      <Button
                        variant="outline"
                        onClick={() => setIsLogoutDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={handleLogout}
                        className="flex items-center gap-2"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              {/* Alert Banner */}
              <Alert className="mb-8 border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <div>
                  <h3 className="font-medium text-orange-800 mb-1">
                    Verification Rejected
                  </h3>
                  <AlertDescription className="text-orange-700">
                    Your verification documents have been Rejected.
                    
                  </AlertDescription>
                </div>
              </Alert>

              {/* Main Status Card */}
              <Card className="bg-white rounded-lg border p-2 flex justify-center items-center flex-col gap-4">
                <CardContent className="flex flex-col items-center justify-center py-4 px-8 text-center">
                  {/* Clock Icon */}
                  <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mb-6">
                    <OctagonX className="h-8 w-8 text-red-700" />
                  </div>

                  {/* Heading */}
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                    Verification Rejected
                  </h2>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 max-w-md">
                    Your documents have been submitted and are Rejected
                     by our verification team.
                  </p>

                  {/* Status Badge */}
                  {/* <div className="inline-flex items-center gap-2 bg-[#106C83]/10 text-[#106C83] px-4 py-2 rounded-full text-sm font-medium mb-6">
                    <Clock className="h-4 w-4" />
                    Review in Progress
                  </div> */}
                </CardContent>
              </Card>

              {/* Documents Status */}
              {/* <Card className="max-w-2xl mx-auto mb-8">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Submitted Documents
                  </h3>
                  <div className="space-y-3">
                    {submittedDocuments.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="font-medium text-gray-900">
                              {doc.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              {doc.fileName}
                            </p>
                          </div>
                        </div>
                        <span className="text-sm text-green-700 bg-green-100 px-2 py-1 rounded-full">
                          Submitted
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card> */}

              {/* What's Next Information */}
              {/* <Card className="max-w-2xl mx-auto">
                <CardContent className="p-6">
                  <h3 className="font-medium text-gray-900 mb-3">
                    What happens next?
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-[#106C83] text-white rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                        1
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Document Review
                        </p>
                        <p className="text-sm text-gray-600">
                          Our team verifies all submitted documents
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                        2
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">
                          Verification Complete
                        </p>
                        <p className="text-sm text-gray-600">
                          You'll receive an email notification with the results
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                        3
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">
                          Account Activation
                        </p>
                        <p className="text-sm text-gray-600">
                          Full access to all platform features upon approval
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card> */}

              {/* Contact Support */}
              <div className="max-w-2xl mx-auto mt-8 text-center">
                <p className="text-gray-600 text-sm">
                  Need help? Contact our support team at{" "}
                  <a
                    href="mailto:support@easypg.com"
                    className="text-[#106C83] hover:underline"
                  >
                    support@easypg.com
                  </a>
                </p>
              </div>
            </main>
          )}

          
        </div>
      )}
    </>
  );
}

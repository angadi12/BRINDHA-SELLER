"use client";

import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  Upload,
  FileSpreadsheet,
  AlertCircle,
} from "lucide-react";
import { BaseUrl } from "@/lib/API/Baseurl";
import Cookies from "js-cookie";

export default function Uploadbulk() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [processedCount, setProcessedCount] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setUploadStatus("idle");
      setStatusMessage("");
      setProcessedCount(0);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const droppedFile = droppedFiles[0];
      if (
        droppedFile.name.endsWith(".xlsx") ||
        droppedFile.name.endsWith(".xls")
      ) {
        setFile(droppedFile);
        setUploadStatus("idle");
        setStatusMessage("");
        setProcessedCount(0);
      } else {
        setUploadStatus("error");
        setStatusMessage("Please select a valid Excel file (.xlsx or .xls)");
      }
    }
  };

  const handleAddBulkProduct = async () => {
    if (!file) {
      setUploadStatus("error");
      setStatusMessage("Please select an XLSX file first");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setUploadStatus("idle");
  const token = Cookies.get("token");

    try {
      const formData = new FormData();
      formData.append("file", file);

      setUploadProgress(25);

      const response = await fetch(`${BaseUrl}/product/bulk/upload`, {
        method: "POST",
        headers: {
          token: token,
        },
        body: formData,
      });

      setUploadProgress(75);

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(
          `Upload failed: ${response.status} ${response.statusText}. ${errorData}`
        );
      }

      const result = await response.json();
      setUploadProgress(100);

      setUploadStatus("success");
      setStatusMessage(
        result.message ||
          `Successfully uploaded ${file.name}. ${
            result.processedCount || "Products"
          } processed.`
      );
      setProcessedCount(result.processedCount || 0);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "An error occurred while uploading the file. Please check your connection and try again."
      );
    } finally {
      setIsUploading(false);
    }
  };

  const openDialog = () => {
    setFile(null);
    setUploadStatus("idle");
    setStatusMessage("");
    setProcessedCount(0);
    setUploadProgress(0);
    setIsDialogOpen(true);
  };

  return (
    <div className="">
      <div className="mx-auto ">
        <Button
          onClick={openDialog}
          className="w-full  bg-[#106C83] hover:bg-[#0d5a6e] cursor-pointer text-white"
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload Products from Excel
        </Button>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent
            className="max-w-2xl max-h-[90vh] overflow-y-auto"
            onPointerDownOutside={(e) => e.preventDefault()}
            onEscapeKeyDown={(e) => e.preventDefault()}
          >
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5" />
                Upload XLSX File
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              <p className="text-sm text-slate-600">
                Select an Excel file containing your product data.
              </p>

              <div className="space-y-4">
                <div
                  className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                    isDragOver
                      ? "border-teal-500 bg-teal-50"
                      : "border-slate-300 hover:border-slate-400 hover:bg-slate-50"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById("bulkFile")?.click()}
                >
                  <div className="flex flex-col items-center gap-4">
                    <div
                      className={`p-3 rounded-full ${
                        isDragOver ? "bg-teal-100" : "bg-slate-100"
                      }`}
                    >
                      <Upload
                        className={`h-8 w-8 ${
                          isDragOver ? "text-teal-600" : "text-slate-600"
                        }`}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-slate-900 mb-1">
                        {file ? "File Selected" : "Upload your XLSX File"}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {file
                          ? "Click to change file or drag a new one"
                          : "Recommended: XLSX & XLS files"}
                      </p>
                    </div>
                    {isDragOver && (
                      <p className="text-sm font-medium text-teal-600">
                        Drop your file here
                      </p>
                    )}
                  </div>
                </div>

                <input
                  id="bulkFile"
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {file && (
                  <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                    <FileSpreadsheet className="h-4 w-4" />
                    <span>{file.name}</span>
                    <span className="text-slate-400">
                      ({(file.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                )}
              </div>

              <Button
                onClick={handleAddBulkProduct}
                disabled={!file || isUploading}
                className="w-full  bg-[#106C83] hover:bg-[#0d5a6e] cursor-pointer text-white"
              >
                {isUploading ? (
                  <>
                    <Upload className="mr-2 h-4 w-4 animate-spin" />
                    Processing... ({processedCount} items)
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Products
                  </>
                )}
              </Button>

              {isUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Progress</span>
                    <span>{Math.round(uploadProgress)}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}

              {uploadStatus === "success" && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    {statusMessage}
                  </AlertDescription>
                </Alert>
              )}

              {uploadStatus === "error" && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    {statusMessage}
                  </AlertDescription>
                </Alert>
              )}

              {/* <div className="border-t pt-4">
                <h4 className="font-medium text-sm mb-2">
                  Expected File Format
                </h4>
                <div className="text-xs text-slate-600 space-y-2">
                  <p>
                    <strong>Required columns:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>
                      <code className="bg-slate-100 px-1 rounded">name</code> -
                      Product name
                    </li>
                    <li>
                      <code className="bg-slate-100 px-1 rounded">price</code> -
                      Product price (number)
                    </li>
                  </ul>
                  <p>
                    <strong>Optional columns:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>
                      <code className="bg-slate-100 px-1 rounded">
                        category
                      </code>{" "}
                      - Product category
                    </li>
                    <li>
                      <code className="bg-slate-100 px-1 rounded">
                        description
                      </code>{" "}
                      - Product description
                    </li>
                  </ul>
                </div>
              </div> */}

              {uploadStatus === "success" && (
                <Button
                  onClick={() => setIsDialogOpen(false)}
                  variant="outline"
                  className="w-full"
                >
                  Close
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

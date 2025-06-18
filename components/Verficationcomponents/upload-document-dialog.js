"use client";

import React from "react";
import { X, Plus, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UploadDocumentDialog({
  isOpen,
  onOpenChange,
  documents,
  uploadedFiles,
  onFileUpload,
  children,
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            Upload Documents for Verification
          </DialogTitle>
          <p className="text-sm text-gray-600 text-center">
            Within 48 Hours your documents will be verified and you are good to
            go!
          </p>
        </DialogHeader>

        <div className="space-y-4 mt-6">
          {documents.map((doc) => {
            const IconComponent = doc.icon;
            return (
              <div key={doc.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${doc.bgColor}`}>
                      <IconComponent className={`h-5 w-5 ${doc.iconColor}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{doc.name}</span>
                        {doc.required && (
                          <span className="text-red-500">*</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{doc.statusText}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {doc.status === "verified" && (
                      <>
                        <Button
                          variant="link"
                          size="sm"
                          className="text-[#106C83] p-0 hover:text-[#0d5a6e]"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add Comments
                        </Button>
                        <Badge className="bg-green-600 hover:bg-green-600">
                          Verified
                        </Badge>
                      </>
                    )}

                    {doc.status === "pending" && (
                      <>
                        <Button
                          variant="link"
                          size="sm"
                          className="text-[#106C83] p-0 hover:text-[#0d5a6e]"
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit Comment
                        </Button>
                        <div className="flex items-center gap-2">
                          <Input
                            type="file"
                            className="hidden"
                            id={`file-${doc.id}`}
                            onChange={(e) =>
                              onFileUpload(doc.id, e.target.files?.[0] || null)
                            }
                          />
                          <Label
                            htmlFor={`file-${doc.id}`}
                            className="bg-gray-100 px-3 py-1 rounded text-sm cursor-pointer flex items-center gap-1"
                          >
                            file.png
                            <X className="h-3 w-3" />
                          </Label>
                        </div>
                      </>
                    )}

                    {doc.status === "rejected" && (
                      <>
                        <Button
                          variant="link"
                          size="sm"
                          className="text-[#106C83] p-0 hover:text-[#0d5a6e]"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add Comments
                        </Button>
                        <div className="flex items-center gap-2">
                          <Input
                            type="file"
                            className="hidden"
                            id={`file-${doc.id}`}
                            onChange={(e) =>
                              onFileUpload(doc.id, e.target.files?.[0] || null)
                            }
                          />
                          <Label
                            htmlFor={`file-${doc.id}`}
                            className="bg-gray-100 px-3 py-1 rounded text-sm cursor-pointer flex items-center gap-1"
                          >
                            file.png
                            <X className="h-3 w-3" />
                          </Label>
                        </div>
                      </>
                    )}

                    {doc.status === "upload" && (
                      <>
                        <Button
                          variant="link"
                          size="sm"
                          className="text-[#106C83] p-0 hover:text-[#0d5a6e]"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add Comments
                        </Button>
                        <div className="flex items-center gap-2">
                          <Input
                            type="file"
                            className="hidden"
                            id={`file-${doc.id}`}
                            onChange={(e) =>
                              onFileUpload(doc.id, e.target.files?.[0] || null)
                            }
                          />
                          <Label
                            htmlFor={`file-${doc.id}`}
                            className="cursor-pointer"
                          >
                            <Button
                              size="sm"
                              className="bg-[#106C83] hover:bg-[#0d5a6e] text-white"
                            >
                              Upload
                            </Button>
                          </Label>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          <div className="text-center pt-4">
            <Button
              variant="link"
              className="text-[#106C83] hover:text-[#0d5a6e]"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Additional Documents (Optional)
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

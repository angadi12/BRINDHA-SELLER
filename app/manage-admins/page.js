"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from "@/lib/Redux/Slices/adminSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Plus, Mail, Phone, Trash2, X, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/toast-provider";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AdminManagement() {
  const dispatch = useDispatch();
  const { list: admins, loading, error } = useSelector((state) => state.admins);
  const { addToast } = useToast();

  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const [createLoading, setCreateLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [formData, setFormData] = useState({
    Vendorname: "",
    Email: "",
    Number: "",
    Password: "",
    Permission: [],
  });

  const availablePermissions = [
    { id: "Dashboard", label: "Dashboard" },
    { id: "Product management", label: "Product management" },
    { id: "Order Management", label: "Order Management" },
    { id: "Earnings", label: "Earnings" },
    { id: "Messages", label: "Messages" },
    { id: "Customer Reviews", label: "Customer Reviews" },
  ];

  useEffect(() => {
    dispatch(fetchAdmins());
  }, [dispatch]);

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.Vendorname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.Email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (admin.Number ? String(admin.Number).includes(searchTerm) : false)
  );

  const handleCreateAdmin = async () => {
    setCreateLoading(true);
    try {
      const payload = {
        ...formData,
        Number: Number.parseInt(formData.Number),
      };
      await dispatch(createAdmin(payload)).unwrap();
      setShowCreateModal(false);
      setFormData({
        Vendorname: "",
        Email: "",
        Number: "",
        Password: "",
        Permission: [],
      });
      addToast({
        title: "Success",
        description: "Admin created successfully",
        variant: "success",
      });
    } catch (error) {
      addToast({
        title: "Error",
        description: "Failed to create admin",
        variant: "destructive",
      });
    } finally {
      setCreateLoading(false);
    }
  };

  const handleUpdateAdmin = async () => {
    if (!selectedAdmin) return;
    setUpdateLoading(true);
    try {
      const payload = {
        Vendorname: formData.Vendorname,
        Email: formData.Email,
        Number: Number.parseInt(formData.Number),
        Permission: formData.Permission,
        ...(formData.Password && { Password: formData.Password }),
      };
      await dispatch(
        updateAdmin({ id: selectedAdmin._id, data: payload })
      ).unwrap();
      setShowUpdateModal(false);
      setSelectedAdmin(null);
      setFormData({
        Vendorname: "",
        Email: "",
        Number: "",
        Password: "",
        Permission: [],
      });
      addToast({
        title: "Success",
        description: "Admin updated successfully",
        variant: "success",
      });
    } catch (error) {
      addToast({
        title: "Error",
        description: "Failed to update admin",
        variant: "destructive",
      });
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDeleteAdmin = async () => {
    if (!selectedAdmin) return;
    setDeleteLoading(true);
    try {
      await dispatch(deleteAdmin(selectedAdmin._id)).unwrap();
      setShowDeleteModal(false);
      setSelectedAdmin(null);
      addToast({
        title: "Success",
        description: "Admin deleted successfully",
        variant: "success",
      });
    } catch (error) {
      addToast({
        title: "Error",
        description: "Failed to delete admin",
        variant: "destructive",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  const openUpdateModal = (admin) => {
    setSelectedAdmin(admin);
    setFormData({
      Vendorname: admin.Vendorname || "",
      Email: admin.Email || "",
      Number: admin.Number?.toString() || "",
      Password: "", // Don't pre-fill password for security
      Permission: admin.Permission || [],
    });
    setShowUpdateModal(true);
  };

  const openDeleteModal = (admin) => {
    setSelectedAdmin(admin);
    setShowDeleteModal(true);
  };

  const handlePermissionChange = (permissionId, checked) => {
    setFormData((prev) => {
      const currentPermissions = prev.Permission || [];
      if (checked) {
        // Add permission if not already present
        return {
          ...prev,
          Permission: currentPermissions.includes(permissionId)
            ? currentPermissions
            : [...currentPermissions, permissionId],
        };
      } else {
        // Remove permission
        return {
          ...prev,
          Permission: currentPermissions.filter((p) => p !== permissionId),
        };
      }
    });
  };

  return (
    <ScrollArea className="p-6 w-full mx-auto pb-20 h-screen">
      {/* Header */}
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-gray-900">Manage Admins</h1>
          {/* <Badge
            variant="secondary"
            className="bg-[#106C83] text-white text-sm px-2 py-1 rounded-full"
          >
            ({filteredAdmins.length})
          </Badge> */}
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-10 w-80"
            />
          </div>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="bg-[#106C83] hover:bg-[#0d5a6e] text-white rounded-md h-10 w-16 p-0"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <Separator className={"my-4"} />
      {/* Admin Cards Grid */}
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAdmins.map((admin) => (
            <Card
              key={admin._id}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <CardContent className="p-6">
                {/* Permission Badges */}
                <div className="flex justify-end mb-4 flex-wrap gap-1">
                  {admin.Permission?.slice(0, 2).map((permission) => (
                    <Badge
                      key={permission}
                      className="bg-[#106C83] text-white px-2 py-1 rounded-full text-xs"
                    >
                      {permission}
                    </Badge>
                  ))}
                  {admin.Permission?.length > 2 && (
                    <Badge className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs">
                      +{admin.Permission.length - 2}
                    </Badge>
                  )}
                </div>

                {/* Admin Info */}
                <div className="space-y-4 mb-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <span className="text-2xl font-semibold text-gray-600">
                        {admin.Vendorname?.charAt(0)?.toUpperCase() || "A"}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {admin.Vendorname}
                    </h3>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">{admin.Email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span className="text-sm">{admin.Number}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => openUpdateModal(admin)}
                    disabled={updateLoading}
                    className="flex-1 bg-[#106C83] hover:bg-[#0d5a6e] text-white font-semibold py-2 rounded-lg"
                  >
                    MODIFY
                  </Button>
                  <Button
                    onClick={() => openDeleteModal(admin)}
                    disabled={deleteLoading}
                    variant="outline"
                    size="icon"
                    className="border-[#106C83] text-[#106C83] hover:bg-[#106C83] hover:text-white"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create Admin Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-bold">
                Create New Admin
              </DialogTitle>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Fill Admin Details</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vendorname">Vendor Name</Label>
                <Input
                  id="vendorname"
                  placeholder="Vendor Name"
                  value={formData.Vendorname}
                  onChange={(e) =>
                    setFormData({ ...formData, Vendorname: e.target.value })
                  }
                  disabled={createLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="number">Phone Number</Label>
                <Input
                  id="number"
                  placeholder="Phone Number"
                  value={formData.Number}
                  onChange={(e) =>
                    setFormData({ ...formData, Number: e.target.value })
                  }
                  disabled={createLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={formData.Email}
                onChange={(e) =>
                  setFormData({ ...formData, Email: e.target.value })
                }
                disabled={createLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={formData.Password}
                onChange={(e) =>
                  setFormData({ ...formData, Password: e.target.value })
                }
                disabled={createLoading}
              />
            </div>

            <div className="space-y-3">
              <Label>Permissions</Label>
              <div className="grid grid-cols-2 gap-3">
                {availablePermissions.map((permission) => (
                  <div
                    key={permission.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={permission.id}
                      checked={formData.Permission.includes(permission.id)}
                      onCheckedChange={(checked) =>
                        handlePermissionChange(permission.id, checked)
                      }
                      disabled={createLoading}
                    />
                    <Label
                      htmlFor={permission.id}
                      className="text-sm font-normal"
                    >
                      {permission.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={handleCreateAdmin}
              disabled={createLoading}
              className="w-full bg-[#106C83] hover:bg-[#0d5a6e] text-white font-semibold py-3 rounded-lg"
            >
              {createLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "CREATE"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Update Admin Modal */}
      <Dialog open={showUpdateModal} onOpenChange={setShowUpdateModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-bold">
                Update Admin Details
              </DialogTitle>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Update Admin Details</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="updateVendorname">Vendor Name</Label>
                <Input
                  id="updateVendorname"
                  value={formData.Vendorname}
                  onChange={(e) =>
                    setFormData({ ...formData, Vendorname: e.target.value })
                  }
                  disabled={updateLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="updateNumber">Phone Number</Label>
                <Input
                  id="updateNumber"
                  value={formData.Number}
                  onChange={(e) =>
                    setFormData({ ...formData, Number: e.target.value })
                  }
                  disabled={updateLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="updateEmail">Email</Label>
              <Input
                id="updateEmail"
                type="email"
                value={formData.Email}
                onChange={(e) =>
                  setFormData({ ...formData, Email: e.target.value })
                }
                disabled={updateLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="updatePassword">
                Change Password (leave empty to keep current)
              </Label>
              <Input
                id="updatePassword"
                type="password"
                placeholder="New Password"
                value={formData.Password}
                onChange={(e) =>
                  setFormData({ ...formData, Password: e.target.value })
                }
                disabled={updateLoading}
              />
            </div>

            <div className="space-y-3">
              <Label>Update Permissions</Label>
              <div className="grid grid-cols-2 gap-3">
                {availablePermissions.map((permission) => (
                  <div
                    key={permission.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`update-${permission.id}`}
                      checked={formData.Permission.includes(permission.id)}
                      onCheckedChange={(checked) =>
                        handlePermissionChange(permission.id, checked)
                      }
                      disabled={updateLoading}
                    />
                    <Label
                      htmlFor={`update-${permission.id}`}
                      className="text-sm font-normal"
                    >
                      {permission.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={handleUpdateAdmin}
              disabled={updateLoading}
              className="w-full bg-[#106C83] hover:bg-[#0d5a6e] text-white font-semibold py-3 rounded-lg"
            >
              {updateLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "UPDATE"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold">
                Confirm Delete
              </DialogTitle>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            <p className="text-gray-600">Are you sure you want to Delete?</p>

            <div className="flex gap-4">
              <Button
                onClick={handleDeleteAdmin}
                disabled={deleteLoading}
                className="flex-1 bg-[#106C83] hover:bg-[#0d5a6e] text-white font-semibold py-2 rounded-lg"
              >
                {deleteLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Yes"
                )}
              </Button>
              <Button
                onClick={() => setShowDeleteModal(false)}
                disabled={deleteLoading}
                className="flex-1 bg-red-500 hover:bg-red-500 text-white font-semibold py-2 rounded-lg"
              >
                No
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </ScrollArea>
  );
}

"use client";
import { Filter } from "lucide-react";
import { Button } from "@heroui/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import {
  fetchAllCategories,
  fetchAllMeasurement,
  fetchAllSubCategories,
} from "@/lib/Redux/Slices/masterSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Tag, Plus, Edit, Trash2,Upload, X  } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function Categoriestable() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    categoryName: "",
    subcategoryName: "",
    image: null,
  })
  const [imagePreview, setImagePreview] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const dispatch = useDispatch();
  const { subcategories, loading, error } = useSelector(
    (state) => state.master
  );

  useEffect(() => {
    dispatch(fetchAllSubCategories());
  }, [dispatch]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };


const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: null }))
    setImagePreview(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Here you would typically upload the image and create the category/subcategory
      // const formDataToSend = new FormData()
      // formDataToSend.append('categoryName', formData.categoryName)
      // formDataToSend.append('subcategoryName', formData.subcategoryName)
      // if (formData.image) {
      //   formDataToSend.append('image', formData.image)
      // }
      // const response = await fetch('/api/categories', {
      //   method: 'POST',
      //   body: formDataToSend
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Reset form and close dialog
      setFormData({ categoryName: "", subcategoryName: "", image: null })
      setImagePreview(null)
      setIsDialogOpen(false)

      // You would typically refetch the data here
      console.log("Category and subcategory created successfully!")
    } catch (error) {
      console.error("Error creating category:", error)
    } finally {
      setIsSubmitting(false)
    }
  }


const resetForm = () => {
    setFormData({ categoryName: "", subcategoryName: "", image: null })
    setImagePreview(null)
  }

  return (
    <div className="w-full space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Categories Management
              </CardTitle>
              <CardDescription>
                Manage and view all subcategories with their parent categories
              </CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2 bg-[#106C83] rounded-sm text-white cursor-pointer">
                  <Plus className="h-4 w-4" />
                  Add New
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create New Category & Subcategory</DialogTitle>
                  <DialogDescription>
                    Add a new category with its first subcategory. You can add more subcategories later.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    {/* Category Name */}
                    <div className="space-y-2">
                      <Label htmlFor="categoryName">Category Name</Label>
                      <Input
                        id="categoryName"
                        placeholder="Enter category name"
                        value={formData.categoryName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, categoryName: e.target.value }))}
                        required
                      />
                    </div>

                    {/* Subcategory Name */}
                    <div className="space-y-2">
                      <Label htmlFor="subcategoryName">Subcategory Name</Label>
                      <Input
                        id="subcategoryName"
                        placeholder="Enter subcategory name"
                        value={formData.subcategoryName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, subcategoryName: e.target.value }))}
                        required
                      />
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-2">
                      <Label>Category Image</Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                        {imagePreview ? (
                          <div className="relative">
                            <div className="relative h-32 w-full rounded-md overflow-hidden bg-muted">
                              <Image
                                src={imagePreview || "/placeholder.svg"}
                                alt="Preview"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                              onPress={removeImage}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ) : (
                          <div className="text-center">
                            <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                            <div className="mt-2">
                              <Label htmlFor="image-upload" className="cursor-pointer">
                                <span className="text-sm font-medium text-primary hover:text-primary/80">
                                  Click to upload
                                </span>
                                <span className="text-sm text-muted-foreground"> or drag and drop</span>
                              </Label>
                              <Input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                              />
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">PNG, JPG, GIF up to 10MB</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onPress={() => {
                        resetForm()
                        setIsDialogOpen(false)
                      }}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2 bg-[#106C83] rounded-sm text-white cursor-pointer">
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Creating...
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4 mr-2" />
                          Create
                        </>
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Subcategory</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Created
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Updated
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subcategories?.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No subcategories found
                    </TableCell>
                  </TableRow>
                ) : (
                  subcategories?.map((subcategory) => (
                    <TableRow key={subcategory._id}>
                      <TableCell>
                        <div className="relative h-12 w-12 rounded-md overflow-hidden bg-muted">
                          <Image
                            src={subcategory?.CategoryId?.Image}
                            alt={subcategory?.CategoryId?.Categoryname}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {subcategory?.CategoryId?.Categoryname}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            ID: {subcategory?.CategoryId?._id.slice(-8)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="font-medium">
                          {subcategory?.Subcategoryname}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <CalendarDays className="h-3 w-3" />
                          {formatDate(subcategory?.createdAt)}
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <CalendarDays className="h-3 w-3" />
                          {formatDate(subcategory?.updatedAt)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <button
                            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                            title="Edit subcategory"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                            title="Delete subcategory"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

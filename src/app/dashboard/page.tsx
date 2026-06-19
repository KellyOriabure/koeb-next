"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/RichTextEditor";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Package,
  Upload,
  Settings,
  Bell,
  LogOut,
  Edit,
  Trash2,
  Plus,
  Search,
  X,
  Tag,
  UserPlus,
  Users,
  Shield,
} from "lucide-react";
import { useUser, useClerk } from "@clerk/nextjs";

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: string;
  sku: string;
  stock: number;
  image_url: string;
}

interface Category {
  id: number;
  name: string;
}

interface AppUser {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  imageUrl: string;
  createdAt: number;
  lastSignInAt: number | null;
}

export default function DashboardPage() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
  });
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState("");

  // Profile state
  const [profileData, setProfileData] = useState({ firstName: "", lastName: "" });
  const [profileSubmitting, setProfileSubmitting] = useState(false);
  const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [passwordSubmitting, setPasswordSubmitting] = useState(false);

  // User management state
  const [appUsers, setAppUsers] = useState<AppUser[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [newUserData, setNewUserData] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [userSubmitting, setUserSubmitting] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
      });
    }
  }, [user]);

  const fetchUsers = async () => {
    setUsersLoading(true);
    try {
      const res = await fetch("/api/users/");
      const data = await res.json();
      setAppUsers(data);
    } catch {
      toast({ title: "Error", description: "Failed to fetch users.", variant: "destructive" });
    } finally {
      setUsersLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products/");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories/");
      const data = await res.json();
      if (!res.ok || !Array.isArray(data)) {
        console.warn("Categories fetch returned non-array:", data);
        setCategories([]);
        return;
      }
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      setCategories([]);
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    try {
      const res = await fetch("/api/categories/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategory.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to add category");
      }
      toast({ title: "Success", description: "Category added." });
      setNewCategory("");
      fetchCategories();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      const res = await fetch(`/api/categories/?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      toast({ title: "Deleted", description: "Category removed." });
      fetchCategories();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete category.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let imageUrl = "";
      if (imageFile) {
        const uploadData = new FormData();
        uploadData.append("file", imageFile);
        const uploadRes = await fetch("/api/upload/", {
          method: "POST",
          body: uploadData,
        });
        const uploadJson = await uploadRes.json();
        if (!uploadRes.ok) {
          throw new Error(uploadJson.error || "Upload failed");
        }
        imageUrl = uploadJson.url;
      }

      const res = await fetch("/api/products/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, image_url: imageUrl }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create product");
      }

      toast({
        title: "Success",
        description: "Product uploaded successfully.",
      });

      setFormData({
        title: "",
        category: "",
        description: "",
      });
      setIsAddProductOpen(false);
      setImageFile(null);
      setImagePreview(null);
      fetchProducts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`/api/products/?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      toast({
        title: "Deleted",
        description: "Product removed successfully.",
      });
      fetchProducts();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product.",
        variant: "destructive",
      });
    }
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      category: product.category || "",
      description: product.description || "",
    });
    setImageFile(null);
    setImagePreview(product.image_url || null);
    setIsEditProductOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setSubmitting(true);

    try {
      let imageUrl = editingProduct.image_url || "";
      if (imageFile) {
        const uploadData = new FormData();
        uploadData.append("file", imageFile);
        const uploadRes = await fetch("/api/upload/", {
          method: "POST",
          body: uploadData,
        });
        const uploadJson = await uploadRes.json();
        if (!uploadRes.ok) {
          throw new Error(uploadJson.error || "Upload failed");
        }
        imageUrl = uploadJson.url;
      }

      const res = await fetch("/api/products/", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingProduct.id,
          ...formData,
          image_url: imageUrl,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update product");
      }

      toast({
        title: "Success",
        description: "Product updated successfully.",
      });

      setFormData({
        title: "",
        category: "",
        description: "",
      });
      setIsEditProductOpen(false);
      setEditingProduct(null);
      setImageFile(null);
      setImagePreview(null);
      fetchProducts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSubmitting(true);
    try {
      await user?.update({ firstName: profileData.firstName, lastName: profileData.lastName });
      toast({ title: "Success", description: "Profile updated successfully." });
    } catch (error: any) {
      toast({ title: "Error", description: error?.errors?.[0]?.longMessage || "Failed to update profile.", variant: "destructive" });
    } finally {
      setProfileSubmitting(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({ title: "Error", description: "New passwords do not match.", variant: "destructive" });
      return;
    }
    setPasswordSubmitting(true);
    try {
      await user?.updatePassword({ currentPassword: passwordData.currentPassword, newPassword: passwordData.newPassword });
      toast({ title: "Success", description: "Password changed successfully." });
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error: any) {
      toast({ title: "Error", description: error?.errors?.[0]?.longMessage || "Failed to change password.", variant: "destructive" });
    } finally {
      setPasswordSubmitting(false);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setUserSubmitting(true);
    try {
      const res = await fetch("/api/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUserData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create user");
      toast({ title: "Success", description: "User created successfully." });
      setNewUserData({ firstName: "", lastName: "", email: "", password: "" });
      fetchUsers();
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Something went wrong.", variant: "destructive" });
    } finally {
      setUserSubmitting(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`/api/users/?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete user");
      toast({ title: "Deleted", description: "User removed successfully." });
      fetchUsers();
    } catch {
      toast({ title: "Error", description: "Failed to delete user.", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b border-border h-16 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
          <Avatar>
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback>{user?.firstName?.[0] || "A"}</AvatarFallback>
          </Avatar>
          <Button variant="ghost" size="icon" onClick={() => signOut({ redirectUrl: "/" })}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-sidebar border-r border-sidebar-border h-[calc(100vh-4rem)]">
          <nav className="p-4 space-y-2">
            <Button
              variant={activeTab === "products" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("products")}
            >
              <Package className="mr-2 h-4 w-4" />
              Product Management
            </Button>
            <Button
              variant={activeTab === "categories" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("categories")}
            >
              <Tag className="mr-2 h-4 w-4" />
              Categories
            </Button>
            <Button
              variant={activeTab === "profile" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("profile")}
            >
              <User className="mr-2 h-4 w-4" />
              User Profile
            </Button>
            <Button
              variant={activeTab === "users" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => { setActiveTab("users"); fetchUsers(); }}
            >
              <Users className="mr-2 h-4 w-4" />
              User Management
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {/* Product Management */}
            <TabsContent value="products" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground">Product Management</h2>
                  <p className="text-muted-foreground">Manage your product catalog</p>
                </div>
                <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Product
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="flex items-center">
                        <Upload className="mr-2 h-5 w-5" />
                        Upload New Product
                      </DialogTitle>
                      <DialogDescription>
                        Add a new product to your catalog
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Product Name</Label>
                        <Input
                          id="title"
                          name="title"
                          placeholder="Enter product name"
                          value={formData.title}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="category">
                            Category <span className="text-muted-foreground font-normal">(optional)</span>
                          </Label>
                          <Select
                            value={formData.category}
                            onValueChange={(value) =>
                              setFormData((prev) => ({ ...prev, category: value }))
                            }
                          >
                            <SelectTrigger id="category">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((cat) => (
                                <SelectItem key={cat.id} value={cat.name}>
                                  {cat.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="product-image">Product Image</Label>
                          <Input
                            id="product-image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                          {imagePreview && (
                            <div className="relative w-32 h-32 mt-2 rounded-lg overflow-hidden border border-border">
                              <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-full h-full object-cover"
                              />
                              <button
                                type="button"
                                onClick={clearImage}
                                className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 hover:bg-black/80"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <RichTextEditor
                          value={formData.description}
                          onChange={(html) =>
                            setFormData((prev) => ({ ...prev, description: html }))
                          }
                          placeholder="Enter detailed product description"
                        />
                      </div>

                      <Button type="submit" className="w-full" disabled={submitting}>
                        {submitting ? "Uploading..." : "Upload Product"}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>

                {/* Edit Product Dialog */}
                <Dialog open={isEditProductOpen} onOpenChange={setIsEditProductOpen}>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="flex items-center">
                        <Edit className="mr-2 h-5 w-5" />
                        Edit Product
                      </DialogTitle>
                      <DialogDescription>
                        Update product details
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleUpdate} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-title">Product Name</Label>
                        <Input
                          id="edit-title"
                          name="title"
                          placeholder="Enter product name"
                          value={formData.title}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="edit-category">
                            Category <span className="text-muted-foreground font-normal">(optional)</span>
                          </Label>
                          <Select
                            value={formData.category}
                            onValueChange={(value) =>
                              setFormData((prev) => ({ ...prev, category: value }))
                            }
                          >
                            <SelectTrigger id="edit-category">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((cat) => (
                                <SelectItem key={cat.id} value={cat.name}>
                                  {cat.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-product-image">Product Image</Label>
                          <Input
                            id="edit-product-image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                          {imagePreview && (
                            <div className="relative w-32 h-32 mt-2 rounded-lg overflow-hidden border border-border">
                              <img
                                src={imagePreview.startsWith("http") ? "/api/image/" + imagePreview.replace(/^https?:\/\/[^/]+\//, "") : imagePreview}
                                alt="Preview"
                                className="w-full h-full object-cover"
                              />
                              <button
                                type="button"
                                onClick={clearImage}
                                className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 hover:bg-black/80"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="edit-description">Description</Label>
                        <RichTextEditor
                          value={formData.description}
                          onChange={(html) =>
                            setFormData((prev) => ({ ...prev, description: html }))
                          }
                          placeholder="Enter detailed product description"
                        />
                      </div>

                      <Button type="submit" className="w-full" disabled={submitting}>
                        {submitting ? "Saving..." : "Save Changes"}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Products List */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Existing Products</CardTitle>
                    <div className="flex items-center gap-2">
                      <Search className="h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search products..." className="w-64" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {loading ? (
                      <p className="text-muted-foreground">Loading products...</p>
                    ) : products.length === 0 ? (
                      <p className="text-muted-foreground">No products found.</p>
                    ) : (
                      products.map((product) => (
                        <div key={product.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex items-center justify-center text-muted-foreground text-[10px]">
                              {product.image_url ? (
                                <img
                                  src={"/api/image/" + product.image_url.replace(/^https?:\/\/[^/]+\//, "")}
                                  alt={product.title}
                                  className="w-full h-full object-cover"
                                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                />
                              ) : (
                                <span>No Image</span>
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium">{product.title}</h4>
                              {product.sku && <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>}
                              {product.price && <p className="text-sm font-medium text-primary">${product.price}</p>}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => openEditModal(product)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(product.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Categories */}
            <TabsContent value="categories" className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-foreground">Categories</h2>
                <p className="text-muted-foreground">Manage product categories</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Add New Category</CardTitle>
                    <CardDescription>Create a new product category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddCategory} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-category">Category Name</Label>
                        <Input
                          id="new-category"
                          placeholder="e.g. Air Compressors"
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Category
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Existing Categories</CardTitle>
                    <CardDescription>All product categories</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {categories.length === 0 ? (
                        <p className="text-muted-foreground">No categories found.</p>
                      ) : (
                        categories.map((cat) => (
                          <div
                            key={cat.id}
                            className="flex items-center justify-between p-3 border border-border rounded-lg"
                          >
                            <span className="font-medium">{cat.name}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteCategory(cat.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* User Profile */}
            <TabsContent value="profile" className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-foreground">User Profile</h2>
                <p className="text-muted-foreground">Manage your account settings</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Profile Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-20 h-20">
                          <AvatarImage src={user?.imageUrl} />
                          <AvatarFallback className="text-lg">
                            {profileData.firstName?.[0]}{profileData.lastName?.[0]}
                          </AvatarFallback>
                        </Avatar>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="first-name">First Name</Label>
                          <Input
                            id="first-name"
                            value={profileData.firstName}
                            onChange={(e) => setProfileData((p) => ({ ...p, firstName: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name">Last Name</Label>
                          <Input
                            id="last-name"
                            value={profileData.lastName}
                            onChange={(e) => setProfileData((p) => ({ ...p, lastName: e.target.value }))}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={user?.primaryEmailAddress?.emailAddress || ""} readOnly className="bg-muted" />
                      </div>

                      <Button type="submit" className="w-full" disabled={profileSubmitting}>
                        {profileSubmitting ? "Saving..." : "Update Profile"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Account Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Security and preferences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleChangePassword} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input
                          id="current-password"
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData((p) => ({ ...p, currentPassword: e.target.value }))}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input
                          id="new-password"
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData((p) => ({ ...p, newPassword: e.target.value }))}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData((p) => ({ ...p, confirmPassword: e.target.value }))}
                          required
                        />
                      </div>

                      <Button type="submit" variant="outline" className="w-full" disabled={passwordSubmitting}>
                        {passwordSubmitting ? "Changing..." : "Change Password"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* User Management */}
            <TabsContent value="users" className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-foreground">User Management</h2>
                <p className="text-muted-foreground">Add and manage dashboard users</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Add User */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UserPlus className="h-5 w-5" />
                      Add New User
                    </CardTitle>
                    <CardDescription>Create a new account</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddUser} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="new-user-first-name">First Name</Label>
                          <Input
                            id="new-user-first-name"
                            placeholder="John"
                            value={newUserData.firstName}
                            onChange={(e) => setNewUserData((p) => ({ ...p, firstName: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-user-last-name">Last Name</Label>
                          <Input
                            id="new-user-last-name"
                            placeholder="Doe"
                            value={newUserData.lastName}
                            onChange={(e) => setNewUserData((p) => ({ ...p, lastName: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-user-email">Email</Label>
                        <Input
                          id="new-user-email"
                          type="email"
                          placeholder="john@example.com"
                          value={newUserData.email}
                          onChange={(e) => setNewUserData((p) => ({ ...p, email: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-user-password">Password</Label>
                        <Input
                          id="new-user-password"
                          type="password"
                          placeholder="Min. 8 characters"
                          value={newUserData.password}
                          onChange={(e) => setNewUserData((p) => ({ ...p, password: e.target.value }))}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full" disabled={userSubmitting}>
                        <UserPlus className="mr-2 h-4 w-4" />
                        {userSubmitting ? "Creating..." : "Create User"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* User List */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Existing Users
                    </CardTitle>
                    <CardDescription>All registered accounts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {usersLoading ? (
                        <p className="text-muted-foreground text-sm">Loading users...</p>
                      ) : appUsers.length === 0 ? (
                        <p className="text-muted-foreground text-sm">No users found.</p>
                      ) : (
                        appUsers.map((u) => (
                          <div key={u.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-9 h-9">
                                <AvatarImage src={u.imageUrl} />
                                <AvatarFallback className="text-xs">
                                  {u.firstName?.[0]}{u.lastName?.[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-sm">{u.firstName} {u.lastName}</p>
                                <p className="text-xs text-muted-foreground">{u.email}</p>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteUser(u.id)}
                              disabled={u.id === user?.id}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}

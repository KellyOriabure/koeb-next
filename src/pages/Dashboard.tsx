import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Search
} from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("products");

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
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Button variant="ghost" size="icon">
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
              variant={activeTab === "profile" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("profile")}
            >
              <User className="mr-2 h-4 w-4" />
              User Profile
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
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Product
                </Button>
              </div>

              {/* Product Upload Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Upload className="mr-2 h-5 w-5" />
                    Upload New Product
                  </CardTitle>
                  <CardDescription>
                    Add a new product to your catalog
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="product-name">Product Name</Label>
                      <Input id="product-name" placeholder="Enter product name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="product-category">Category</Label>
                      <Input id="product-category" placeholder="Air Compressors" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="product-description">Description</Label>
                    <Textarea 
                      id="product-description" 
                      placeholder="Enter detailed product description"
                      className="min-h-24"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="product-price">Price</Label>
                      <Input id="product-price" placeholder="0.00" type="number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="product-sku">SKU</Label>
                      <Input id="product-sku" placeholder="SKU-001" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="product-stock">Stock</Label>
                      <Input id="product-stock" placeholder="0" type="number" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="product-image">Product Image</Label>
                    <Input id="product-image" type="file" accept="image/*" />
                  </div>

                  <Button className="w-full">Upload Product</Button>
                </CardContent>
              </Card>

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
                    {/* Sample product items */}
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-muted rounded-lg"></div>
                          <div>
                            <h4 className="font-medium">Industrial Air Compressor {item}</h4>
                            <p className="text-sm text-muted-foreground">SKU: AC-00{item}</p>
                            <p className="text-sm font-medium text-primary">$2,999.99</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
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
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="text-lg">JD</AvatarFallback>
                      </Avatar>
                      <Button variant="outline">Change Photo</Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" placeholder="Doe" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john.doe@example.com" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
                    </div>

                    <Button className="w-full">Update Profile</Button>
                  </CardContent>
                </Card>

                {/* Account Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Security and preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>

                    <Button variant="outline" className="w-full">
                      Change Password
                    </Button>

                    <div className="pt-4 border-t border-border">
                      <h4 className="font-medium mb-3">Preferences</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Email Notifications</span>
                          <Button variant="outline" size="sm">Enable</Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Two-Factor Authentication</span>
                          <Button variant="outline" size="sm">Setup</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Activity Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Account Activity</CardTitle>
                  <CardDescription>Recent activity and statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">12</div>
                      <div className="text-sm text-muted-foreground">Products Listed</div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">45</div>
                      <div className="text-sm text-muted-foreground">Quote Requests</div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">8</div>
                      <div className="text-sm text-muted-foreground">Active Orders</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Store, Package, History, LogOut, Search, ShoppingCart, Leaf } from "lucide-react";
import { Input } from "@/components/ui/input";

const FAKE_PRODUCTS = [
  {
    id: 1,
    name: "Boro Rice",
    desc: "High-yielding, water-tolerant rice variety perfect for NE India.",
    img: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=400&q=80",
    price: 32,
    unit: "per kg",
    farmer: "Rajesh Kumar"
  },
  {
    id: 2,
    name: "Organic Black Tea",
    desc: "Premium Assam organic black tea. Rich and aromatic.",
    img: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=400&q=80",
    price: 160,
    unit: "per kg",
    farmer: "Anand Singh"
  },
  {
    id: 3,
    name: "Oranges",
    desc: "Juicy, sweet local oranges grown in fertile valleys.",
    img: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=400&q=80",
    price: 50,
    unit: "per dozen",
    farmer: "Lakshmi Devi"
  },
  {
    id: 4,
    name: "Ginger",
    desc: "Fresh ginger with strong aroma and flavor, ideal for cooking.",
    img: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=400&q=80",
    price: 80,
    unit: "per kg",
    farmer: "Rajesh Kumar"
  },
];

const BuyerDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-earth-50 to-earth-100">
      {/* Header */}
      <header className="bg-earth-600 text-white py-4 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Store className="h-6 w-6 mr-2" />
              <h1 className="text-xl font-bold">AgriBridge NE</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden md:inline-block text-sm text-earth-100">Welcome, Buyer</span>
              <Link to="/login">
                <Button size="sm" variant="outline" className="text-white border-earth-500 hover:bg-earth-700">
                  <LogOut className="h-4 w-4 mr-1" /> Logout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-2">
            <Link to="#" className="px-4 py-2 text-earth-600 font-medium flex items-center whitespace-nowrap">
              <Package className="h-4 w-4 mr-2" /> Marketplace
            </Link>
            <Link to="#" className="px-4 py-2 text-gray-600 hover:text-earth-600 flex items-center whitespace-nowrap">
              <History className="h-4 w-4 mr-2" /> Order History
            </Link>
            <Link to="#" className="px-4 py-2 text-gray-600 hover:text-earth-600 flex items-center whitespace-nowrap">
              <ShoppingCart className="h-4 w-4 mr-2" /> My Cart (0)
            </Link>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6 text-earth-800">Marketplace</h1>
        
        {/* Search Bar */}
        <div className="relative flex w-full max-w-lg mb-8">
          <Input 
            type="text" 
            placeholder="Search products, farmers..." 
            className="pr-12 border-earth-300 focus:border-earth-500 focus:ring-earth-500"
          />
          <Button className="absolute right-0 top-0 bottom-0 px-3 bg-earth-500 hover:bg-earth-600">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="border-earth-200">
            <CardHeader className="bg-earth-500 text-white py-3 px-4">
              <CardTitle className="text-md flex items-center">
                <Leaf className="h-4 w-4 mr-2" />
                Available Products
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Products Available</span>
                  <span className="text-xl font-semibold text-earth-600">134</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Farmers on Platform</span>
                  <span className="text-xl font-semibold text-earth-600">48</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Regions Covered</span>
                  <span className="text-xl font-semibold text-earth-600">8</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-earth-200">
            <CardHeader className="bg-earth-500 text-white py-3 px-4">
              <CardTitle className="text-md flex items-center">
                <History className="h-4 w-4 mr-2" />
                Order History
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2">
                <p className="text-gray-600">Your recent orders will be displayed here</p>
                <Button variant="outline" className="w-full border-earth-300 text-earth-600 hover:bg-earth-50">
                  View All Orders
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Featured Products Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-earth-800">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FAKE_PRODUCTS.map((prod) => (
              <Card key={prod.id} className="overflow-hidden border-earth-200 hover:border-earth-300 hover:shadow-md transition-all">
                <div className="relative h-48">
                  <img
                    src={prod.img}
                    alt={prod.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 right-0 bg-earth-500 text-white px-2 py-1 text-xs font-medium">
                    {prod.farmer}
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-earth-700">{prod.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm">{prod.desc}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-earth-700 font-bold">
                      ₹{prod.price}{" "}
                      <span className="text-sm font-medium text-gray-500">
                        {prod.unit}
                      </span>
                    </span>
                    <Button size="sm" className="bg-earth-500 hover:bg-earth-600">
                      <ShoppingCart className="h-4 w-4 mr-2" /> Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Button className="bg-earth-500 hover:bg-earth-600">
              View All Products
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;

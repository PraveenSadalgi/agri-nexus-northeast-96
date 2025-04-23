
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Store, Package, History, LogOut, Search, ShoppingCart, Leaf, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<{ id: number, name: string, price: number, quantity: number }[]>([]);
  const [showCart, setShowCart] = useState(false);
  
  // Search functionality
  const filteredProducts = searchQuery 
    ? FAKE_PRODUCTS.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.farmer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.desc.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : FAKE_PRODUCTS;
  
  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Add to cart functionality
  const addToCart = (product: typeof FAKE_PRODUCTS[0]) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        // Increase quantity if item already in cart
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // Add new item to cart
        return [...prevCart, { 
          id: product.id, 
          name: product.name, 
          price: product.price,
          quantity: 1
        }];
      }
    });
    
    toast.success(`${product.name} added to cart`);
  };
  
  // Remove from cart
  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };
  
  // Update quantity
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

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
              <Button 
                size="sm" 
                variant="outline" 
                className="relative text-white border-earth-500 hover:bg-earth-700"
                onClick={() => setShowCart(!showCart)}
              >
                <ShoppingCart className="h-4 w-4 mr-1" /> Cart
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Button>
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
            <div className="px-4 py-2 text-gray-600 hover:text-earth-600 flex items-center whitespace-nowrap cursor-pointer" onClick={() => setShowCart(true)}>
              <ShoppingCart className="h-4 w-4 mr-2" /> My Cart ({cart.length})
            </div>
          </div>
        </div>
      </nav>
      
      {/* Shopping Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-end">
          <div className="bg-white w-full max-w-md h-full overflow-auto p-4 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Shopping Cart</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowCart(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            {cart.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Your cart is empty
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between border-b pb-2">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <div className="flex items-center mt-1">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-7 w-7 p-0"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >-</Button>
                          <span className="mx-2">{item.quantity}</span>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-7 w-7 p-0"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >+</Button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{item.price * item.quantity}</p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500 p-0 h-6"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold text-lg mb-4">
                    <span>Total:</span>
                    <span>₹{cartTotal}</span>
                  </div>
                  <Button className="w-full bg-earth-600 hover:bg-earth-700">
                    Proceed to Checkout
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6 text-earth-800">Marketplace</h1>
        
        {/* Search Bar */}
        <div className="relative flex w-full max-w-lg mb-8">
          <Input 
            type="text" 
            placeholder="Search products, farmers..." 
            className="pr-12 border-earth-300 focus:border-earth-500 focus:ring-earth-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
                <ShoppingCart className="h-4 w-4 mr-2" />
                Your Cart
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Items in Cart</span>
                  <span className="text-xl font-semibold text-earth-600">{cart.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Amount</span>
                  <span className="text-xl font-semibold text-earth-600">₹{cartTotal}</span>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full border-earth-300 text-earth-600 hover:bg-earth-50 mt-2"
                  onClick={() => setShowCart(true)}
                  disabled={cart.length === 0}
                >
                  View Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Featured Products Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-earth-800">
            {searchQuery ? `Search Results: ${filteredProducts.length} found` : "Featured Products"}
          </h2>
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-lg shadow-sm border border-gray-200">
              <p className="text-lg text-gray-600">No products found matching "{searchQuery}"</p>
              <Button variant="outline" onClick={() => setSearchQuery("")} className="mt-4">
                Clear Search
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((prod) => (
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
                      <Button 
                        size="sm" 
                        className="bg-earth-500 hover:bg-earth-600"
                        onClick={() => addToCart(prod)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" /> Add
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {!searchQuery && (
            <div className="mt-8 text-center">
              <Button className="bg-earth-500 hover:bg-earth-600">
                View All Products
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;

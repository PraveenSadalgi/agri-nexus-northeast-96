
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ShoppingCart, Search, Package, CircleCheck } from "lucide-react";

interface Product {
  id: number;
  name: string;
  desc: string;
  img: string;
  price: number;
  unit: string;
  isOrganic?: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

const FAKE_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Apple",
    desc: "High-yielding, water-tolerant apple variety perfect for NE India.",
    img: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=400&q=80",
    price: 32,
    unit: "per kg",
    isOrganic: true,
  },
  {
    id: 2,
    name: "Organic Black Tea",
    desc: "Premium Assam organic black tea. Rich and aromatic.",
    img: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=400&q=80",
    price: 160,
    unit: "per kg",
    isOrganic: true,
  },
  {
    id: 3,
    name: "Oranges",
    desc: "Juicy, sweet local oranges grown in fertile valleys.",
    img: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=400&q=80",
    price: 50,
    unit: "per dozen",
  },
  {
    id: 4,
    name: "Ginger",
    desc: "Fresh ginger with strong aroma and flavor, ideal for cooking.",
    img: "data:image/jpeg;base64,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",
    price: 80,
    unit: "per kg",
    isOrganic: true,
  },
];

const BuyerDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(FAKE_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    // Filter products based on search query
    if (searchQuery.trim() === "") {
      setFilteredProducts(FAKE_PRODUCTS);
    } else {
      const filtered = FAKE_PRODUCTS.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.desc.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery]);

  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      // Check if product is already in cart
      const existingItem = prevCart.find((item) => item.id === product.id);
      
      if (existingItem) {
        // Increase quantity if already in cart
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Add new item to cart
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    
    toast(`Added ${product.name} to cart!`, {
      description: "Check your cart to complete purchase",
    });
  };

  const handleRemoveFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(productId);
      return;
    }
    
    setCart((prevCart) => 
      prevCart.map((item) => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-amber-50 py-6">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-green-700 to-emerald-600 text-white p-6 rounded-lg shadow-lg mb-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Farmer's Market</h1>
              <p className="text-green-100">
                Fresh, local produce direct from farmers to your table
              </p>
            </div>
            
            <div className="flex items-center mt-4 md:mt-0 space-x-2">
              <button 
                className="bg-green-100 hover:bg-green-200 text-green-900 py-2 px-4 rounded-full flex items-center relative transition-all"
                onClick={() => setCartOpen(!cartOpen)}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                <span>Cart ({cart.length})</span>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Cart Dropdown */}
        {cartOpen && (
          <div className="mb-6 bg-white rounded-lg shadow-lg p-4 border border-green-100">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-green-100">
              <h2 className="text-xl font-bold text-green-800 flex items-center">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Your Cart
              </h2>
              <Button 
                variant="ghost" 
                onClick={() => setCartOpen(false)}
                className="text-sm"
              >
                Close
              </Button>
            </div>
            
            {cart.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center">
                        <img 
                          src={item.img} 
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded mr-3" 
                        />
                        <div>
                          <h3 className="font-medium">
                            {item.name} {item.isOrganic && (
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full ml-1">
                                Organic
                              </span>
                            )}
                          </h3>
                          <div className="text-gray-600 text-sm">
                            ₹{item.price} {item.unit}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center border rounded-md">
                          <button 
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="px-2 py-1">{item.quantity}</span>
                          <button 
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-green-100">
                  <div className="flex justify-between font-bold text-lg mb-4">
                    <span>Total Amount:</span>
                    <span className="text-green-700">₹{totalAmount}</span>
                  </div>
                  
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Proceed to Checkout
                  </Button>
                </div>
              </>
            )}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white border-green-100 shadow hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Available Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center justify-between">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    className="pl-10"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="ml-4 flex items-center bg-green-50 px-3 py-2 rounded-lg">
                  <Package className="text-green-600 mr-2" size={18} />
                  <span className="font-medium text-green-800">{filteredProducts.length} Products</span>
                </div>
              </div>
              
              {filteredProducts.length === 0 ? (
                <div className="text-center py-8 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="text-amber-800">No products found matching "{searchQuery}"</p>
                  <Button 
                    variant="link" 
                    onClick={() => setSearchQuery("")}
                    className="text-green-600 mt-2"
                  >
                    Clear search
                  </Button>
                </div>
              ) : (
                <p className="text-gray-600">Browse available crops and products below</p>
              )}
            </CardContent>
          </Card>
          <Card className="bg-white border-green-100 shadow hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Your order history will be displayed here</p>
              {cart.length > 0 && (
                <div className="mt-4 p-3 bg-green-50 rounded-md border border-green-100">
                  <p className="text-green-800 font-medium flex items-center">
                    <CircleCheck className="mr-2 h-4 w-4 text-green-600" /> 
                    You have {cart.length} items in your cart
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Featured Products Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-green-800">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredProducts.map((prod) => (
              <Card key={prod.id} className={`overflow-hidden ${
                prod.isOrganic 
                  ? 'border-2 border-green-200 bg-gradient-to-b from-white to-green-50' 
                  : 'bg-white'
              }`}>
                <div className="relative">
                  <img
                    src={prod.img}
                    alt={prod.name}
                    className="w-full h-36 object-cover"
                  />
                  {prod.isOrganic && (
                    <div className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                      Organic
                    </div>
                  )}
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{prod.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{prod.desc}</p>
                  <div className="flex justify-between items-center">
                    <span className={`text-lg font-bold ${prod.isOrganic ? 'text-green-700' : 'text-amber-700'}`}>
                      ₹{prod.price}{" "}
                      <span className="text-sm font-medium text-gray-600">
                        {prod.unit}
                      </span>
                    </span>
                    <Button 
                      onClick={() => handleAddToCart(prod)} 
                      size="sm"
                      className={`${
                        prod.isOrganic 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : 'bg-amber-600 hover:bg-amber-700'
                      }`}
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" /> Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;

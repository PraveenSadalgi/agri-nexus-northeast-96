
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
    name: "Boro Rice",
    desc: "High-yielding, water-tolerant rice variety perfect for NE India.",
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
    img: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=400&q=80",
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

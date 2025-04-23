
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FAKE_PRODUCTS = [
  {
    id: 1,
    name: "Boro Rice",
    desc: "High-yielding, water-tolerant rice variety perfect for NE India.",
    img: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=400&q=80",
    price: 32,
    unit: "per kg",
  },
  {
    id: 2,
    name: "Organic Black Tea",
    desc: "Premium Assam organic black tea. Rich and aromatic.",
    img: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=400&q=80",
    price: 160,
    unit: "per kg",
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
  },
];

const BuyerDashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Buyer Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Available Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Browse available crops and products here</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Order History</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Your order history will be displayed here</p>
          </CardContent>
        </Card>
      </div>
      {/* Featured Products Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FAKE_PRODUCTS.map((prod) => (
            <Card key={prod.id} className="overflow-hidden">
              <img
                src={prod.img}
                alt={prod.name}
                className="w-full h-36 object-cover"
              />
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{prod.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-2">{prod.desc}</p>
                <span className="text-green-700 font-bold">
                  ₹{prod.price}{" "}
                  <span className="text-sm font-medium text-gray-600">
                    {prod.unit}
                  </span>
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;

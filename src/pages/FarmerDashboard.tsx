
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NewsFeed from "@/components/farming/NewsFeed";

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

const FarmerDashboard = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar side="right" variant="floating">
          <SidebarHeader className="h-14 flex items-center px-4">
            <h2 className="text-lg font-semibold">Updates</h2>
          </SidebarHeader>
          <SidebarContent>
            <NewsFeed />
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 p-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Farmer Dashboard</h1>
            <SidebarTrigger />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <Card>
              <CardHeader>
                <CardTitle>Assigned Crops</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Your assigned crops will appear here</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Weather Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Local weather information will be displayed here</p>
              </CardContent>
            </Card>
          </div>
          {/* Products Section */}
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
                      ₹{prod.price} <span className="text-sm font-medium text-gray-600">{prod.unit}</span>
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default FarmerDashboard;

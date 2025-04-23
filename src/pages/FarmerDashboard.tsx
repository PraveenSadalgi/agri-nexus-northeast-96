import { useEffect, useState } from "react";
import WeatherForecast from "@/components/farming/WeatherForecast";
import FarmerImageUpload from "@/components/farming/FarmerImageUpload";
import FarmerQueryTicket from "@/components/farming/FarmerQueryTicket";
import NewsFeed from "@/components/farming/NewsFeed";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LogOut, 
  Home, 
  TrendingUp, 
  Leaf 
} from "lucide-react";
import { CropAllocation } from "@/types/admin";

const FarmerDashboard = () => {
  const [userName, setUserName] = useState("Farmer");
  const [farmerId, setFarmerId] = useState<string | null>(null);
  const [myCrops, setMyCrops] = useState<CropAllocation[]>([]);

  useEffect(() => {
    const storedName = window.localStorage.getItem("currentFarmerName");
    const storedId = window.localStorage.getItem("currentFarmerId");
    
    if (storedName) {
      setUserName(storedName);
    }
    
    if (storedId) {
      setFarmerId(storedId);
      
      const farmerData = window.localStorage.getItem(storedId);
      if (farmerData) {
        try {
          const farmer = JSON.parse(farmerData);
          if (farmer.allocatedCrops && Array.isArray(farmer.allocatedCrops)) {
            setMyCrops(farmer.allocatedCrops);
          }
        } catch (e) {
          console.error("Error parsing farmer data", e);
        }
      }
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      if (farmerId) {
        const farmerData = window.localStorage.getItem(farmerId);
        if (farmerData) {
          try {
            const farmer = JSON.parse(farmerData);
            if (farmer.allocatedCrops && Array.isArray(farmer.allocatedCrops)) {
              setMyCrops(farmer.allocatedCrops);
            }
          } catch (e) {
            console.error("Error parsing farmer data", e);
          }
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    document.addEventListener('allocatedCropsUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('allocatedCropsUpdated', handleStorageChange);
    };
  }, [farmerId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-agri-50 to-agri-100">
      <header className="bg-agri-700 text-white py-4 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Leaf className="h-6 w-6 mr-2" />
              <h1 className="text-xl font-bold">AgriBridge NE</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden md:inline-block text-sm text-agri-100">Welcome, {userName}</span>
              <Link to="/login">
                <Button size="sm" variant="outline" className="text-white border-agri-500 hover:bg-agri-600">
                  <LogOut className="h-4 w-4 mr-1" /> Logout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-2">
            <Link to="#" className="px-4 py-2 text-agri-600 font-medium flex items-center whitespace-nowrap">
              <Home className="h-4 w-4 mr-2" /> Dashboard
            </Link>
            <Link to="#" className="px-4 py-2 text-gray-600 hover:text-agri-600 flex items-center whitespace-nowrap">
              <Leaf className="h-4 w-4 mr-2" /> My Crops
            </Link>
            <Link to="#" className="px-4 py-2 text-gray-600 hover:text-agri-600 flex items-center whitespace-nowrap">
              <TrendingUp className="h-4 w-4 mr-2" /> Market Prices
            </Link>
          </div>
        </div>
      </nav>
      
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6 text-agri-800">Farmer Dashboard</h1>
        
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2">
            <WeatherForecast />
          </div>
          <div>
            <Card className="h-full border-agri-200">
              <CardHeader className="bg-earth-500 text-white py-3 px-4">
                <CardTitle className="text-md flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Market Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Rice</span>
                    <span className="text-green-600 font-semibold">₹2,500/quintal</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Wheat</span>
                    <span className="text-green-600 font-semibold">₹1,900/quintal</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Tea</span>
                    <span className="text-red-600 font-semibold">₹145/kg ↓</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Ginger</span>
                    <span className="text-green-600 font-semibold">₹80/kg ↑</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-agri-200">
              <CardHeader className="bg-agri-600 text-white py-3 px-4">
                <CardTitle className="text-md flex items-center">
                  <Leaf className="h-4 w-4 mr-2" />
                  My Crops
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {myCrops.length === 0 ? (
                  <div className="text-center p-8 text-gray-500">
                    <p className="mb-2 font-medium">No crops allocated yet</p>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex justify-between">
                        <h3 className="font-semibold text-agri-800">Crop</h3>
                        <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                          Not Allocated
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        <div className="flex flex-wrap gap-x-6 gap-y-1">
                          <div>
                            <span className="font-medium text-gray-700">Status:</span> Waiting for allocation
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Destination:</span> Not allocated
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {myCrops.map(crop => (
                      <div key={crop.cropId} className="bg-white p-4 rounded-lg border border-gray-200 hover:border-agri-300 transition-colors">
                        <div className="flex justify-between">
                          <h3 className="font-semibold text-agri-800">{crop.cropName}</h3>
                          <span className="inline-block px-2 py-1 bg-agri-100 text-agri-700 rounded-full text-xs font-medium">
                            Allocated
                          </span>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                          <div className="flex flex-wrap gap-x-6 gap-y-1">
                            <div>
                              <span className="font-medium text-gray-700">ID:</span> {crop.cropId}
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Price:</span> ₹{crop.price}
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Harvest Location:</span> {crop.harvestLocation}
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Destination:</span> {crop.transportDestination}
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 flex justify-end">
                          <Button size="sm" variant="outline" className="text-agri-600 border-agri-300">
                            Request Transport
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <FarmerImageUpload />
              <FarmerQueryTicket />
            </div>
          </div>
          
          <div>
            <NewsFeed />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;

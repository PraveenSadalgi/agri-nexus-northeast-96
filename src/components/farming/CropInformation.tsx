
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Tractor, MapPin, Truck, IndianRupee } from "lucide-react";
import { useEffect, useState } from "react";

interface Crop {
  cropId: string;
  cropName: string;
  harvestLocation: string;
  transportDestination: string;
  price: number;
}

const CropInformation = () => {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [loading, setLoading] = useState(true);
  const [farmerId, setFarmerId] = useState<string | null>(null);

  useEffect(() => {
    // Simulate getting the current farmer ID
    const storageItems = Object.keys(localStorage);
    const currentFarmerId = storageItems.find(key => key.startsWith('F') && !key.includes('queries'));
    setFarmerId(currentFarmerId || null);

    // If we have a farmer ID, fetch their crops
    if (currentFarmerId) {
      try {
        const farmerData = localStorage.getItem(currentFarmerId);
        if (farmerData) {
          const farmer = JSON.parse(farmerData);
          if (farmer.allocatedCrops && Array.isArray(farmer.allocatedCrops)) {
            setCrops(farmer.allocatedCrops);
          }
        }
      } catch (error) {
        console.error("Error loading farmer crops:", error);
      }
    }
    
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
        <CardContent className="py-6">
          <div className="flex justify-center">
            <span className="animate-pulse text-emerald-600">Loading crop information...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!farmerId) {
    return (
      <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-100">
        <CardContent className="py-6">
          <div className="text-center text-amber-700">
            <p>It seems you're not logged in as a farmer. Please log in to view your allocated crops.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (crops.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-100">
        <CardHeader>
          <CardTitle className="flex items-center text-amber-800">
            <Leaf className="mr-2 h-5 w-5" />
            Crop Allocation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center p-6 border border-dashed border-amber-200 rounded-lg bg-amber-50">
            <Tractor className="h-12 w-12 mx-auto text-amber-400 mb-3" />
            <h3 className="text-lg font-medium text-amber-700">No Crops Allocated Yet</h3>
            <p className="text-amber-600 mt-2">
              The admin hasn't allocated any crops to you yet. Please check back later or raise a query if you believe this is an error.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
      <CardHeader>
        <CardTitle className="flex items-center text-emerald-800">
          <Leaf className="mr-2 h-5 w-5" />
          Your Allocated Crops
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {crops.map((crop) => (
          <div 
            key={crop.cropId} 
            className="p-4 rounded-lg border border-emerald-200 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-medium text-emerald-700 flex items-center">
              <Leaf className="mr-2 h-5 w-5 text-emerald-500" />
              {crop.cropName}
            </h3>
            <div className="mt-3 space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="mr-2 h-4 w-4 text-emerald-500" />
                Harvest Location: <span className="font-medium ml-1">{crop.harvestLocation}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Truck className="mr-2 h-4 w-4 text-emerald-500" />
                Transport Destination: <span className="font-medium ml-1">{crop.transportDestination}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <IndianRupee className="mr-2 h-4 w-4 text-emerald-500" />
                Price: <span className="font-medium ml-1">₹{crop.price}/kg</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CropInformation;

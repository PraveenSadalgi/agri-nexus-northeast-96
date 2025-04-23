
import WeatherForecast from "@/components/farming/WeatherForecast";
import FarmerImageUpload from "@/components/farming/FarmerImageUpload";
import FarmerQueryTicket from "@/components/farming/FarmerQueryTicket";
import CropInformation from "@/components/farming/CropInformation";
import NewsFeed from "@/components/farming/NewsFeed";
import { Tractor, Leaf, CloudSun, MessageSquare, Camera, Newspaper } from "lucide-react";

const FarmerDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-emerald-50 py-6">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-green-800 to-green-700 text-white p-6 rounded-lg shadow-lg mb-6">
          <div className="flex items-center mb-4">
            <Tractor className="h-8 w-8 mr-3" />
            <h1 className="text-3xl font-bold">Farmer Dashboard</h1>
          </div>
          <p className="text-green-100">Manage your crops, check weather forecasts, and communicate with administrators</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2">
            <div className="flex items-center mb-3">
              <CloudSun className="h-5 w-5 mr-2 text-amber-600" />
              <h2 className="text-xl font-semibold text-green-800">Weather Forecast</h2>
            </div>
            <WeatherForecast />
          </div>
          <div className="md:col-span-1">
            <div className="flex items-center mb-3">
              <Newspaper className="h-5 w-5 mr-2 text-emerald-600" />
              <h2 className="text-xl font-semibold text-green-800">News Feed</h2>
            </div>
            <NewsFeed />
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center mb-3">
            <Leaf className="h-5 w-5 mr-2 text-emerald-600" />
            <h2 className="text-xl font-semibold text-green-800">Your Crops</h2>
          </div>
          <CropInformation />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <div className="flex items-center mb-3">
              <Camera className="h-5 w-5 mr-2 text-blue-600" />
              <h2 className="text-xl font-semibold text-green-800">Upload Crop Images</h2>
            </div>
            <FarmerImageUpload />
          </div>
          <div>
            <div className="flex items-center mb-3">
              <MessageSquare className="h-5 w-5 mr-2 text-amber-600" />
              <h2 className="text-xl font-semibold text-green-800">Support & Queries</h2>
            </div>
            <FarmerQueryTicket />
          </div>
        </div>
        
        {/* Simulated Admin Query View - for demo purposes */}
        <div className="mt-6 bg-gradient-to-br from-white to-green-50 p-6 rounded-lg shadow border border-green-100">
          <h2 className="text-xl font-semibold mb-4 text-green-800 flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-emerald-600" />
            Your Raised Queries (Admin View)
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 max-h-[200px] overflow-y-auto">
            {(JSON.parse(window.localStorage.getItem("farmer_queries_demo") || "[]") as string[]).reverse().map((q, idx) => (
              <li key={idx} className="py-1 border-b border-green-100 last:border-b-0">{q}</li>
            ))}
          </ul>
          {(JSON.parse(window.localStorage.getItem("farmer_queries_demo") || "[]") as string[]).length === 0 && (
            <p className="text-gray-500 italic">No queries raised yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;

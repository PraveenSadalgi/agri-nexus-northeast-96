
import WeatherForecast from "@/components/farming/WeatherForecast";
import FarmerImageUpload from "@/components/farming/FarmerImageUpload";
import FarmerQueryTicket from "@/components/farming/FarmerQueryTicket";

const FarmerDashboard = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-4">Farmer Dashboard</h1>
      <WeatherForecast />
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div>
          <FarmerImageUpload />
        </div>
        <div>
          <FarmerQueryTicket />
        </div>
      </div>
      {/* Simulated Admin Query View - for demo purposes */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-2">Your Raised Queries (Admin View)</h2>
        <ul className="list-disc pl-6 text-gray-800">
          {(JSON.parse(window.localStorage.getItem("farmer_queries_demo") || "[]") as string[]).reverse().map((q, idx) => (
            <li key={idx}>{q}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FarmerDashboard;

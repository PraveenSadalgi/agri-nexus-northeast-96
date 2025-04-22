
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FarmerDashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Farmer Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-6">
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
    </div>
  );
};

export default FarmerDashboard;

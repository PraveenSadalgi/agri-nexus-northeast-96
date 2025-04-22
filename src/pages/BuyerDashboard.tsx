
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BuyerDashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Buyer Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-6">
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
    </div>
  );
};

export default BuyerDashboard;

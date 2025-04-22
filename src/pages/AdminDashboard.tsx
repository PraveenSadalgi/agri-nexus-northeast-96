
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminDashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Farmer Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Manage farmers and crop assignments here</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>System Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">System statistics and overview will be shown here</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;

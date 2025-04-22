
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Users, Map, MapPin, Truck } from "lucide-react";

// Temporary mock data - replace with real data from backend
const mockFarmers = [
  {
    id: "F001",
    name: "Rajesh Kumar",
    territory: "Assam-North",
    allocatedCrops: [
      {
        cropId: "C001",
        cropName: "Tea",
        harvestLocation: "Dibrugarh",
        transportDestination: "Guwahati",
        price: 150
      }
    ]
  },
  {
    id: "F002",
    name: "Mira Devi",
    territory: "Assam-South",
    allocatedCrops: [
      {
        cropId: "C002",
        cropName: "Rice",
        harvestLocation: "Silchar",
        transportDestination: "Shillong",
        price: 35
      }
    ]
  }
];

const AdminDashboard = () => {
  const [territory] = useState("Assam-North"); // This would come from admin login
  const [adminId] = useState("ADM001"); // This would come from admin login

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <p className="text-gray-600">Territory: {territory} | Admin ID: {adminId}</p>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Farmers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockFarmers.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Territories</CardTitle>
            <Map className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Harvest Locations</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Transports</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
      </div>

      {/* Farmers and Crops Table */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Farmers and Allocated Crops</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Farmer ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Crop</TableHead>
                <TableHead>Harvest Location</TableHead>
                <TableHead>Transport To</TableHead>
                <TableHead>Price (₹/kg)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockFarmers.map((farmer) =>
                farmer.allocatedCrops.map((crop) => (
                  <TableRow key={`${farmer.id}-${crop.cropId}`}>
                    <TableCell>{farmer.id}</TableCell>
                    <TableCell>{farmer.name}</TableCell>
                    <TableCell>{crop.cropName}</TableCell>
                    <TableCell>{crop.harvestLocation}</TableCell>
                    <TableCell>{crop.transportDestination}</TableCell>
                    <TableCell>₹{crop.price}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;

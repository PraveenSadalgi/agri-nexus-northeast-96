
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Users, Map, MapPin, Truck } from "lucide-react";

// Temporary mock data for admins
const MY_ADMIN_ID = "ADM001";
const MY_TERRITORY = "Assam-North";

// Helper to get all farmers from localStorage
function getAllFarmers() {
  const farmers: any[] = [];
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i);
    if (key && key.startsWith("F")) {
      try {
        const farmer = JSON.parse(window.localStorage.getItem(key) || "");
        // Only count farmers with a valid structure
        if (farmer && farmer.id && farmer.name) {
          farmers.push(farmer);
        }
      } catch {
        // Ignore non-JSON/storage corruption
      }
    }
  }
  return farmers;
}

// Example crops (from before)
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
        price: 150,
      },
    ],
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
        price: 35,
      },
    ],
  },
];

const AdminDashboard = () => {
  // This would come from admin login in a real app
  const [territory] = useState(MY_TERRITORY);
  const [adminId] = useState(MY_ADMIN_ID);
  const [registeredFarmers, setRegisteredFarmers] = useState<any[]>([]);

  useEffect(() => {
    const farmers = getAllFarmers();
    setRegisteredFarmers(farmers);
  }, []);

  // Combine live registered farmers with mock farmers
  const allFarmers = [...mockFarmers];
  // Add any new registered farmers not already in mockFarmers
  registeredFarmers.forEach((rf) => {
    if (!allFarmers.find((f) => f.id === rf.id)) {
      allFarmers.push(rf);
    }
  });

  // Calculate average crop price for this territory
  const cropsInTerritory = allFarmers
    .filter((f) => f.territory === territory)
    .flatMap((f) => f.allocatedCrops || []);
  const avgPrice =
    cropsInTerritory.length > 0
      ? (cropsInTerritory.reduce((sum, c) => sum + (c.price || 0), 0) /
          cropsInTerritory.length
        ).toFixed(0)
      : "N/A";

  // Count harvest and transport locations (unique for demo)
  const allHarvest = [
    ...new Set(
      allFarmers
        .flatMap((f) => (f.allocatedCrops ? f.allocatedCrops.map((c: any) => c.harvestLocation) : []))
        .filter(Boolean)
    ),
  ];
  const allTransport = [
    ...new Set(
      allFarmers
        .flatMap((f) => (f.allocatedCrops ? f.allocatedCrops.map((c: any) => c.transportDestination) : []))
        .filter(Boolean)
    ),
  ];

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <p className="text-gray-600">
        Territory: {territory} | Admin ID: {adminId}
      </p>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Farmers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allFarmers.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Territories</CardTitle>
            <Map className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {[...new Set(allFarmers.map((f) => f.territory))].length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Harvest Locations</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allHarvest.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Transports</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allTransport.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Average Crop Price in territory */}
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>
            Average Crop Price in <span className="font-semibold">{territory}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span className="text-2xl font-bold">₹{avgPrice}</span>
        </CardContent>
      </Card>

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
                <TableHead>Territory</TableHead>
                <TableHead>Crop</TableHead>
                <TableHead>Harvest Location</TableHead>
                <TableHead>Transport To</TableHead>
                <TableHead>Price (₹/kg)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allFarmers.map((farmer) =>
                (farmer.allocatedCrops && farmer.allocatedCrops.length > 0 ? farmer.allocatedCrops : [null]).map(
                  (crop: any, idx: number) => (
                    <TableRow key={`${farmer.id}-${idx}`}>
                      <TableCell>{farmer.id}</TableCell>
                      <TableCell>{farmer.name}</TableCell>
                      <TableCell>{farmer.territory}</TableCell>
                      <TableCell>{crop ? crop.cropName : <span className="italic text-muted-foreground">-</span>}</TableCell>
                      <TableCell>{crop ? crop.harvestLocation : <span className="italic text-muted-foreground">-</span>}</TableCell>
                      <TableCell>{crop ? crop.transportDestination : <span className="italic text-muted-foreground">-</span>}</TableCell>
                      <TableCell>
                        {crop && crop.price ? <>₹{crop.price}</> : <span className="italic text-muted-foreground">-</span>}
                      </TableCell>
                    </TableRow>
                  )
                )
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;

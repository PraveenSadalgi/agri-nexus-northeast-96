
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { Farmer } from "@/types/admin";
import { Button } from "@/components/ui/button";
import AllocateCropDialog from "@/components/admin/AllocateCropDialog";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { MapPin, Truck, Users, Check, X } from "lucide-react";

const AdminDashboard = () => {
  const [tickets, setTickets] = useState<
    Array<{ id: string; desc: string; farmer: string; date: string; status: string }>
  >([]);
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [selectedFarmerId, setSelectedFarmerId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [transportRequests, setTransportRequests] = useState<
    Array<{ id: string; farmerId: string; farmer: string; cropId: string; cropName: string; status: string; requestDate: string; destination: string }>
  >([]);
  const [accessLogs, setAccessLogs] = useState<
    Array<{ id: string; userId: string; userName: string; action: string; timestamp: string }>
  >([]);

  // Generate some demo transport requests
  useEffect(() => {
    const demoRequests = [
      {
        id: "TR1001",
        farmerId: "F1001",
        farmer: "Rajesh Kumar",
        cropId: "C1001",
        cropName: "Rice",
        status: "pending",
        requestDate: new Date().toISOString(),
        destination: "Chennai Market"
      },
      {
        id: "TR1002",
        farmerId: "F1002",
        farmer: "Anand Singh",
        cropId: "C1002",
        cropName: "Wheat",
        status: "approved",
        requestDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        destination: "Delhi Warehouse"
      },
      {
        id: "TR1003",
        farmerId: "F1003",
        farmer: "Lakshmi Devi",
        cropId: "C1003",
        cropName: "Cotton",
        status: "pending",
        requestDate: new Date().toISOString(),
        destination: "Mumbai Export Terminal"
      }
    ];
    setTransportRequests(demoRequests);
    
    // Generate demo access logs
    const demoLogs = [
      {
        id: "AL1001",
        userId: "F1001",
        userName: "Rajesh Kumar",
        action: "Logged In",
        timestamp: new Date().toISOString()
      },
      {
        id: "AL1002",
        userId: "F1002",
        userName: "Anand Singh",
        action: "Updated Profile",
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString()
      },
      {
        id: "AL1003",
        userId: "A1001",
        userName: "Admin User",
        action: "Approved Transport Request",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      }
    ];
    setAccessLogs(demoLogs);
  }, []);

  useEffect(() => {
    // Retrieve query tickets from localStorage
    const ticketList = window.localStorage.getItem("queryTickets");
    if (ticketList) {
      setTickets(JSON.parse(ticketList));
    }
    
    // Load farmers data
    const loadFarmers = () => {
      // Demo data for farmers
      const demoFarmers: Farmer[] = [
        {
          id: "F1001",
          name: "Rajesh Kumar",
          territory: "Tamil Nadu",
          allocatedCrops: [
            {
              cropId: "C1001",
              cropName: "Rice",
              harvestLocation: "Thanjavur",
              transportDestination: "Chennai",
              price: 2500
            }
          ]
        },
        {
          id: "F1002",
          name: "Anand Singh",
          territory: "Punjab",
          allocatedCrops: [
            {
              cropId: "C1002",
              cropName: "Wheat",
              harvestLocation: "Amritsar",
              transportDestination: "Delhi",
              price: 1800
            }
          ]
        },
        {
          id: "F1003",
          name: "Lakshmi Devi",
          territory: "Maharashtra",
          allocatedCrops: [
            {
              cropId: "C1003",
              cropName: "Cotton",
              harvestLocation: "Nagpur",
              transportDestination: "Mumbai",
              price: 3200
            },
            {
              cropId: "C1004",
              cropName: "Soybeans",
              harvestLocation: "Pune",
              transportDestination: "Mumbai",
              price: 2800
            }
          ]
        }
      ];

      // Store farmers in local storage
      demoFarmers.forEach(farmer => {
        const existingFarmer = window.localStorage.getItem(farmer.id);
        if (!existingFarmer) {
          window.localStorage.setItem(farmer.id, JSON.stringify(farmer));
        }
      });

      // Get all farmers from localStorage
      const storedFarmers: Farmer[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('F')) {
          const farmerData = localStorage.getItem(key);
          if (farmerData) {
            try {
              const farmer = JSON.parse(farmerData);
              storedFarmers.push(farmer);
            } catch (e) {
              console.error("Error parsing farmer data", e);
            }
          }
        }
      }
      
      setFarmers(storedFarmers.length ? storedFarmers : demoFarmers);
    };
    
    loadFarmers();
  }, []);

  const handleAllocateClick = (farmerId: string) => {
    setSelectedFarmerId(farmerId);
    setDialogOpen(true);
  };

  const handleAfterAllocate = () => {
    // Refresh farmers data
    const updatedFarmers = [...farmers];
    if (selectedFarmerId) {
      const farmerJSON = window.localStorage.getItem(selectedFarmerId);
      if (farmerJSON) {
        const updatedFarmer = JSON.parse(farmerJSON);
        const farmerIndex = updatedFarmers.findIndex(f => f.id === selectedFarmerId);
        if (farmerIndex !== -1) {
          updatedFarmers[farmerIndex] = updatedFarmer;
          setFarmers(updatedFarmers);
        }
      }
    }
  };

  const handleTransportRequest = (id: string, status: string) => {
    setTransportRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status } : req
    ));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2" />
              Track Crops by Quantity and Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Crop Name</TableHead>
                  <TableHead>Farmer</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Price (₹/kg)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {farmers.flatMap(farmer => 
                  farmer.allocatedCrops.map(crop => (
                    <TableRow key={crop.cropId}>
                      <TableCell>{crop.cropName}</TableCell>
                      <TableCell>{farmer.name}</TableCell>
                      <TableCell>{crop.harvestLocation}</TableCell>
                      <TableCell>{crop.price}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2" />
              Manage Farmer Profiles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {farmers.map(farmer => (
                <div key={farmer.id} className="border rounded p-2">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h3 className="font-semibold">{farmer.name}</h3>
                      <p className="text-sm text-gray-500">ID: {farmer.id} • Territory: {farmer.territory}</p>
                    </div>
                    <Button onClick={() => handleAllocateClick(farmer.id)}>
                      Allocate Crop
                    </Button>
                  </div>
                  
                  {farmer.allocatedCrops.length > 0 && (
                    <div className="text-sm">
                      <p className="font-medium mb-1">Allocated Crops:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        {farmer.allocatedCrops.map(crop => (
                          <li key={crop.cropId}>
                            {crop.cropName} - {crop.harvestLocation} → {crop.transportDestination} (₹{crop.price}/kg)
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Truck className="mr-2" /> 
              Approve Transport and Monitor Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="font-semibold mb-2">Transport Requests</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Farmer</TableHead>
                  <TableHead>Crop</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transportRequests.map(request => (
                  <TableRow key={request.id}>
                    <TableCell>{request.farmer}</TableCell>
                    <TableCell>{request.cropName}</TableCell>
                    <TableCell>{request.destination}</TableCell>
                    <TableCell>
                      <span className={`inline-block px-2 py-1 rounded text-xs ${
                        request.status === 'approved' ? 'bg-green-100 text-green-800' : 
                        request.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {request.status === 'pending' && (
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex items-center text-green-600" 
                            onClick={() => handleTransportRequest(request.id, 'approved')}
                          >
                            <Check className="h-4 w-4 mr-1" /> Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex items-center text-red-600" 
                            onClick={() => handleTransportRequest(request.id, 'rejected')}
                          >
                            <X className="h-4 w-4 mr-1" /> Reject
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <h3 className="font-semibold mb-2 mt-6">Access Logs</h3>
            <div className="max-h-40 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accessLogs.map(log => (
                    <TableRow key={log.id}>
                      <TableCell>{log.userName}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>New Query Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            {tickets.length === 0 && <p className="text-gray-600">No query tickets yet.</p>}
            {tickets.length > 0 &&
              <div className="space-y-4">
                {tickets.map(ticket => (
                  <div key={ticket.id} className="border rounded p-2">
                    <div className="text-sm text-gray-500">
                      <span>Date: {new Date(ticket.date).toLocaleString()}</span>
                      {" · "}
                      <span>Farmer: <span className="font-semibold">{ticket.farmer}</span></span>
                      {" · "}
                      <span>Status: <span className="capitalize">{ticket.status}</span></span>
                    </div>
                    <div className="mt-1 font-medium">{ticket.desc}</div>
                  </div>
                ))}
              </div>
            }
          </CardContent>
        </Card>
      </div>

      <AllocateCropDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        farmerId={selectedFarmerId}
        onAllocate={handleAfterAllocate}
      />
    </div>
  );
};

export default AdminDashboard;

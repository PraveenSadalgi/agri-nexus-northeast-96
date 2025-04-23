import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { Farmer } from "@/types/admin";
import { Button } from "@/components/ui/button";
import AllocateCropDialog from "@/components/admin/AllocateCropDialog";
import DeallocateCropDialog from "@/components/admin/DeallocateCropDialog";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { MapPin, Truck, Users, Check, X, WheatOff, Leaf, Tractor, MessageSquare } from "lucide-react";

const DEMO_TRANSPORT_REQUESTS = [
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

const DEMO_ACCESS_LOGS = [
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

const DEMO_FARMERS: Farmer[] = [
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

const AdminDashboard = () => {
  const [tickets, setTickets] = useState<
    Array<{ id: string; desc: string; farmer: string; date: string; status: string }>
  >([]);
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [selectedFarmerId, setSelectedFarmerId] = useState<string | null>(null);
  const [allocateDialogOpen, setAllocateDialogOpen] = useState(false);
  const [deallocateDialogOpen, setDeallocateDialogOpen] = useState(false);
  const [transportRequests, setTransportRequests] = useState(DEMO_TRANSPORT_REQUESTS);
  const [accessLogs, setAccessLogs] = useState(DEMO_ACCESS_LOGS);

  useEffect(() => {
    const ticketList = window.localStorage.getItem("queryTickets");
    if (ticketList) {
      setTickets(JSON.parse(ticketList));
    }
    
    const initializeFarmers = () => {
      let hasStoredFarmers = false;
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('F')) {
          hasStoredFarmers = true;
          break;
        }
      }
      
      if (!hasStoredFarmers) {
        DEMO_FARMERS.forEach(farmer => {
          window.localStorage.setItem(farmer.id, JSON.stringify(farmer));
        });
      }
      
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
      
      setFarmers(storedFarmers.length > 0 ? storedFarmers : DEMO_FARMERS);
    };
    
    initializeFarmers();
  }, []);

  const handleAllocateClick = (farmerId: string) => {
    setSelectedFarmerId(farmerId);
    setAllocateDialogOpen(true);
  };

  const handleDeallocateClick = (farmerId: string) => {
    setSelectedFarmerId(farmerId);
    setDeallocateDialogOpen(true);
  };

  const handleAfterAllocate = () => {
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

  const handleAfterDeallocate = () => {
    handleAfterAllocate();
  };

  const handleTransportRequest = (id: string, status: string) => {
    setTransportRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status } : req
    ));
  };

  const handleTicketStatusToggle = (ticketId: string) => {
    const ticketList = window.localStorage.getItem("queryTickets");
    if (ticketList) {
      const tickets = JSON.parse(ticketList);
      const updatedTickets = tickets.map((ticket: any) => 
        ticket.id === ticketId 
          ? { ...ticket, status: ticket.status === "open" ? "resolved" : "open" }
          : ticket
      );
      window.localStorage.setItem("queryTickets", JSON.stringify(updatedTickets));
      setTickets(updatedTickets);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50 p-4">
      <div className="container mx-auto">
        <div className="bg-gradient-to-r from-green-800 to-emerald-700 text-white p-6 rounded-lg shadow-lg mb-6">
          <div className="flex items-center mb-2">
            <Tractor className="h-8 w-8 mr-3" />
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          </div>
          <p className="text-green-100">Manage farmers, track crops, and oversee agricultural operations</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white border-green-100 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="border-b border-green-100 bg-green-50">
              <CardTitle className="flex items-center text-green-800">
                <MapPin className="mr-2" />
                Track Crops by Quantity and Location
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-green-50">
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
                        <TableRow key={crop.cropId} className="hover:bg-green-50">
                          <TableCell className="flex items-center">
                            <Leaf className="h-4 w-4 mr-2 text-green-500" />
                            {crop.cropName}
                          </TableCell>
                          <TableCell>{farmer.name}</TableCell>
                          <TableCell>{crop.harvestLocation}</TableCell>
                          <TableCell>₹{crop.price}</TableCell>
                        </TableRow>
                      ))
                    )}
                    {farmers.flatMap(farmer => farmer.allocatedCrops).length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                          No crops allocated to any farmers yet
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-green-100 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="border-b border-green-100 bg-green-50">
              <CardTitle className="flex items-center text-green-800">
                <Users className="mr-2" />
                Manage Farmer Profiles
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {farmers.map(farmer => (
                  <div key={farmer.id} className="border rounded-lg p-4 bg-white shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h3 className="font-semibold text-green-800">{farmer.name}</h3>
                        <p className="text-sm text-gray-500">ID: {farmer.id} • Territory: {farmer.territory}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          onClick={() => handleAllocateClick(farmer.id)}
                          className="bg-emerald-600 hover:bg-emerald-700"
                          size="sm"
                        >
                          <Leaf className="h-4 w-4 mr-1" />
                          Allocate
                        </Button>
                        {farmer.allocatedCrops.length > 0 && (
                          <Button 
                            onClick={() => handleDeallocateClick(farmer.id)} 
                            variant="destructive"
                            size="sm"
                          >
                            <WheatOff className="h-4 w-4 mr-1" />
                            Deallocate
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    {farmer.allocatedCrops.length > 0 && (
                      <div className="mt-3 pt-3 border-t">
                        <p className="font-medium text-sm text-green-700 mb-2">Allocated Crops:</p>
                        <div className="space-y-2">
                          {farmer.allocatedCrops.map(crop => (
                            <div key={crop.cropId} className="bg-green-50 p-2 rounded-md text-sm flex justify-between items-center">
                              <div className="flex items-center">
                                <Leaf className="h-4 w-4 mr-2 text-green-600" />
                                <span>{crop.cropName}</span>
                              </div>
                              <span className="text-gray-600 text-xs">
                                {crop.harvestLocation} → {crop.transportDestination} (₹{crop.price}/kg)
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white border-green-100 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="border-b border-green-100 bg-green-50">
              <CardTitle className="flex items-center text-green-800">
                <Truck className="mr-2" /> 
                Approve Transport and Monitor Access
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3 text-green-800">Transport Requests</h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-green-50">
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
                      <TableRow key={request.id} className="hover:bg-green-50">
                        <TableCell>{request.farmer}</TableCell>
                        <TableCell>{request.cropName}</TableCell>
                        <TableCell>{request.destination}</TableCell>
                        <TableCell>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                            request.status === 'approved' ? 'bg-green-100 text-green-800' : 
                            request.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                            'bg-amber-100 text-amber-800'
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
                                className="flex items-center text-green-600 border-green-200 bg-green-50 hover:bg-green-100" 
                                onClick={() => handleTransportRequest(request.id, 'approved')}
                              >
                                <Check className="h-4 w-4 mr-1" /> Approve
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="flex items-center text-red-600 border-red-200 bg-red-50 hover:bg-red-100" 
                                onClick={() => handleTransportRequest(request.id, 'rejected')}
                              >
                                <X className="h-4 w-4 mr-1" /> Reject
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                    {transportRequests.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                          No transport requests available
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              <h3 className="font-semibold mb-3 mt-6 text-green-800">Access Logs</h3>
              <div className="max-h-40 overflow-y-auto border rounded">
                <Table>
                  <TableHeader className="bg-green-50">
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {accessLogs.map(log => (
                      <TableRow key={log.id} className="hover:bg-green-50">
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
          
          <Card className="bg-white border-green-100 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="border-b border-green-100 bg-green-50">
              <CardTitle className="flex items-center text-green-800">
                <MessageSquare className="mr-2" />
                Farmer Query Tickets
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              {tickets.length === 0 && <p className="text-gray-500 text-center py-6">No query tickets yet.</p>}
              {tickets.length > 0 &&
                <div className="space-y-4 max-h-[400px] overflow-y-auto">
                  {tickets.map(ticket => (
                    <div 
                      key={ticket.id} 
                      className={`border rounded-lg p-3 ${
                        ticket.status === "open" ? "bg-amber-50 border-amber-200" : "bg-green-50 border-green-200"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-grow">
                          <div className="text-sm text-gray-500 mb-1 flex flex-wrap gap-2">
                            <span>Date: {new Date(ticket.date).toLocaleString()}</span>
                            <span className="font-semibold">Farmer: {ticket.farmer}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs ${
                              ticket.status === "open" ? "bg-amber-200 text-amber-800" : "bg-green-200 text-green-800"
                            }`}>
                              {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                            </span>
                          </div>
                          <div className="mt-1 font-medium text-gray-800">{ticket.desc}</div>
                        </div>
                        <Button
                          size="sm"
                          variant={ticket.status === "open" ? "outline" : "secondary"}
                          className={ticket.status === "open" ? "border-green-300 text-green-700" : "bg-amber-200 text-amber-800 border-0"}
                          onClick={() => handleTicketStatusToggle(ticket.id)}
                        >
                          {ticket.status === "open" ? (
                            <>
                              <Check className="h-4 w-4 mr-1" />
                              Mark Resolved
                            </>
                          ) : (
                            <>
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Reopen
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              }
            </CardContent>
          </Card>
        </div>

        <AllocateCropDialog
          open={allocateDialogOpen}
          onOpenChange={setAllocateDialogOpen}
          farmerId={selectedFarmerId}
          onAllocate={handleAfterAllocate}
        />

        <DeallocateCropDialog
          open={deallocateDialogOpen}
          onOpenChange={setDeallocateDialogOpen}
          farmerId={selectedFarmerId}
          onDeallocate={handleAfterDeallocate}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;

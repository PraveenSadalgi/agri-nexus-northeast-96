import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [tickets, setTickets] = useState<
    Array<{ id: string; desc: string; farmer: string; date: string; status: string }>
  >([]);

  useEffect(() => {
    // Retrieve query tickets from localStorage
    const ticketList = window.localStorage.getItem("queryTickets");
    if (ticketList) {
      setTickets(JSON.parse(ticketList));
    }
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
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
        <Card>
          <CardHeader>
            <CardTitle>Farmer Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Manage farmers and their allocations here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;

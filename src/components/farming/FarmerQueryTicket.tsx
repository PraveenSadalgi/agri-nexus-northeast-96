
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { HelpCircle, Send, Copy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const QUERY_KEY = "queryTickets";

const FarmerQueryTicket: React.FC = () => {
  const [query, setQuery] = useState("");
  const [queries, setQueries] = useState<string[]>(() =>
    JSON.parse(window.localStorage.getItem(QUERY_KEY) || "[]")
  );
  const [farmerId, setFarmerId] = useState<string | null>(null);
  const [territory, setTerritory] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const storedId = window.localStorage.getItem("currentFarmerId");
    if (storedId) {
      setFarmerId(storedId);
      const farmerData = window.localStorage.getItem(storedId);
      if (farmerData) {
        try {
          const farmer = JSON.parse(farmerData);
          setTerritory(farmer.territory || null);
        } catch (e) {
          console.error("Error parsing farmer data", e);
        }
      }
    }
  }, []);

  const handleRaiseQuery = () => {
    if (!query.trim()) return;
    
    const ticketsJSON = window.localStorage.getItem("queryTickets");
    const tickets = ticketsJSON ? JSON.parse(ticketsJSON) : [];
    const newTicket = {
      id: "Q" + Math.floor(1000 + Math.random() * 9000),
      desc: query,
      farmer: window.localStorage.getItem("currentFarmerName") || "Anonymous",
      farmerId: farmerId || "Unknown",
      territory: territory || "Unknown",
      date: new Date().toISOString(),
      status: "open",
    };
    
    tickets.push(newTicket);
    window.localStorage.setItem("queryTickets", JSON.stringify(tickets));
    
    const updatedQueries = [...queries, query];
    setQueries(updatedQueries);
    window.localStorage.setItem(QUERY_KEY, JSON.stringify(updatedQueries));
    
    setQuery("");
    toast.success("Query ticket raised successfully!");
    setMessage("Query ticket raised successfully!");
    setTimeout(() => setMessage(null), 2000);
  };

  const handleCopyId = () => {
    if (farmerId) {
      navigator.clipboard.writeText(farmerId);
      toast.success("Farmer ID copied to clipboard!");
    }
  };

  return (
    <Card className="border-agri-200">
      <CardHeader className="bg-agri-600 text-white py-3 px-4">
        <CardTitle className="text-md flex items-center justify-between">
          <div className="flex items-center">
            <HelpCircle className="h-4 w-4 mr-2" />
            Raise Query Ticket
          </div>
          {farmerId && (
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:text-white/90"
              onClick={handleCopyId}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy ID
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex gap-2 mb-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your query here..."
            className="border-gray-300 focus:border-agri-500 focus:ring-agri-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && query.trim()) {
                handleRaiseQuery();
              }
            }}
          />
          <Button 
            onClick={handleRaiseQuery}
            disabled={!query.trim()}
            className="bg-agri-600 hover:bg-agri-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        {message && (
          <div className="text-green-600 text-sm mb-2 bg-green-50 p-2 rounded border border-green-200">
            {message}
          </div>
        )}
        
        <div className="mt-4">
          <p className="font-medium text-sm text-gray-700 mb-2">Recent Queries:</p>
          {queries.length === 0 ? (
            <p className="text-sm text-gray-500 italic">No queries yet</p>
          ) : (
            <ul className="space-y-2 max-h-40 overflow-y-auto pr-2">
              {queries.slice().reverse().map((q, idx) => (
                <li key={idx} className="text-sm text-gray-700 bg-gray-50 p-2 rounded-md border border-gray-100">
                  {q}
                </li>
              ))}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FarmerQueryTicket;


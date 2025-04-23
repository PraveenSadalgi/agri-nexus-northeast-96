
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { HelpCircle, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const QUERY_KEY = "farmer_queries_demo";

const FarmerQueryTicket: React.FC = () => {
  const [query, setQuery] = useState("");
  const [queries, setQueries] = useState<string[]>(() =>
    JSON.parse(window.localStorage.getItem(QUERY_KEY) || "[]")
  );
  const [message, setMessage] = useState<string | null>(null);

  const handleRaiseQuery = () => {
    if (!query.trim()) return;
    const updatedQueries = [...queries, query];
    setQueries(updatedQueries);
    window.localStorage.setItem(QUERY_KEY, JSON.stringify(updatedQueries));
    setQuery("");
    setMessage("Query ticket raised successfully!");
    setTimeout(() => setMessage(null), 2000);
  };

  return (
    <Card className="border-agri-200">
      <CardHeader className="bg-agri-600 text-white py-3 px-4">
        <CardTitle className="text-md flex items-center">
          <HelpCircle className="h-4 w-4 mr-2" />
          Raise Query Ticket
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


import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

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
    <div className="mt-6">
      <h3 className="font-semibold mb-2">Raise Query Ticket</h3>
      <div className="flex gap-2 mb-2">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type your query here..."
        />
        <Button onClick={handleRaiseQuery}>Raise</Button>
      </div>
      {message && <div className="text-green-600 text-sm mb-2">{message}</div>}
      <ul className="list-disc pl-5 text-sm text-gray-700">
        {queries.slice().reverse().map((q, idx) => (
          <li key={idx}>{q}</li>
        ))}
      </ul>
    </div>
  );
};

export default FarmerQueryTicket;

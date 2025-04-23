
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NewsFeed from "@/components/farming/NewsFeed";
import ImageUpload from "@/components/farming/ImageUpload";
import QueryTicketDialog from "@/components/farming/QueryTicketDialog";
import WeatherForecast from "@/components/farming/WeatherForecast";
import React, { useState } from "react";

const FarmerDashboard = () => {
  const [queryDialogOpen, setQueryDialogOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar side="right" variant="floating">
          <SidebarHeader className="h-14 flex items-center px-4">
            <h2 className="text-lg font-semibold">Updates</h2>
          </SidebarHeader>
          <SidebarContent>
            <NewsFeed />
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 p-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Farmer Dashboard</h1>
            <SidebarTrigger />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <Card>
              <CardHeader>
                <CardTitle>Assigned Crops</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Your assigned crops will appear here</p>
                {/* Optionally, render crops from localStorage or API */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Weather Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <WeatherForecast />
              </CardContent>
            </Card>
          </div>

          {/* Farmer Actions */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="w-full md:w-1/2">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Your Product Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <ImageUpload />
                </CardContent>
              </Card>
            </div>
            <div className="w-full md:w-1/2">
              <Card>
                <CardHeader>
                  <CardTitle>Raise a Query Ticket</CardTitle>
                </CardHeader>
                <CardContent>
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
                    onClick={() => setQueryDialogOpen(true)}
                  >
                    Raise Ticket
                  </button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Query Dialog */}
          <QueryTicketDialog open={queryDialogOpen} onOpenChange={setQueryDialogOpen} />

        </main>
      </div>
    </SidebarProvider>
  );
};

export default FarmerDashboard;


import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NewsFeed from "@/components/farming/NewsFeed";

const FarmerDashboard = () => {
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
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Assigned Crops</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Your assigned crops will appear here</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Weather Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Local weather information will be displayed here</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default FarmerDashboard;

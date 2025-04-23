
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { UserPlus, ChevronLeft, Leaf } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Farmer } from "@/types/admin";

const FarmerRegistration = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [territory, setTerritory] = useState("");

  const territories = [
    "Assam", "Arunachal Pradesh", "Manipur", "Meghalaya", 
    "Mizoram", "Nagaland", "Sikkim", "Tripura"
  ];

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !territory) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const farmerId = `F${Math.floor(Math.random() * 10000)}`;
    
    const newFarmer: Farmer = {
      id: farmerId,
      name,
      territory,
      allocatedCrops: []
    };
    
    localStorage.setItem(farmerId, JSON.stringify(newFarmer));
    window.dispatchEvent(new Event('storage'));

    toast.success(`Registration successful! Your Farmer ID is: ${farmerId}`);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIj48cGF0aCBkPSJNMzYgMzRjMCAxLjEtLjkgMi0yIDJzLTItLjktMi0yIC45LTIgMi0yIDIgLjkgMiAyem0tOCAwYzAgMS4xLS45IDItMiAyczItLjkgMi0yLS45LTItMi0yLTIgLjktMiAyem0tOCAwYzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnoiIHN0cm9rZT0iIzQ0NCIvPjxwYXRoIGQ9Ik00NCAyNGMwIDEuMS0uOSAyLTIgMnMtMi0uOS0yLTIgLjktMiAyLTIgMiAuOSAyIDJ6bS04IDBjMCAxLjEtLjkgMi0yIDJzLTItLjktMi0yIC45LTIgMi0yIDIgLjkgMiAyem0tOCAwYzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptLTggMGMwIDEuMS0uOSAyLTIgMnMtMi0uOS0yLTIgLjktMiAyLTIgMiAuOSAyIDJ6bTI0LThjMCAxLjEtLjkgMi0yIDJzLTItLjktMi0yIC45LTIgMi0yIDIgLjkgMiAyem0tOCAwYzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptLTggMGMwIDEuMS0uOSAyLTIgMnMtMi0uOS0yLTIgLjktMiAyLTIgMiAuOSAyIDJ6bS04IDBjMCAxLjEtLjkgMi0yIDJzLTItLjktMi0yIC45LTIgMi0yIDIgLjkgMiAyeiIgZmlsbC1vcGFjaXR5PSIuMyIgZmlsbD0iIzQ0NCIvPjwvZz48L3N2Zz4=')] bg-agri-50/95 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/login" className="inline-flex items-center text-agri-600 hover:text-agri-700 mb-6 transition-colors">
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to Login
        </Link>
        
        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
          <CardHeader className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-agri-100 to-agri-200 text-agri-600 flex items-center justify-center mx-auto">
              <Leaf className="h-8 w-8" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-br from-agri-800 to-agri-600 bg-clip-text text-transparent">
              Farmer Registration
            </CardTitle>
            <CardDescription className="text-agri-600">Join the AgriBridge NE community</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-agri-700">Full Name <span className="text-red-500">*</span></Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="border-agri-200 focus:border-agri-500 focus:ring-agri-500 bg-white/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-agri-700">Email <span className="text-red-500">*</span></Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-agri-200 focus:border-agri-500 focus:ring-agri-500 bg-white/50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-agri-700">Password <span className="text-red-500">*</span></Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-agri-200 focus:border-agri-500 focus:ring-agri-500 bg-white/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-agri-700">Confirm Password <span className="text-red-500">*</span></Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="border-agri-200 focus:border-agri-500 focus:ring-agri-500 bg-white/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="territory" className="text-agri-700">Territory <span className="text-red-500">*</span></Label>
                <Select value={territory} onValueChange={setTerritory} required>
                  <SelectTrigger className="w-full border-agri-200 focus:border-agri-500 focus:ring-agri-500 bg-white/50">
                    <SelectValue placeholder="Select your territory" />
                  </SelectTrigger>
                  <SelectContent>
                    {territories.map((terr) => (
                      <SelectItem key={terr} value={terr}>
                        {terr}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-agri-600 to-agri-700 hover:from-agri-700 hover:to-agri-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Register as Farmer <UserPlus className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="text-center text-sm text-agri-600 mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-agri-700 hover:text-agri-800 hover:underline font-medium">
                  Sign in here
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FarmerRegistration;

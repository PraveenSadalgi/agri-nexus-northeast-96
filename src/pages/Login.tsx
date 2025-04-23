
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CheckCircle, AlertTriangle, Leaf, Eye, EyeOff } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("farmer");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (type === "admin" && username === "admin" && password === "admin") {
      toast.success("Welcome, Admin!", {
        description: "You have successfully logged in.",
        icon: <CheckCircle className="h-4 w-4" />,
      });
      navigate("/admin-dashboard");
      return;
    }
    
    if (type === "buyer" && username === "buyer" && password === "buyer") {
      toast.success("Welcome, Buyer!", {
        description: "You have successfully logged in.",
        icon: <CheckCircle className="h-4 w-4" />,
      });
      navigate("/buyer-dashboard");
      return;
    }
    
    if (type === "farmer") {
      // Simple validation for farmer login
      const farmerId = username;
      
      // For demo purposes, allow login with any farmer name and password "farmer"
      if (password === "farmer") {
        // Check if there's already a registered farmer with this ID
        const farmerData = window.localStorage.getItem(farmerId);
        
        if (farmerData) {
          try {
            const farmer = JSON.parse(farmerData);
            // Store the farmer name and ID for use in dashboard
            window.localStorage.setItem("currentFarmerName", farmer.name);
            window.localStorage.setItem("currentFarmerId", farmerId);
            
            toast.success(`Welcome, ${farmer.name}!`, {
              description: "You have successfully logged in.",
              icon: <CheckCircle className="h-4 w-4" />,
            });
            
            navigate("/farmer-dashboard");
            return;
          } catch (e) {
            console.error("Error parsing farmer data", e);
          }
        } else {
          setError("Farmer not registered. Please register first.");
          return;
        }
      }
    }
    
    setError("Invalid credentials. Please try again.");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIj48cGF0aCBkPSJNMzYgMzRjMCAxLjEtLjkgMi0yIDJzLTItLjktMi0yIC45LTIgMi0yIDIgLjkgMiAyem0tOCAwYzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnoiIHN0cm9rZT0iIzQ0NCIvPjxwYXRoIGQ9Ik00NCAyNGMwIDEuMS0uOSAyLTIgMnMtMi0uOS0yLTIgLjktMiAyLTIgMiAuOSAyIDJ6bS04IDBjMCAxLjEtLjkgMi0yIDJzLTItLjktMi0yIC45LTIgMi0yIDIgLjkgMiAyem0tOCAwYzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptLTggMGMwIDEuMS0uOSAyLTIgMnMtMi0uOS0yLTIgLjktMiAyLTIgMiAuOSAyIDJ6bTI0LThjMCAxLjEtLjkgMi0yIDJzLTItLjktMi0yIC45LTIgMi0yIDIgLjkgMiAyem0tOCAwYzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptLTggMGMwIDEuMS0uOSAyLTIgMnMtMi0uOS0yLTIgLjktMiAyLTIgMiAuOSAyIDJ6bS04IDBjMCAxLjEtLjkgMi0yIDJzLTItLjktMi0yIC45LTIgMi0yIDIgLjkgMiAyeiIgZmlsbC1vcGFjaXR5PSIuMyIgZmlsbD0iIzQ0NCIvPjwvZz48L3N2Zz4=')] bg-agri-50/95 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
          <CardHeader className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-agri-100 to-agri-200 text-agri-600 flex items-center justify-center mx-auto">
              <Leaf className="h-8 w-8" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-br from-agri-800 to-agri-600 bg-clip-text text-transparent">
              AgriBridge NE
            </CardTitle>
            <CardDescription className="text-agri-600">Sign in to your account</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 p-3 rounded-md bg-red-50 text-red-700 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2" />
                {error}
              </div>
            )}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-agri-700">Username</Label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="border-agri-200 focus:border-agri-500 focus:ring-agri-500 bg-white/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-agri-700">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-agri-200 focus:border-agri-500 focus:ring-agri-500 bg-white/50 pr-10"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-agri-600 hover:text-agri-800"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="type" className="text-agri-700">Login as</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger className="w-full border-agri-200 focus:border-agri-500 focus:ring-agri-500 bg-white/50">
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="farmer">Farmer</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="buyer">Buyer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="pt-2">
                <Button type="submit" className="w-full bg-gradient-to-r from-agri-600 to-agri-700 hover:from-agri-700 hover:to-agri-800 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                  Sign in
                </Button>
              </div>
              {type === "farmer" && (
                <div className="text-center text-sm text-agri-600 mt-4">
                  Don't have an account?{" "}
                  <Link to="/farmer-registration" className="text-agri-700 hover:text-agri-800 hover:underline font-medium">
                    Register as a Farmer
                  </Link>
                </div>
              )}
            </form>
            
            <div className="mt-6 border-t border-gray-200 pt-4">
              <p className="text-sm text-center text-agri-600">Demo Credentials:</p>
              <div className="grid grid-cols-3 gap-2 mt-2 text-xs text-center">
                <div className="bg-agri-50 p-2 rounded">
                  <p className="font-medium">Farmer</p>
                  <p>Username: [registered ID]</p>
                  <p>Password: farmer</p>
                </div>
                <div className="bg-agri-50 p-2 rounded">
                  <p className="font-medium">Admin</p>
                  <p>Username: admin</p>
                  <p>Password: admin</p>
                </div>
                <div className="bg-agri-50 p-2 rounded">
                  <p className="font-medium">Buyer</p>
                  <p>Username: buyer</p>
                  <p>Password: buyer</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;

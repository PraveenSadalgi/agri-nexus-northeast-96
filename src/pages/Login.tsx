import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CheckCircle, AlertTriangle, Leaf, Eye, EyeOff, LogIn, ChevronLeft } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("farmer");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (selectedRole === "admin" && username === "admin" && password === "admin") {
      toast.success("Welcome, Admin!", {
        description: "You have successfully logged in.",
        icon: <CheckCircle className="h-4 w-4" />,
      });
      navigate("/admin-dashboard");
      return;
    }
    
    if (selectedRole === "buyer" && username === "buyer" && password === "buyer") {
      toast.success("Welcome, Buyer!", {
        description: "You have successfully logged in.",
        icon: <CheckCircle className="h-4 w-4" />,
      });
      navigate("/buyer-dashboard");
      return;
    }
    
    if (selectedRole === "farmer") {
      const farmerId = username;
      
      if (password === "farmer") {
        const farmerData = window.localStorage.getItem(farmerId);
        
        if (farmerData) {
          try {
            const farmer = JSON.parse(farmerData);
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

  const getRoleButtonStyle = (role: string) => {
    if (role === selectedRole) {
      switch (role) {
        case "farmer":
          return "bg-green-600 text-white border-green-700";
        case "admin":
          return "bg-blue-600 text-white border-blue-700";
        case "buyer":
          return "bg-amber-600 text-white border-amber-700";
      }
    }
    return "bg-white text-gray-700 hover:bg-gray-50 border-gray-200";
  };

  const getLoginButtonStyle = () => {
    switch (selectedRole) {
      case "farmer":
        return "bg-green-600 hover:bg-green-700 text-white";
      case "admin":
        return "bg-blue-600 hover:bg-blue-700 text-white";
      case "buyer":
        return "bg-amber-600 hover:bg-amber-700 text-white";
    }
  };

  return (
    <div className="min-h-screen bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIj48cGF0aCBkPSJNMzYgMzRjMCAxLjEtLjkgMi0yIDJzLTItLjktMi0yIC45LTIgMi0yIDIgLjkgMiAyem0tOCAwYzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnoiIHN0cm9rZT0iIzQ0NCIvPjxwYXRoIGQ9Ik00NCAyNGMwIDEuMS0uOSAyLTIgMnMtMi0uOS0yLTIgLjktMiAyLTIgMiAuOSAyIDJ6bS04IDBjMCAxLjEtLjkgMi0yIDJzLTItLjktMi0yIC45LTIgMi0yIDIgLjkgMiAyem0tOCAwYzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptLTggMGMwIDEuMS0uOSAyLTIgMnMtMi0uOS0yLTIgLjktMiAyLTIgMiAuOSAyIDJ6bTI0LThjMCAxLjEtLjkgMi0yIDJzLTItLjktMi0yIC45LTIgMi0yIDIgLjkgMiAyem0tOCAwYzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptLTggMGMwIDEuMS0uOSAyLTIgMnMtMi0uOS0yLTIgLjktMiAyLTIgMiAuOSAyIDJ6bS04IDBjMCAxLjEtLjkgMi0yIDJzLTItLjktMi0yIC45LTIgMi0yIDIgLjkgMiAyeiIgZmlsbC1vcGFjaXR5PSIuMyIgZmlsbD0iIzQ0NCIvPjwvZz48L3N2Zz4=')] bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-4">
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to Home
        </Link>

        <Card className="bg-white/95 shadow-xl border-0">
          <CardHeader className="text-center pt-8 pb-6">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2">
              <LogIn className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">
              Welcome Back
            </CardTitle>
            <p className="text-gray-600 mt-1">
              Sign in to your AgriBridge NE account
            </p>
          </CardHeader>
          
          <CardContent className="space-y-4 pb-8">
            {error && (
              <div className="p-3 rounded-md bg-red-50 text-red-700 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2" />
                {error}
              </div>
            )}

            <div>
              <Label className="text-gray-700 mb-2 block">Select Your Role</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  type="button"
                  className={`flex items-center justify-center py-2 border ${getRoleButtonStyle("farmer")}`}
                  onClick={() => setSelectedRole("farmer")}
                >
                  <Leaf className="h-4 w-4 mr-2" /> Farmer
                </Button>
                <Button
                  type="button"
                  className={`flex items-center justify-center py-2 border ${getRoleButtonStyle("admin")}`}
                  onClick={() => setSelectedRole("admin")}
                >
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Admin
                </Button>
                <Button
                  type="button"
                  className={`flex items-center justify-center py-2 border ${getRoleButtonStyle("buyer")}`}
                  onClick={() => setSelectedRole("buyer")}
                >
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Buyer
                </Button>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-700">
                  {selectedRole === "farmer" ? "Farmer ID" : "Email"}
                </Label>
                <Input
                  id="username"
                  placeholder={selectedRole === "farmer" ? "Enter your Farmer ID" : "your@email.com"}
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="border-gray-300 focus:border-gray-400 bg-white"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-gray-700">Password</Label>
                  {(selectedRole === "admin" || selectedRole === "buyer") && (
                    <span className="text-sm text-blue-600 hover:underline cursor-pointer">
                      Forgot password?
                    </span>
                  )}
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-gray-300 focus:border-gray-400 bg-white pr-10"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className={`w-full py-2 mt-2 flex items-center justify-center ${getLoginButtonStyle()}`}
              >
                Login <LogIn className="ml-2 h-4 w-4" />
              </Button>
              
              {selectedRole === "farmer" ? (
                <div className="text-center text-sm text-gray-600 mt-4">
                  <span>New farmer? </span>
                  <Link to="/farmer-registration" className="text-green-600 hover:text-green-800 hover:underline font-medium">
                    Register here
                  </Link>
                </div>
              ) : (
                <div className="text-center text-sm text-gray-600 mt-4">
                  Don't have an account? <span className="text-blue-600 hover:underline cursor-pointer">Contact administrator</span>
                </div>
              )}
            </form>
            
            <div className="mt-6 border-t border-gray-200 pt-4">
              <p className="text-xs text-center text-gray-500 mb-2">Demo Credentials:</p>
              <div className="grid grid-cols-3 gap-2 text-xs text-center">
                <div className="bg-gray-50 p-2 rounded">
                  <p className="font-medium">Farmer</p>
                  <p>ID: [registered ID]</p>
                  <p>Password: farmer</p>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <p className="font-medium">Admin</p>
                  <p>Email: admin@gmail.com</p>
                  <p>Password: admin</p>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <p className="font-medium">Buyer</p>
                  <p>Email: buyer</p>
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

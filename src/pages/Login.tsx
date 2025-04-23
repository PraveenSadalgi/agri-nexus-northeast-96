import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { LogIn, UserPlus, ChevronLeft, Tractor, Users, Store } from "lucide-react";

type UserRole = "farmer" | "admin" | "buyer";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [farmerId, setFarmerId] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("farmer");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedRole === "farmer") {
      if (!farmerId) {
        toast.error("Please enter your Farmer ID");
        return;
      }
      
      // For prototype: Check if farmer exists in localStorage
      const farmer = localStorage.getItem(farmerId);
      if (farmer) {
        toast.success("Login successful!");
        navigate("/farmer-dashboard");
      } else {
        toast.error("Invalid Farmer ID");
      }
      return;
    }
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    // For prototype, redirect based on role
    switch (selectedRole) {
      case "admin":
        navigate("/admin-dashboard");
        break;
      case "buyer":
        navigate("/buyer-dashboard");
        break;
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "farmer": return <Tractor className="h-5 w-5" />;
      case "admin": return <Users className="h-5 w-5" />;
      case "buyer": return <Store className="h-5 w-5" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIj48cGF0aCBkPSJNMzYgMzRjMCAxLjEtLjkgMi0yIDJzLTItLjktMi0yIC45LTIgMi0yIDIgLjkgMiAyem0tOCAwYzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptLTggMGMwIDEuMS0uOSAyLTIgMnMtMi0uOS0yLTIgLjktMiAyLTIgMiAuOSAyIDJ6bS04IDBjMCAxLjEtLjkgMi0yIDJzLTItLjktMi0yIC45LTIgMi0yIDIgLjkgMiAyem0tOCAwYzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptLTggMGMwIDEuMS0uOSAyLTIgMnMtMi0uOS0yLTIgLjktMiAyLTIgMiAuOSAyIDJ6bTI0LThjMCAxLjEtLjkgMi0yIDJzLTItLjktMi0yIC45LTIgMi0yIDIgLjkgMiAyeiIgZmlsbC1vcGFjaXR5PSIuMyIgZmlsbD0iIzQ0NCIvPjxwYXRoIGQ9Ik00NCAyNGMwIDEuMS0uOSAyLTIgMnMtMi0uOS0yLTIgLjktMiAyLTIgMiAuOSAyIDJ6bS04IDBjMCAxLjEtLjkgMi0yIDJzLTItLjktMi0yIC45LTIgMi0yIDIgLjkgMiAyem0tOCAwYzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptLTggMGMwIDEuMS0uOSAyLTIgMnMtMi0uOS0yLTIgLjktMiAyLTIgMiAuOSAyIDJ6bS04IDBjMCAxLjEtLjkgMi0yIDJzLTItLjktMi0yIC45LTIgMi0yIDIgLjkgMiAyeiIgZmlsbC1vcGFjaXR5PSIuMyIgZmlsbD0iIzQ0NCIvPjwvZz48L3N2Zz4=')] bg-agri-50/95 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center text-agri-600 hover:text-agri-700 mb-6 transition-colors">
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to Home
        </Link>
        
        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
          <CardHeader className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-agri-100 to-agri-200 text-agri-600 flex items-center justify-center mx-auto">
              <LogIn className="h-8 w-8" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-br from-agri-800 to-agri-600 bg-clip-text text-transparent">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-agri-600">Sign in to your AgriBridge NE account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="role" className="text-agri-700">Select Your Role</Label>
                <div className="grid grid-cols-3 gap-4">
                  {["farmer", "admin", "buyer"].map((role) => (
                    <Button
                      key={role}
                      type="button"
                      variant={selectedRole === role ? "default" : "outline"}
                      onClick={() => setSelectedRole(role as UserRole)}
                      className={`capitalize flex items-center justify-center gap-2 transition-all duration-200 ${
                        selectedRole === role ? 
                          (role === "farmer" ? "bg-gradient-to-r from-agri-600 to-agri-700 hover:from-agri-700 hover:to-agri-800" : 
                           role === "admin" ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800" :
                           "bg-gradient-to-r from-earth-500 to-earth-600 hover:from-earth-600 hover:to-earth-700") 
                          : "border-agri-200 hover:bg-agri-50"
                      }`}
                    >
                      {getRoleIcon(role)}
                      {role}
                    </Button>
                  ))}
                </div>
              </div>

              {selectedRole === "farmer" ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="farmerId" className="text-agri-700">Farmer ID</Label>
                    <Input
                      id="farmerId"
                      type="text"
                      placeholder="Enter your Farmer ID"
                      value={farmerId}
                      onChange={(e) => setFarmerId(e.target.value)}
                      required
                      className="border-agri-200 focus:border-agri-500 focus:ring-agri-500 bg-white/50"
                    />
                  </div>
                  <div className="text-center">
                    <Link to="/farmer-registration" className="text-sm text-agri-700 hover:text-agri-800 hover:underline font-medium">
                      New farmer? Register here
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-agri-700">Email</Label>
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

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-agri-700">Password</Label>
                      <a href="#" className="text-xs text-agri-700 hover:text-agri-800 hover:underline font-medium">
                        Forgot password?
                      </a>
                    </div>
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
                </>
              )}

              <Button 
                type="submit" 
                className={`w-full shadow-lg hover:shadow-xl transition-all duration-200 ${
                  selectedRole === "farmer" ? "bg-gradient-to-r from-agri-600 to-agri-700 hover:from-agri-700 hover:to-agri-800" : 
                  selectedRole === "admin" ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800" :
                  "bg-gradient-to-r from-earth-500 to-earth-600 hover:from-earth-600 hover:to-earth-700"
                }`}
              >
                Login <LogIn className="ml-2 h-4 w-4" />
              </Button>
              
              {selectedRole !== "farmer" && (
                <div className="text-center text-sm text-agri-600">
                  Don't have an account?{" "}
                  <a href="#" className="text-agri-700 hover:text-agri-800 hover:underline font-medium">
                    Contact administrator
                  </a>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;

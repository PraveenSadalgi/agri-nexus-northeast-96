
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
    <div className="min-h-screen bg-gradient-to-b from-agri-50 to-agri-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center text-agri-600 hover:text-agri-700 mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to Home
        </Link>
        
        <Card className="border-agri-200 shadow-lg">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 rounded-full bg-agri-100 text-agri-600 flex items-center justify-center mx-auto mb-4">
              <LogIn className="h-8 w-8" />
            </div>
            <CardTitle className="text-2xl font-bold text-agri-800">Welcome Back</CardTitle>
            <CardDescription>Sign in to your AgriBridge NE account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="role" className="text-gray-700">Select Your Role</Label>
                <div className="grid grid-cols-3 gap-4">
                  {["farmer", "admin", "buyer"].map((role) => (
                    <Button
                      key={role}
                      type="button"
                      variant={selectedRole === role ? "default" : "outline"}
                      onClick={() => setSelectedRole(role as UserRole)}
                      className={`capitalize flex items-center justify-center gap-2 ${
                        selectedRole === role ? 
                          (role === "farmer" ? "bg-agri-600 hover:bg-agri-700" : 
                           role === "admin" ? "bg-blue-600 hover:bg-blue-700" :
                           "bg-earth-500 hover:bg-earth-600") 
                          : "border-gray-300"
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
                    <Label htmlFor="farmerId" className="text-gray-700">Farmer ID</Label>
                    <Input
                      id="farmerId"
                      type="text"
                      placeholder="Enter your Farmer ID"
                      value={farmerId}
                      onChange={(e) => setFarmerId(e.target.value)}
                      required
                      className="border-gray-300 focus:border-agri-500 focus:ring-agri-500"
                    />
                  </div>
                  <div className="text-center">
                    <Link to="/farmer-registration" className="text-sm text-agri-600 hover:text-agri-700 hover:underline">
                      New farmer? Register here
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="border-gray-300 focus:border-agri-500 focus:ring-agri-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-gray-700">Password</Label>
                      <a href="#" className="text-xs text-agri-600 hover:text-agri-700 hover:underline">
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
                      className="border-gray-300 focus:border-agri-500 focus:ring-agri-500"
                    />
                  </div>
                </>
              )}

              <Button 
                type="submit" 
                className={`w-full ${
                  selectedRole === "farmer" ? "btn-agri" : 
                  selectedRole === "admin" ? "bg-blue-600 hover:bg-blue-700" :
                  "btn-earth"
                }`}
              >
                Login <LogIn className="ml-2 h-4 w-4" />
              </Button>
              
              {selectedRole !== "farmer" && (
                <div className="text-center text-sm text-gray-600">
                  Don't have an account?{" "}
                  <a href="#" className="text-agri-600 hover:text-agri-700 hover:underline">
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


import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { LogIn, UserPlus } from "lucide-react";

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

    // Handle admin login
    if (selectedRole === "admin") {
      if (email === "admin@gmail.com" && password === "admin") {
        toast.success("Admin login successful!");
        navigate("/admin-dashboard");
      } else {
        toast.error("Invalid admin credentials");
      }
      return;
    }
    
    // Handle buyer login - for now just redirect
    if (selectedRole === "buyer") {
      navigate("/buyer-dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome to AgriBridge NE</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="role">Select Role</Label>
              <div className="grid grid-cols-3 gap-4">
                {["farmer", "admin", "buyer"].map((role) => (
                  <Button
                    key={role}
                    type="button"
                    variant={selectedRole === role ? "default" : "outline"}
                    onClick={() => setSelectedRole(role as UserRole)}
                    className="capitalize"
                  >
                    {role}
                  </Button>
                ))}
              </div>
            </div>

            {selectedRole === "farmer" ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="farmerId">Farmer ID</Label>
                  <Input
                    id="farmerId"
                    type="text"
                    placeholder="Enter your Farmer ID"
                    value={farmerId}
                    onChange={(e) => setFarmerId(e.target.value)}
                    required
                  />
                </div>
                <div className="text-center">
                  <Link to="/farmer-registration" className="text-sm text-blue-600 hover:underline">
                    New farmer? Register here
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </>
            )}

            <Button type="submit" className="w-full">
              Login <LogIn className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;

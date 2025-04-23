
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { LogIn, User, Building, UserRound, ArrowLeft } from "lucide-react";

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

    if (selectedRole === "admin") {
      if (email === "admin@gmail.com" && password === "admin") {
        toast.success("Admin login successful!");
        navigate("/admin-dashboard");
      } else {
        toast.error("Invalid admin credentials");
      }
      return;
    }
    
    if (selectedRole === "buyer") {
      navigate("/buyer-dashboard");
    }
  };

  const getRoleButtonColor = (role: UserRole) => {
    if (role === selectedRole) {
      switch (role) {
        case "farmer":
          return "bg-emerald-600 hover:bg-emerald-700";
        case "admin":
          return "bg-blue-600 hover:bg-blue-700";
        case "buyer":
          return "bg-amber-600 hover:bg-amber-700";
      }
    }
    return "bg-white text-gray-700 hover:bg-gray-100";
  };

  const getLoginButtonColor = () => {
    switch (selectedRole) {
      case "farmer":
        return "bg-emerald-600 hover:bg-emerald-700 w-full";
      case "admin":
        return "bg-blue-600 hover:bg-blue-700 w-full";
      case "buyer":
        return "bg-amber-600 hover:bg-amber-700 w-full";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center text-gray-600 mb-8 hover:text-gray-800">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
        
        <Card className="w-full">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto bg-green-100 p-3 rounded-full">
              <LogIn className="h-6 w-6 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Welcome Back</h2>
            <p className="text-gray-500 text-sm">Sign in to your AgriBridge NE account</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label>Select Your Role</Label>
                <div className="grid grid-cols-3 gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className={getRoleButtonColor("farmer")}
                    onClick={() => setSelectedRole("farmer")}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Farmer
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className={getRoleButtonColor("admin")}
                    onClick={() => setSelectedRole("admin")}
                  >
                    <UserRound className="mr-2 h-4 w-4" />
                    Admin
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className={getRoleButtonColor("buyer")}
                    onClick={() => setSelectedRole("buyer")}
                  >
                    <Building className="mr-2 h-4 w-4" />
                    Buyer
                  </Button>
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
                    <div className="flex justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link to="#" className="text-sm text-blue-600 hover:underline">
                        Forgot password?
                      </Link>
                    </div>
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

              <Button type="submit" className={getLoginButtonColor()}>
                Login <LogIn className="ml-2 h-4 w-4" />
              </Button>

              {(selectedRole === "admin" || selectedRole === "buyer") && (
                <p className="text-center text-sm text-gray-500">
                  Don't have an account?{" "}
                  <Link to="#" className="text-sm font-semibold text-blue-600 hover:underline">
                    Contact administrator
                  </Link>
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;


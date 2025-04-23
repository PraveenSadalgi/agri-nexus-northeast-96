
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { LogIn, User, Building, UserRound, ArrowLeft, Farm, Tractor, Wheat } from "lucide-react";

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
        localStorage.setItem("currentFarmerName", JSON.parse(farmer).name || "Anonymous");
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

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case "farmer":
        return <Tractor className="mr-2 h-4 w-4" />;
      case "admin":
        return <UserRound className="mr-2 h-4 w-4" />;
      case "buyer":
        return <Building className="mr-2 h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-green-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center text-gray-600 mb-8 hover:text-gray-800">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
        
        <Card className="w-full border-green-200 shadow-lg">
          <CardHeader className="text-center space-y-2 bg-gradient-to-b from-green-50 to-emerald-100 rounded-t-lg">
            <div className="mx-auto bg-green-100 p-3 rounded-full border-2 border-green-200">
              <Farm className="h-6 w-6 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-semibold text-green-800">Welcome to AgriBridge NE</h2>
            <p className="text-gray-600 text-sm">Sign in to access your agricultural dashboard</p>
          </CardHeader>
          <CardContent className="bg-white rounded-b-lg pt-6">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-green-700">Select Your Role</Label>
                <div className="grid grid-cols-3 gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className={getRoleButtonColor("farmer")}
                    onClick={() => setSelectedRole("farmer")}
                  >
                    <Tractor className="mr-2 h-4 w-4" />
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
                    <Wheat className="mr-2 h-4 w-4" />
                    Buyer
                  </Button>
                </div>
              </div>

              {selectedRole === "farmer" ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="farmerId" className="text-green-700">Farmer ID</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                      <Input
                        id="farmerId"
                        type="text"
                        placeholder="Enter your Farmer ID"
                        value={farmerId}
                        onChange={(e) => setFarmerId(e.target.value)}
                        className="pl-10 bg-green-50 border-green-200"
                        required
                      />
                    </div>
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
                    <Label htmlFor="email" className="text-green-700">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-green-50 border-green-200"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="password" className="text-green-700">Password</Label>
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
                      className="bg-green-50 border-green-200"
                      required
                    />
                  </div>
                </>
              )}

              <Button type="submit" className={`${getLoginButtonColor()} shadow-md`}>
                Login {getRoleIcon(selectedRole)} <LogIn className="ml-2 h-4 w-4" />
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

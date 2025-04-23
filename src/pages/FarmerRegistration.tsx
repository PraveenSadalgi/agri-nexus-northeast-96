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
    <div className="min-h-screen bg-gradient-to-b from-agri-50 to-agri-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/login" className="inline-flex items-center text-agri-600 hover:text-agri-700 mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to Login
        </Link>
        
        <Card className="border-agri-200 shadow-lg">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 rounded-full bg-agri-100 text-agri-600 flex items-center justify-center mx-auto mb-4">
              <Leaf className="h-8 w-8" />
            </div>
            <CardTitle className="text-2xl font-bold text-agri-800">Farmer Registration</CardTitle>
            <CardDescription>Join the AgriBridge NE community</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700">Full Name <span className="text-red-500">*</span></Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="border-gray-300 focus:border-agri-500 focus:ring-agri-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email <span className="text-red-500">*</span></Label>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700">Password <span className="text-red-500">*</span></Label>
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

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-700">Confirm Password <span className="text-red-500">*</span></Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="border-gray-300 focus:border-agri-500 focus:ring-agri-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="territory" className="text-gray-700">Territory <span className="text-red-500">*</span></Label>
                <Select value={territory} onValueChange={setTerritory} required>
                  <SelectTrigger className="w-full border-gray-300 focus:border-agri-500 focus:ring-agri-500">
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
                <Button type="submit" className="w-full btn-agri">
                  Register as Farmer <UserPlus className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="text-center text-sm text-gray-600 mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-agri-600 hover:text-agri-700 hover:underline">
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


import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, LogIn, Leaf, Truck, BarChart3, SunMoon } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-agri-50 to-agri-100">
      {/* Hero Section */}
      <section className="relative bg-farm-pattern py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6 max-w-3xl mx-auto animate-fade-in">
            <div className="inline-block p-2 px-4 bg-agri-100 rounded-full text-agri-700 font-medium text-sm mb-4">
              <Leaf className="inline-block w-4 h-4 mr-2 stroke-agri-600" />
              <span>Connecting Northeast India's Agricultural Ecosystem</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold hero-text">
              AgriBridge NE
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Empowering farmers, buyers, and administrators with smart agricultural solutions tailored for Northeast India.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button size="lg" className="btn-agri" asChild>
                <Link to="/login">
                  Login <LogIn className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-agri-500 text-agri-700 hover:bg-agri-50" asChild>
                <Link to="/farmer-registration">
                  Register as Farmer <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-agri-50 to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-agri-800 mb-4">How AgriBridge NE Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">A comprehensive platform connecting all stakeholders in the agricultural ecosystem of Northeast India.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="agri-card overflow-hidden border-agri-200 hover:border-agri-300 hover:-translate-y-1">
            <div className="h-2 bg-agri-600"></div>
            <CardContent className="pt-6">
              <div className="rounded-full bg-agri-100 w-12 h-12 flex items-center justify-center mb-4">
                <Leaf className="h-6 w-6 text-agri-600" />
              </div>
              <h3 className="font-semibold text-xl mb-2 text-agri-800">For Farmers</h3>
              <p className="text-gray-600">
                Get crop recommendations, weather updates, and connect with buyers directly. Manage your farming operations efficiently.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link to="/login" className="text-agri-600 hover:text-agri-700 font-medium inline-flex items-center">
                  Login as Farmer <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="agri-card overflow-hidden border-earth-200 hover:border-earth-300 hover:-translate-y-1">
            <div className="h-2 bg-earth-500"></div>
            <CardContent className="pt-6">
              <div className="rounded-full bg-earth-100 w-12 h-12 flex items-center justify-center mb-4">
                <Truck className="h-6 w-6 text-earth-600" />
              </div>
              <h3 className="font-semibold text-xl mb-2 text-earth-800">For Buyers</h3>
              <p className="text-gray-600">
                Access fresh, locally-sourced produce and connect directly with farmers in your region. Find the best quality agricultural products.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link to="/login" className="text-earth-600 hover:text-earth-700 font-medium inline-flex items-center">
                  Login as Buyer <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="agri-card overflow-hidden border-agri-200 hover:border-agri-300 hover:-translate-y-1">
            <div className="h-2 bg-agri-600"></div>
            <CardContent className="pt-6">
              <div className="rounded-full bg-agri-100 w-12 h-12 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-agri-600" />
              </div>
              <h3 className="font-semibold text-xl mb-2 text-agri-800">For Admins</h3>
              <p className="text-gray-600">
                Manage crop allocations, monitor farming activities, and optimize supply chains. Make data-driven decisions for better outcomes.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link to="/login" className="text-agri-600 hover:text-agri-700 font-medium inline-flex items-center">
                  Login as Admin <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 leaf-pattern">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-10 text-agri-800">Why Choose AgriBridge NE</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="w-10 h-10 rounded-full bg-agri-100 flex items-center justify-center">
                    <SunMoon className="h-5 w-5 text-agri-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Real-time Weather Updates</h3>
                  <p className="text-gray-600">Access current weather information to plan your farming activities effectively.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="w-10 h-10 rounded-full bg-agri-100 flex items-center justify-center">
                    <Leaf className="h-5 w-5 text-agri-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Crop Management</h3>
                  <p className="text-gray-600">Track and manage your crops from sowing to harvest with detailed analytics.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="w-10 h-10 rounded-full bg-agri-100 flex items-center justify-center">
                    <Truck className="h-5 w-5 text-agri-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Transport Management</h3>
                  <p className="text-gray-600">Efficiently handle crop transportation from farms to markets or storage facilities.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="w-10 h-10 rounded-full bg-agri-100 flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-agri-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Data-Driven Insights</h3>
                  <p className="text-gray-600">Get valuable insights based on historical data to improve farm productivity.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Button className="btn-agri px-8" size="lg" asChild>
                <Link to="/login">Get Started Today</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-agri-800 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold">AgriBridge NE</h2>
              <p className="text-agri-200 mt-2">Connecting Northeast India's Agricultural Ecosystem</p>
            </div>
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 text-center md:text-left">
              <Link to="/login" className="text-white hover:text-agri-300">Login</Link>
              <Link to="/farmer-registration" className="text-white hover:text-agri-300">Register</Link>
              <a href="#" className="text-white hover:text-agri-300">About Us</a>
              <a href="#" className="text-white hover:text-agri-300">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-agri-700 text-center text-agri-300 text-sm">
            © {new Date().getFullYear()} AgriBridge NE. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

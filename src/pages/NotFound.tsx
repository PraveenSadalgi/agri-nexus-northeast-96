
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-agri-50 to-agri-100 p-4">
      <div className="text-center max-w-md animate-fade-in">
        <div className="mx-auto w-20 h-20 flex items-center justify-center bg-red-100 rounded-full mb-6">
          <AlertTriangle size={40} className="text-red-500" />
        </div>
        <h1 className="text-6xl font-bold text-agri-800 mb-2">404</h1>
        <p className="text-2xl text-gray-600 mb-6">Page Not Found</p>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button className="btn-agri" asChild>
          <Link to="/" className="inline-flex items-center">
            <Home className="mr-2 h-4 w-4" /> Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

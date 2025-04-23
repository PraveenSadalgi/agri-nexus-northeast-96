
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper, ChevronRight, Sprout, CloudRain, Sun, Tractor, Wheat, Leaf } from "lucide-react";

interface NewsItem {
  title: string;
  summary: string;
  date: string;
  icon: string;
  category?: string;
}

const NewsFeed = () => {
  const [news, setNews] = useState<NewsItem[]>([
    {
      title: "Sustainable Farming Practices",
      summary: "New techniques for eco-friendly agriculture gaining traction among farmers in the Northeast.",
      date: "2025-04-22",
      icon: "sprout",
      category: "Sustainability"
    },
    {
      title: "Weather-Resistant Crops",
      summary: "Research reveals promising developments in climate-adaptive farming for monsoon season.",
      date: "2025-04-21",
      icon: "cloud-rain",
      category: "Research"
    },
    {
      title: "Agricultural Market Trends",
      summary: "Latest market analysis shows increasing demand for organic produce from Northeast farms.",
      date: "2025-04-20",
      icon: "sun",
      category: "Markets"
    },
    {
      title: "New Farming Equipment",
      summary: "Government subsidies announced for modern farming equipment for small-scale farmers.",
      date: "2025-04-19",
      icon: "tractor",
      category: "Equipment"
    },
    {
      title: "Crop Disease Prevention",
      summary: "New biological methods to prevent common crop diseases without harmful chemicals.",
      date: "2025-04-18",
      icon: "leaf",
      category: "Health"
    },
    {
      title: "Northeast Wheat Varieties",
      summary: "Local wheat varieties showing excellent resilience to changing climate conditions.",
      date: "2025-04-17",
      icon: "wheat",
      category: "Crops"
    }
  ]);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "sprout":
        return <Sprout className="h-4 w-4 text-emerald-600" />;
      case "cloud-rain":
        return <CloudRain className="h-4 w-4 text-blue-600" />;
      case "sun":
        return <Sun className="h-4 w-4 text-amber-500" />;
      case "tractor":
        return <Tractor className="h-4 w-4 text-amber-700" />;
      case "wheat":
        return <Wheat className="h-4 w-4 text-amber-600" />;
      case "leaf":
        return <Leaf className="h-4 w-4 text-green-600" />;
      default:
        return <Newspaper className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <Card className="h-full bg-gradient-to-br from-amber-50 to-green-50 border-amber-100 shadow-md hover:shadow-lg transition-shadow overflow-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-amber-100 sticky top-0 bg-gradient-to-r from-amber-50 to-green-50 z-10">
        <CardTitle className="text-md font-medium text-amber-800">
          <div className="flex items-center gap-2">
            <Newspaper className="h-4 w-4" />
            Agricultural News
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 max-h-[500px] overflow-auto">
        <div className="divide-y divide-amber-100">
          {news.map((item, index) => (
            <div key={index} className="p-3 hover:bg-amber-50 transition cursor-pointer group">
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-2">
                  {getIcon(item.icon)}
                  <h3 className="font-medium text-sm text-amber-900 group-hover:text-amber-700">{item.title}</h3>
                </div>
                {item.category && (
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">{item.category}</span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1 pl-6">{item.summary}</p>
              <div className="flex items-center justify-between mt-2 pl-6">
                <span className="text-xs text-gray-500">{item.date}</span>
                <ChevronRight className="h-4 w-4 text-amber-500 opacity-0 group-hover:opacity-100 transition" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsFeed;

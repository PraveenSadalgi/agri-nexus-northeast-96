
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper, ChevronRight, Sprout, CloudRain, Sun, Tractor } from "lucide-react";

interface NewsItem {
  title: string;
  summary: string;
  date: string;
  icon: string;
}

const NewsFeed = () => {
  const [news, setNews] = useState<NewsItem[]>([
    {
      title: "Sustainable Farming Practices",
      summary: "New techniques for eco-friendly agriculture gaining traction among farmers in the Northeast.",
      date: "2025-04-22",
      icon: "sprout"
    },
    {
      title: "Weather-Resistant Crops",
      summary: "Research reveals promising developments in climate-adaptive farming for monsoon season.",
      date: "2025-04-21",
      icon: "cloud-rain"
    },
    {
      title: "Agricultural Market Trends",
      summary: "Latest market analysis shows increasing demand for organic produce from Northeast farms.",
      date: "2025-04-20",
      icon: "sun"
    },
    {
      title: "New Farming Equipment",
      summary: "Government subsidies announced for modern farming equipment for small-scale farmers.",
      date: "2025-04-19",
      icon: "tractor"
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
        return <Tractor className="h-4 w-4 text-brown-600" />;
      default:
        return <Newspaper className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <Card className="h-full bg-gradient-to-br from-amber-50 to-green-50 border-amber-100">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-amber-100">
        <CardTitle className="text-md font-medium text-amber-800">
          <div className="flex items-center gap-2">
            <Newspaper className="h-4 w-4" />
            Agricultural News
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-amber-100">
          {news.map((item, index) => (
            <div key={index} className="p-3 hover:bg-amber-50 transition cursor-pointer group">
              <div className="flex items-center gap-2 mb-1">
                {getIcon(item.icon)}
                <h3 className="font-medium text-sm text-amber-900 group-hover:text-amber-700">{item.title}</h3>
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

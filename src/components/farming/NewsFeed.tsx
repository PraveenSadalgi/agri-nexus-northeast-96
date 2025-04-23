
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper, ExternalLink } from "lucide-react";

interface NewsItem {
  title: string;
  summary: string;
  date: string;
  link?: string;
}

const NewsFeed = () => {
  const [news, setNews] = useState<NewsItem[]>([
    {
      title: "Sustainable Farming Practices Gain Traction",
      summary: "New techniques for eco-friendly agriculture gaining traction among farmers in Northeast India.",
      date: "2025-04-22",
      link: "#"
    },
    {
      title: "Weather-Resistant Crops Development",
      summary: "Research reveals promising developments in climate-adaptive farming for the region's unpredictable weather.",
      date: "2025-04-21",
      link: "#"
    },
    {
      title: "Agricultural Market Trends 2025",
      summary: "Latest market analysis shows increasing demand for organic produce from Northeast states.",
      date: "2025-04-20",
      link: "#"
    },
    {
      title: "Government Announces New Farmer Benefits",
      summary: "Ministry of Agriculture releases new incentives for small-scale farmers in Northeast region.",
      date: "2025-04-18",
      link: "#"
    }
  ]);

  return (
    <Card className="h-full border-agri-200">
      <CardHeader className="bg-agri-600 text-white py-3 px-4">
        <CardTitle className="text-md flex items-center">
          <Newspaper className="h-4 w-4 mr-2" />
          Agricultural News
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-gray-100">
          {news.map((item, index) => (
            <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
              <h3 className="font-medium text-agri-700">{item.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{item.summary}</p>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-xs text-gray-500">{item.date}</span>
                {item.link && (
                  <a href={item.link} className="text-xs text-agri-600 hover:text-agri-700 flex items-center">
                    Read more <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsFeed;

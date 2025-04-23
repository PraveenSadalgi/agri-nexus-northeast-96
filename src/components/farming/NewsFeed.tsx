
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper } from "lucide-react";

interface NewsItem {
  title: string;
  summary: string;
  date: string;
}

const NewsFeed = () => {
  const [news, setNews] = useState<NewsItem[]>([
    {
      title: "Sustainable Farming Practices",
      summary: "New techniques for eco-friendly agriculture gaining traction among farmers.",
      date: "2025-04-22"
    },
    {
      title: "Weather-Resistant Crops",
      summary: "Research reveals promising developments in climate-adaptive farming.",
      date: "2025-04-21"
    },
    {
      title: "Agricultural Market Trends",
      summary: "Latest market analysis shows increasing demand for organic produce.",
      date: "2025-04-20"
    }
  ]);

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-md font-medium">
          <div className="flex items-center gap-2">
            <Newspaper className="h-4 w-4" />
            Farming News
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {news.map((item, index) => (
            <div key={index} className="border-b pb-3 last:border-0">
              <h3 className="font-medium text-sm">{item.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{item.summary}</p>
              <span className="text-xs text-gray-500 mt-1 block">{item.date}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsFeed;

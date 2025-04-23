
import React, { useEffect, useState } from "react";
import { SunMoon, CloudRain, CloudSun, Cloud } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Replace with your preferred location or allow a user setting.
const LOCATION = "Guwahati";

type WeatherData = {
  temperature: number;
  description: string;
  icon: React.ReactNode;
};

const WeatherForecast: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Get icon based on description
  const getWeatherIcon = (desc: string) => {
    const lowerDesc = desc.toLowerCase();
    if (lowerDesc.includes('rain') || lowerDesc.includes('shower')) {
      return <CloudRain className="w-10 h-10 text-blue-500" />;
    } else if (lowerDesc.includes('cloud')) {
      return <Cloud className="w-10 h-10 text-gray-500" />;
    } else if (lowerDesc.includes('partly')) {
      return <CloudSun className="w-10 h-10 text-amber-500" />;
    } else {
      return <SunMoon className="w-10 h-10 text-amber-500" />;
    }
  };

  useEffect(() => {
    setLoading(true);
    // For demo: Open-Meteo API (free & no API key needed) 
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=26.18&longitude=91.75&current_weather=true"
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.current_weather) {
          const description = "Partly cloudy"; // Open-Meteo doesn't give text desc, demo-only
          setWeather({
            temperature: data.current_weather.temperature,
            description: description,
            icon: getWeatherIcon(description),
          });
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to fetch weather data.");
        setLoading(false);
      });
  }, []);

  return (
    <Card className="overflow-hidden border-agri-200">
      <CardHeader className="bg-agri-600 text-white py-3 px-4">
        <CardTitle className="text-md flex items-center">
          <SunMoon className="h-4 w-4 mr-2" />
          Weather Forecast ({LOCATION})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {error && <span className="text-red-600 text-sm">{error}</span>}
        {loading && (
          <div className="flex items-center justify-center h-24">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-agri-600"></div>
          </div>
        )}
        {weather && !loading && (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {weather.icon}
              <div className="ml-4">
                <span className="text-xl font-bold text-gray-800">{weather.temperature}°C</span>
                <div className="text-gray-600 text-sm">{weather.description}</div>
              </div>
            </div>
            <div className="text-right text-sm text-gray-500">
              <div>Humidity: 68%</div>
              <div>Wind: 12 km/h</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherForecast;

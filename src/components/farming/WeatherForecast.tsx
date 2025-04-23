
import React, { useEffect, useState } from "react";
import { Sun, CloudSun, CloudRain, CloudSnow, CloudLightning, CloudFog, CloudDrizzle, CloudHail } from "lucide-react";

const WEATHER_API_KEY = "2e987e56e65c4ccdbad201409241804"; // Demo API key for WeatherAPI.com (replace with your own or allow farmer to enter location)
const LOCATION = "Guwahati,IN"; // For demo, display weather for NE India main city

const iconMap: { [key: string]: React.ReactNode } = {
  "Sunny": <Sun className="inline ml-1" color="#fbbf24" />,
  "Clear": <Sun className="inline ml-1" color="#fbbf24" />,
  "Partly cloudy": <CloudSun className="inline ml-1" color="#eab308" />,
  "Cloudy": <CloudFog className="inline ml-1" color="#6b7280" />,
  "Mist": <CloudFog className="inline ml-1" color="#6b7280" />,
  "Patchy rain possible": <CloudRain className="inline ml-1" color="#38bdf8" />,
  "Light rain": <CloudDrizzle className="inline ml-1" color="#38bdf8" />,
  "Heavy rain": <CloudRain className="inline ml-1" color="#0ea5e9" />,
  "Thunderstorm": <CloudLightning className="inline ml-1" color="#ef4444" />,
  "Snow": <CloudSnow className="inline ml-1" color="#f1f5f9" />,
  "Hail": <CloudHail className="inline ml-1" color="#e0e7ff" />,
};

const WeatherForecast: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState<null | {
    temp: number;
    condition: string;
    location: string;
  }>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${LOCATION}&aqi=no`)
      .then(res => res.json())
      .then(data => {
        setWeather({
          temp: data.current.temp_c,
          condition: data.current.condition.text,
          location: data.location.name,
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      {loading && <div className="text-gray-500">Loading weather...</div>}
      {!loading && weather && (
        <div>
          <span className="font-semibold">{weather.location}</span>:{" "}
          <span className="font-bold">{weather.temp}&deg;C</span>{" "}
          <span>{weather.condition}</span>
          {iconMap[weather.condition] || <Sun className="inline ml-1" />}
        </div>
      )}
      {!loading && !weather && <div className="text-red-600">Weather unavailable</div>}
    </div>
  );
};

export default WeatherForecast;

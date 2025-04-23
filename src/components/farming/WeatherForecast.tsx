
import React, { useEffect, useState } from "react";

// Replace with your preferred location or allow a user setting.
const LOCATION = "Guwahati";

type WeatherData = {
  temperature: number;
  description: string;
  icon: string;
};

const WeatherForecast: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // For demo: Open-Meteo API (free & no API key needed) 
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=26.18&longitude=91.75&current_weather=true"
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.current_weather) {
          setWeather({
            temperature: data.current_weather.temperature,
            description: "Partly cloudy", // Open-Meteo doesn't give text desc, demo-only
            icon: "https://openweathermap.org/img/wn/03d.png", // placeholder cloud icon
          });
        }
      })
      .catch(() => setError("Unable to fetch weather data."));
  }, []);

  return (
    <div className="bg-blue-50 rounded p-4 mb-5 border max-w-sm">
      <h3 className="font-semibold mb-2">Current Weather ({LOCATION})</h3>
      {error && <span className="text-red-600 text-sm">{error}</span>}
      {weather ? (
        <div className="flex items-center gap-3">
          <img src={weather.icon} className="w-10 h-10" alt="Weather" />
          <div>
            <span className="text-xl font-bold">{weather.temperature}°C</span>
            <div className="text-gray-600 text-sm">{weather.description}</div>
          </div>
        </div>
      ) : (
        !error && <span className="text-gray-600 text-sm">Loading forecast...</span>
      )}
    </div>
  );
};

export default WeatherForecast;

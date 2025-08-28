import React, { useState } from "react";
import WeatherForm from "./components/WeatherForm";
import WeatherCard from "./components/WeatherCard";
import { Container, Typography } from "@mui/material";

function App() {
  const [weather, setWeather] = useState(null);

  const fetchWeather = async (city) => {
    try {
      // Simple geocoding for demo (default: London if city not found)
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
      );
      const geoData = await geoRes.json();

      if (!geoData.results) {
        alert("City not found!");
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const data = await res.json();

      setWeather({
        city: `${name}, ${country}`,
        temp: data.current_weather.temperature,
        wind: data.current_weather.windspeed,
        code: data.current_weather.weathercode,
      });
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  return (
    <Container className="p-5 text-center">
      <Typography variant="h3" gutterBottom>
        🌤️ Weather App
      </Typography>
      <WeatherForm onSearch={fetchWeather} />
      {weather && <WeatherCard weather={weather} />}
    </Container>
  );
}

export default App;

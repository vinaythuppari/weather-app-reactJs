import React, { useEffect, useMemo, useState } from "react";
import WeatherForm from "./components/WeatherForm";
import WeatherCard from "./components/WeatherCard";
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Skeleton,
} from "@mui/material";
import "./App.css";

function themeForCode(code) {
  // return background gradient + semantic name
  if (code === 0) return { name: "sunny", gradient: "linear-gradient(135deg,#FFE259,#FFA751)" }; // yellow/orange
  if ([1, 2, 3, 45, 48].includes(code))
    return { name: "cloudy", gradient: "linear-gradient(135deg,#bdc3c7,#2c3e50)" }; // grey
  if ([61, 63, 65, 80, 81, 82, 51, 53, 55, 56, 57].includes(code))
    return { name: "rainy", gradient: "linear-gradient(135deg,#5B86E5,#36D1DC)" }; // blue/teal
  if ([71, 73, 75, 77, 85, 86].includes(code))
    return { name: "snow", gradient: "linear-gradient(135deg,#E0EAFC,#CFDEF3)" }; // icy blue
  if ([95, 96, 99].includes(code))
    return { name: "storm", gradient: "linear-gradient(135deg,#434343,#000000)" }; // dark
  return { name: "default", gradient: "linear-gradient(135deg,#6dd5fa,#2980b9)" };
}

export default function App() {
  const [weather, setWeather] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const gradient = useMemo(() => {
    if (weather?.code != null) return themeForCode(weather.code).gradient;
    return "linear-gradient(135deg,#6dd5fa,#2980b9)";
  }, [weather]);

  useEffect(() => {
    // update background dynamically
    document.body.style.background = gradient;
    document.body.style.color = "white";
  }, [gradient]);

  const fetchWeather = async (city) => {
    setStatus("loading");
    setErrorMsg("");
    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          city
        )}`
      );
      if (!geoRes.ok) throw new Error("Geocoding request failed");
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        setStatus("error");
        setErrorMsg("Oops! We couldn’t find that city. Try again.");
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      if (!res.ok) throw new Error("Weather request failed");
      const data = await res.json();

      if (!data.current_weather) {
        setStatus("error");
        setErrorMsg("Weather data unavailable for this location.");
        return;
      }

      setWeather({
        city: `${name}${country ? ", " + country : ""}`,
        temp: data.current_weather.temperature,
        wind: data.current_weather.windspeed,
        code: data.current_weather.weathercode,
      });
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg("Something went wrong. Please check your connection and try again.");
    }
  };

  const isLoading = status === "loading";
  const isError = status === "error";

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateRows: "auto auto 1fr",
        alignItems: "start",
        justifyItems: "center",
        py: { xs: 4, md: 8 },
        px: { xs: 2, md: 4 },
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: 800,
          textAlign: "center",
          letterSpacing: 0.5,
          textShadow: "0 2px 10px rgba(0,0,0,0.25)",
        }}
      >
        🌤️ Weather App
      </Typography>

      <WeatherForm onSearch={fetchWeather} disabled={isLoading} />

      {/* Status messages */}
      <Box
        role="status"
        aria-live="polite"
        sx={{ width: "100%", display: "grid", justifyItems: "center", gap: 2 }}
      >
        {isLoading && (
          <Box
            sx={{
              width: "100%",
              maxWidth: 480,
              bgcolor: "rgba(255,255,255,0.12)",
              borderRadius: 4,
              p: 3,
              boxShadow: 4,
            }}
          >
            <Box sx={{ display: "grid", justifyItems: "center", gap: 2 }}>
              <CircularProgress />
              {/* skeleton to hint layout */}
              <Skeleton variant="text" height={40} />
              <Skeleton variant="rounded" height={80} />
            </Box>
          </Box>
        )}

        {isError && (
          <Alert
            severity="error"
            variant="filled"
            sx={{
              borderRadius: 3,
              width: "100%",
              maxWidth: 480,
              bgcolor: "rgba(244, 67, 54, 0.95)",
            }}
          >
            {errorMsg}
          </Alert>
        )}

        {status === "success" && weather && <WeatherCard weather={weather} />}
      </Box>
    </Container>
  );
}

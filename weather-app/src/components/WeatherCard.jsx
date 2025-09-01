import React from "react";
import { Card, CardContent, Typography, Stack, Chip } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import UmbrellaIcon from "@mui/icons-material/Umbrella";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import WaterDropIcon from "@mui/icons-material/WaterDrop";

function pickIcon(code) {
  // Open-Meteo weather code groups 
  if (code === 0) return <WbSunnyIcon fontSize="large" />;
  if ([1, 2, 3].includes(code)) return <CloudIcon fontSize="large" />;
  if ([45, 48].includes(code)) return <CloudIcon fontSize="large" />;
  if ([51, 53, 55, 56, 57].includes(code)) return <UmbrellaIcon fontSize="large" />;
  if ([61, 63, 65, 80, 81, 82].includes(code)) return <UmbrellaIcon fontSize="large" />;
  if ([71, 73, 75, 77, 85, 86].includes(code)) return <AcUnitIcon fontSize="large" />;
  if ([95, 96, 99].includes(code)) return <ThunderstormIcon fontSize="large" />;
  return <CloudIcon fontSize="large" />;
}

function describe(code) {
  const map = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Freezing drizzle",
    57: "Freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",
    77: "Snow grains",
    80: "Rain showers",
    81: "Rain showers",
    82: "Violent rain showers",
    85: "Snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm w/ hail",
    99: "Thunderstorm w/ heavy hail",
  };
  return map[code] ?? "Unknown";
}

export default function WeatherCard({ weather }) {
  return (
    <Card
      sx={{
        mx: "auto",
        width: "100%",
        maxWidth: 480,
        borderRadius: 4,
        boxShadow: 6,
        bgcolor: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(6px)",
      }}
    >
      <CardContent>
        <Stack spacing={1.5} alignItems="center" textAlign="center">
          <Typography component="h2" variant="h5" sx={{ fontWeight: 700 }}>
            {weather.city}
          </Typography>

          <Stack direction="row" spacing={1.5} alignItems="center">
            {pickIcon(weather.code)}
            <Typography variant="h3" sx={{ fontWeight: 800, lineHeight: 1 }}>
              {Math.round(weather.temp)}°C
            </Typography>
          </Stack>

          <Typography variant="body1" aria-label="Weather condition">
            {describe(weather.code)}
          </Typography>

          <Stack direction="row" spacing={1}>
            <Chip icon={<WaterDropIcon />} label={`Wind ${weather.wind} km/h`} />
            {/* <Chip label={`Code ${weather.code}`} variant="outlined" /> */}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

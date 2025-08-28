import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

function WeatherCard({ weather }) {
  return (
    <Card className="mx-auto" style={{ maxWidth: 400 }}>
      <CardContent>
        <Typography variant="h5">{weather.city}</Typography>
        <Typography variant="h6">🌡️ {weather.temp}°C</Typography>
        <Typography variant="body1">💨 Wind: {weather.wind} km/h</Typography>
        <Typography variant="body2">Weather Code: {weather.code}</Typography>
      </CardContent>
    </Card>
  );
}

export default WeatherCard;

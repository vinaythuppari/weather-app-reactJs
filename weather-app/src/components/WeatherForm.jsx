import React, { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";

export default function WeatherForm({ onSearch, disabled }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() === "") return;
    onSearch(city.trim());
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Search weather by city">
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1.5}
        justifyContent="center"
        sx={{ mb: 3 }}
      >
        <TextField
          label="Enter city"
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          inputProps={{ "aria-label": "City name" }}
          sx={{ bgcolor: "white", borderRadius: 2, minWidth: { xs: "100%", sm: 280 } }}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={disabled}
          sx={{ borderRadius: 2, px: 3, fontWeight: 700 }}
        >
          Search
        </Button>
      </Stack>
    </form>
  );
}

import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

function WeatherForm({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() === "") return;
    onSearch(city);
    setCity("");
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex justify-content-center mb-4">
      <TextField
        label="Enter city"
        variant="outlined"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="me-2"
      />
      <Button variant="contained" color="primary" type="submit">
        Search
      </Button>
    </form>
  );
}

export default WeatherForm;

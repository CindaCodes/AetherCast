import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Form({ onSearch }) {
  const [cityInput, setCityInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cityInput.trim() !== "") {
      console.log("Submitting:", cityInput);
      onSearch(cityInput.trim());
      setCityInput(""); // clears input
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex align-items-center">
      <input
        type="text"
        placeholder="Enter a city..."
        value={cityInput}
        onChange={(e) => setCityInput(e.target.value)}
        className="weather-input form-control"
      />
      <button type="submit" className="weather-button">
        Search
      </button>
    </form>
  );
}

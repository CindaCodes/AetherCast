import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Form({ onSearch }) {
  const [cityInput, setCityInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cityInput.trim() !== "") {
      console.log("Submitting:", cityInput);
      onSearch(cityInput.trim());
      setCityInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex align-items-center">
      <input
        className="weather-input form-control"
        onChange={(e) => setCityInput(e.target.value)}
        placeholder="Enter a city..."
        type="text"
        value={cityInput}
      />
      <button type="submit" className="weather-button">
        Search
      </button>
    </form>
  );
}

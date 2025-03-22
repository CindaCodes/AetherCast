import React from "react";
import "../Style/Humidity.css";

export default function Humidity({ humidity }) {
  const getLabel = (value) => {
    if (value < 30) return "Dry 🌵";
    if (value < 60) return "Comfortable 😊";
    if (value < 80) return "Sticky 😓";
    return "Humid 🥵";
  };

  const percent = Math.min(humidity, 100); // Cap at 100%
  const leftPosition = `${percent}%`;

  return (
    <div className="humidity-container">
      <div className="humidity-title">💧 Humidity</div>
      <div className="humidity-value">{humidity}%</div>
      <div className="humidity-label">{getLabel(humidity)}</div>

      <div className="humidity-bar">
        <div
          className="humidity-indicator"
          style={{ left: leftPosition }}
        ></div>
      </div>
    </div>
  );
}

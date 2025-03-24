import React from "react";
import "../Style/Visibility.css"; /* Assuming you put the CSS in this file */

const VisibilityGauge = ({ visibility }) => {
  // Ensure visibility is within 0 – 10000 m (OpenWeather's max is 10 km)
  const visMeters = Math.max(0, Math.min(visibility, 10000));
  const percent = (visMeters / 10000) * 100;

  // Format the visibility value for display (m or km)
  const visibilityKm = (visMeters / 1000).toFixed(1);
  const displayValue =
    visMeters >= 1000
      ? `${visibilityKm} km` // e.g., "7.5 km"
      : `${visMeters} m`; // e.g., "800 m"

  // Determine visibility category and advice message
  let category = "";
  let advice = "";
  if (visMeters < 4000) {
    category = "Low";
    advice = "Poor visibility, caution advised.";
  } else if (visMeters < 8000) {
    category = "Moderate";
    advice = "Decent visibility, stay alert.";
  } else {
    category = "Clear";
    advice = "Great visibility for travel!";
  }

  return (
    <div className="vis-container">
      <div className="title">👀 Visibility</div>
      <div className="value">{displayValue}</div>
      <div className="label">{category}</div>
      <div className="vis-bar">
        <div
          className="indicator"
          style={{ left: `${percent}%` }}
          aria-label={`Visibility indicator: ${category}`}
        />
      </div>
      <div className="advice">{advice}</div>
    </div>
  );
};

export default VisibilityGauge;

import React from "react";
import "../Style/UVIndex.css";

export default function UVIndex({ uv }) {
  const getLabel = (value) => {
    if (value < 3) return "Low";
    if (value < 6) return "Moderate";
    if (value < 8) return "High";
    if (value < 11) return "Very High";
    return "Extreme";
  };

  const getAdvice = (value) => {
    if (value < 3) return "No protection needed.";
    if (value < 6) return "Wear sunglasses and SPF.";
    if (value < 8) return "Stay in shade midday.";
    if (value < 11) return "Avoid sun and use SPF 50+.";
    return "Stay indoors if possible.";
  };

  const percent = Math.min((uv / 11) * 100, 100);

  return (
    <div className="uv-container">
      <div>☀️ UV Index</div>
      <div className="uv-value">{Math.round(uv)}</div>
      <div className="uv-label">{getLabel(uv)}</div>

      <div className="uv-bar">
        <div className="uv-indicator" style={{ left: `${percent}%` }}></div>
      </div>

      <div className="uv-advice">{getAdvice(uv)}</div>
    </div>
  );
}

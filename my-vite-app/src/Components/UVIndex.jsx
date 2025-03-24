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
      <div className="title">☀️ UV Index</div>
      <div className="value">{Math.round(uv)}</div>
      <div className="label">{getLabel(uv)}</div>

      <div className="uv-bar">
        <div className="indicator" style={{ left: `${percent}%` }}></div>
      </div>

      <div className="advice">{getAdvice(uv)}</div>
    </div>
  );
}

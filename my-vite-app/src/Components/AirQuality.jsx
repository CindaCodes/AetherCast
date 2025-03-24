import React from "react";
import "../Style/AirQuality.css";

export default function AirQuality({ aqi }) {
  const getAQILabel = (value) => {
    switch (value) {
      case 1:
        return "Good";
      case 2:
        return "Fair";
      case 3:
        return "Moderate";
      case 4:
        return "Poor";
      case 5:
        return "Very Poor";
      default:
        return "Unknown";
    }
  };

  const getAQIAdvice = (value) => {
    switch (value) {
      case 1:
        return "✅ Air quality is ideal.";
      case 2:
        return "🙂 Air is acceptable.";
      case 3:
        return "⚠️ Sensitive groups take care.";
      case 4:
        return "🚫 Limit outdoor exertion.";
      case 5:
        return "🏠 Stay indoors if possible.";
      default:
        return "";
    }
  };

  const percent = ((aqi - 1) / 4) * 100; // 1 to 5 scaled to 0–100%

  return (
    <div className="aqi-container">
      <div className="title">😶‍🌫️ Air Quality</div>
      <div className="value mt-3">{aqi}</div>
      <div className="label">{getAQILabel(aqi)}</div>

      <div className="aqi-bar my-4">
        <div className="indicator" style={{ left: `${percent}%` }}></div>
      </div>

      <div className="advice">{getAQIAdvice(aqi)}</div>
    </div>
  );
}

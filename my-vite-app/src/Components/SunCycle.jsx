import React from "react";
import "../Style/SunCycle.css";

export default function SunCycle({ sunrise, sunset, currentTime }) {
  const getPercent = () => {
    const now = new Date(currentTime).getTime();
    const start = new Date(sunrise * 1000).getTime();
    const end = new Date(sunset * 1000).getTime();
    const percent = ((now - start) / (end - start)) * 100;
    return Math.min(Math.max(percent, 0), 100);
  };

  const formatTime = (timestamp) =>
    new Date(timestamp * 1000).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "America/Denver",
    });

  return (
    <div className="sun-card">
      <div className="sun-title">☀️ Sunrise</div>
      <div className="sun-time">{formatTime(sunrise)}</div>
      <div className="sun-arc">
        <svg viewBox="0 0 100 50" className="sun-svg">
          <defs>
            <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3498db" />
              <stop offset="50%" stopColor="#f39c12" />
              <stop offset="100%" stopColor="#8e44ad" />
            </linearGradient>
          </defs>
          <path
            d="M0,50 Q50,0 100,50"
            stroke="url(#sunGradient)"
            strokeWidth="2"
            fill="transparent"
          />
          <circle
            className="sun-dot"
            r="2.5"
            fill="#a29bfe"
            stroke="#fff"
            strokeWidth="1"
            cx={(() => {
              const t = getPercent() / 100;
              const x = (1 - t) ** 2 * 0 + 2 * (1 - t) * t * 50 + t ** 2 * 100;
              return x;
            })()}
            cy={(() => {
              const t = getPercent() / 100;
              const y = (1 - t) ** 2 * 50 + 2 * (1 - t) * t * 0 + t ** 2 * 50;
              return y;
            })()}
          />
        </svg>
      </div>
      <div className="sunset-label">Sunset</div>
      <div className="sun-time">{formatTime(sunset)}</div>
    </div>
  );
}

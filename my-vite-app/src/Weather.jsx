import React from "react";
import Footer from "./Footer";
import Form from "./Form";
import ThemeToggle from "./ThemeToggle";
import "./Weather.css";

export default function Weather() {
  return (
    <div className="Weather">
      {/* Header Row */}
      <div className="row gap-sm-3 align-items-center justify-content-between">
        <div className="city">City</div>
        <div className="form">
          <Form />
        </div>
        <div className="text-end">
          <ThemeToggle />
        </div>
      </div>

      {/* 🌟 Main Grid Layout */}
      <div className="grid-container">
        <div className="box" style={{ gridArea: "box-1" }}>
          Big Weather Box
        </div>
        <div className="rectangular-box" style={{ gridArea: "box-2" }}>
          Air Quality
        </div>
        <div className="box" style={{ gridArea: "box-3" }}>
          Sunrise & Sunset
        </div>
        <div className="box" style={{ gridArea: "box-4" }}>
          Wind Compass
        </div>
        <div className="box" style={{ gridArea: "box-5" }}>
          UV Index
        </div>
        <div className="box" style={{ gridArea: "box-6" }}>
          Precipitation
        </div>
        <div className="box" style={{ gridArea: "box-7" }}>
          Feels Like
        </div>
        <div className="box" style={{ gridArea: "box-8" }}>
          Humidity
        </div>
        <div className="rectangular-box" style={{ gridArea: "box-9" }}>
          Hourly Forecast
        </div>
        <div className="box" style={{ gridArea: "box-10" }}>
          Visibility
        </div>
        <div className="box" style={{ gridArea: "box-11" }}>
          Pressure
        </div>
        <div className="rectangular-box" style={{ gridArea: "box-12" }}>
          Chance of Rain Hourly Graph
        </div>
      </div>

      <Footer />
    </div>
  );
}

import React from "react";
import Footer from "./Footer";
import Form from "./Form";
import ThemeToggle from "./ThemeToggle";
import "./Weather.css";

export default function Weather() {
  return (
    <div className="container">
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
      <div className="weather-container">
        <div className="left-column">
          <div className="box mb-2">Big Weather Box</div>
          <div className="rectangular-box">Hourly Forecast</div>
        </div>
        <div className="right-column">
          <div className="info-container">
            <div className="left-container">
              <div className="rectangular-box mb-2">Air Quality</div>
              <div className="box-group">
                <div className="box">UV Index</div>
                <div className="box">Precipitation</div>
                <div className="box">Visibility</div>
                <div className="box">Pressure</div>
              </div>
            </div>
            <div className="right-container">
              <div className="box-group mb-2">
                <div className="box">Sunrise & Sunset</div>
                <div className="box">Wind Compass</div>
                <div className="box">Feels Like</div>
                <div className="box">Humidity</div>
              </div>
              <div className="rectangular-box">Chance of Rain Hourly Graph</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

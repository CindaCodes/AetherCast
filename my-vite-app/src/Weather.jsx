import React from "react";
import Footer from "./Footer";
import Form from "./Form";
import ThemeToggle from "./ThemeToggle";
import "./Weather.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Weather() {
  return (
    <div className="Weather">
      {/* 🌟 Main Grid Layout */}
      <div className="grid-container">
        <div className="header-box " style={{ gridArea: "header-1" }}>
          <ThemeToggle />
        </div>
        <div
          className="header-box display-4 text-center"
          style={{ gridArea: "header-2" }}
        >
          City
        </div>
        <div className="header-box" style={{ gridArea: "header-3" }}>
          <Form />
        </div>
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
        <div className="box" style={{ gridArea: "footer" }}>
          <Footer />
        </div>
      </div>
    </div>
  );
}

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Form() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <form className="text-center">
        <input
          type="search"
          placeholder="🔍  Enter a city.."
          className="weather-input mx-1"
        />
        <button type="submit" className="weather-button ">
          Search
        </button>
      </form>
    </div>
  );
}
